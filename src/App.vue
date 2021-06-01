<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center">
          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <v-file-input
                  accept="video/*"
                  label="选择视频文件"
                  prepend-icon="mdi-file-video-outline"
                  hide-details="auto"
                  @change="onfilechange"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6"
                ><v-text-field
                  label="开始时间"
                  hide-details="auto"
                  prepend-icon="mdi-arrow-left"
                  append-outer-icon="mdi-arrow-right"
                  :value="toTime(range[0])"
                  @change="setStartTime"
                  @click:prepend="$set(range, 0, range[0] - 1)"
                  @click:append-outer="$set(range, 0, range[0] + 1)"
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  label="结束时间"
                  hide-details="auto"
                  prepend-icon="mdi-arrow-left"
                  append-outer-icon="mdi-arrow-right"
                  :value="toTime(range[1])"
                  @change="setEndTime"
                  @click:prepend="$set(range, 1, range[1] - 1)"
                  @click:append-outer="$set(range, 1, range[1] + 1)"
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-range-slider
                  label="截取时间"
                  min="0"
                  :max="frames"
                  v-model="range"
                  hide-details="auto"
                ></v-range-slider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4"><v-checkbox label="优化调色板" hide-details="auto"></v-checkbox></v-col>
              <v-col cols="4"><v-text-field label="颜色数" hide-details="auto"></v-text-field></v-col>
              <v-col cols="4"><v-select :items="DITHER" label="仿色算法" hide-details="auto"></v-select></v-col>
            </v-row>
            <v-row>
              <v-col cols="4"><v-checkbox label="裁剪画面" hide-details="auto"></v-checkbox></v-col>
              <v-col cols="4"><v-text-field label="左上角" hide-details="auto"></v-text-field></v-col>
              <v-col cols="4"><v-text-field label="右下角" hide-details="auto"></v-text-field></v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn class="mr-4" color="primary" outlined @click="getImage">getImage</v-btn>
                <v-btn class="mr-4" color="primary" outlined @click="getInfo">getInfo</v-btn>
                <v-btn class="mr-4" color="primary" outlined @click="test">test</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p>视频信息：{{ this.frames }}, {{ this.fps }}fps</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-img class="mx-auto" max-height="360" max-width="640" :src="image"></v-img>
          </v-col>
        </v-row>
        <v-snackbar v-model="snackbar.show" light>
          {{ snackbar.message }}
          <template v-slot:action="{ attrs }">
            <v-btn color="primary" text v-bind="attrs" @click="snackbar.show = false">知道了</v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    DITHER: ["bayer", "heckbert", "floyd_steinberg", "sierra2", "sierra2_4a"],
    image: "https://picsum.photos/id/11/500/300",
    range: [0, 1],
    frames: 1,
    fps: 1,
    ffmpeg: null,
    file: null,
    fetchFile: null,
    snackbar: {
      show: false,
      message: "",
    },
  }),
  methods: {
    message(msg) {
      this.snackbar.message = msg;
      this.snackbar.show = true;
    },
    toFrames(str) {
      var res = str.match(/(\d+):(\d+):(\d+\.\d+)/);
      if (res) {
        return Math.round((Number(res[1]) * 3600 + Number(res[2]) * 60 + Number(res[3])) * this.fps);
      } else {
        this.message("时间格式不符合00:00:00.000");
        return 0;
      }
    },
    toTime(frames) {
      return new Date((frames / this.fps) * 1000).toISOString().substring(11, 23);
    },
    setStartTime(v) {
      this.$set(this.range, 0, this.toFrames(v));
    },
    setEndTime(v) {
      this.$set(this.range, 1, this.toFrames(v));
    },
    async onfilechange(e) {
      if (!e) return;
      this.file = e;
      this.ffmpeg.FS("writeFile", this.file.name, await this.fetchFile(this.file));
      await this.getInfo();
      this.message("视频读取成功");
    },
    async getImage() {
      await this.ffmpeg.run("-i", this.file.name, "-frames", "1", "output.png");
      const data = this.ffmpeg.FS("readFile", "output.png");
      this.image = URL.createObjectURL(new Blob([data.buffer], { type: "image/png" }));
    },
    async getInfo() {
      console.log("getInfo");
      const regexDuration = /^ {2}Duration: (\d+):(\d+):(\d+\.\d+)/;
      const regexVideo = /^ {4}Stream #0:0.+?([\d.]+) fps/;
      this.ffmpeg.setLogger(({ message }) => {
        var res;
        if ((res = regexDuration.exec(message))) {
          this.frames = Math.round(Number(res[1]) * 3600 + Number(res[2]) * 60 + Number(res[3]));
        } else if ((res = regexVideo.exec(message))) {
          this.fps = Number(res[1]);
          this.frames *= this.fps;
          this.range = [0, this.frames];
        }
      });
      await this.ffmpeg.run("-i", this.file.name);
      this.ffmpeg.setLogger(() => {});
    },
    test() {
      console.log("++");
      this.range[0]++;
    },
  },
  async mounted() {
    const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
    const ffmpeg = createFFmpeg();
    this.ffmpeg = ffmpeg;
    this.fetchFile = fetchFile;
    await ffmpeg.load();
  },
};
</script>

<style>
@media (min-width: 960px) {
  .container {
    max-width: 900px !important;
  }
}
</style>
