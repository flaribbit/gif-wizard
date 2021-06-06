<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-row>
              <v-col cols="12">
                <v-file-input
                  accept="video/*, .mkv, .flv"
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
                  @change="setTime(0, $event)"
                  @click:prepend="adjustTime(0, -1)"
                  @click:append-outer="adjustTime(0, 1)"
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  label="结束时间"
                  hide-details="auto"
                  prepend-icon="mdi-arrow-left"
                  append-outer-icon="mdi-arrow-right"
                  :value="toTime(range[1])"
                  @change="setTime(1, $event)"
                  @click:prepend="adjustTime(1, -1)"
                  @click:append-outer="adjustTime(1, 1)"
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
                <v-btn class="mr-4" color="primary" outlined @click="convert">转换</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p>视频信息：{{ this.frames }}, {{ this.fps }}fps</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6">
            <v-img class="mx-auto" contain :src="image"></v-img>
            <v-btn color="primary" alt="output" class="mt-4 mx-auto d-block" outlined @click="save">保存图片</v-btn>
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
    setTime(k, v) {
      this.$set(this.range, k, this.toFrames(v));
      this.getImage(this.range[k]);
    },
    adjustTime(k, d) {
      this.$set(this.range, k, this.range[k] + d);
      this.getImage(this.range[k]);
    },
    async onfilechange(e) {
      if (!e) return;
      this.file = e;
      this.ffmpeg.FS("writeFile", this.file.name, await this.fetchFile(this.file));
      await this.getInfo();
      this.message("视频读取成功");
    },
    async getImage(frame) {
      //获取图片
      console.log(frame);
      await this.ffmpeg.run("-ss", this.toTime(frame), "-i", this.file.name, "-frames", "1", "output.png");
      //显示图片
      const data = this.ffmpeg.FS("readFile", "output.png");
      if (this.image.startsWith("blob://")) URL.revokeObjectURL(this.image);
      this.image = URL.createObjectURL(new Blob([data.buffer], { type: "image/png" }));
    },
    async getInfo() {
      //获取视频信息 主要是帧率
      console.log("getInfo");
      const regexDuration = /^ {2}Duration: (\d+):(\d+):(\d+\.\d+)/;
      const regexVideo = /^ {4}Stream #0:.+?([\d.]+) fps/;
      this.ffmpeg.setLogger(({ message }) => {
        var res;
        if ((res = regexDuration.exec(message))) {
          this.frames = Math.round(Number(res[1]) * 3600 + Number(res[2]) * 60 + Number(res[3]));
        } else if ((res = regexVideo.exec(message))) {
          this.fps = Number(res[1]);
          this.frames *= this.fps;
          this.$set(this.range, 1, this.frames);
        }
      });
      await this.ffmpeg.run("-i", this.file.name);
      this.ffmpeg.setLogger(() => {});
    },
    async convert() {
      //prettier-ignore
      await this.ffmpeg.run(
        "-ss", this.toTime(this.range[0]),
        "-to", this.toTime(this.range[1]),
        "-i", this.file.name,
        "-vf", "scale=-2:240",
        "-r", "10",
        "output.gif"
      );
      const data = this.ffmpeg.FS("readFile", "output.gif");
      if (this.image.startsWith("blob://")) URL.revokeObjectURL(this.image);
      this.image = URL.createObjectURL(new Blob([data.buffer], { type: "image/gif" }));
      this.message("转换为gif成功");
    },
    save() {
      var a = document.createElement("a");
      a.href = this.image;
      a.download = "output.gif";
      a.click();
    },
  },
  async mounted() {
    const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
    const ffmpeg = createFFmpeg({ log: true });
    this.ffmpeg = ffmpeg;
    this.fetchFile = fetchFile;
    await ffmpeg.load();
    this.message("加载ffmpeg成功");
  },
  beforeDestroy() {
    this.ffmpeg.exit();
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
