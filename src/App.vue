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
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  label="结束时间"
                  hide-details="auto"
                  prepend-icon="mdi-arrow-left"
                  append-outer-icon="mdi-arrow-right"
                ></v-text-field
              ></v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-range-slider label="截取时间" min="0" max="100" v-model="range" hide-details="auto"></v-range-slider>
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
                <v-btn class="mr-4" color="primary" outlined @click="getInfo">getImage</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-img class="mx-auto" max-height="360" max-width="640" :src="image"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    range: [0, 100],
    DITHER: ["bayer", "heckbert", "floyd_steinberg", "sierra2", "sierra2_4a"],
    image: "https://picsum.photos/id/11/500/300",
    duration: 100,
    fps: 10,
    ffmpeg: null,
    file: null,
    fetchFile: null,
  }),
  methods: {
    async onfilechange(e) {
      if (!e) return;
      this.file = e;
      this.ffmpeg.FS("writeFile", this.file.name, await this.fetchFile(this.file));
    },
    async getImage() {
      await this.ffmpeg.run("-i", this.file.name, "-frames", "1", "output.png");
      const data = this.ffmpeg.FS("readFile", "output.png");
      this.image = URL.createObjectURL(new Blob([data.buffer], { type: "image/png" }));
    },
    async getInfo() {
      console.log("getInfo");
      const regexDuration = /^ {2}Duration: (\d+):(\d+):(\d+).(\d+)/;
      const regexVideo = /^ {4}Stream #0:0.+?(\d+) fps/;
      this.ffmpeg.setLogger(({ message }) => {
        var res;
        if ((res = regexDuration.exec(message))) {
          this.duration = res[1] * 3600 + res[2] * 60 + res[3] + res[4] / 100;
        } else if ((res = regexVideo.exec(message))) {
          this.fps = Number(res[1]);
          this.duration *= this.fps;
        }
      });
      await this.ffmpeg.run("-i", this.file.name);
      this.ffmpeg.setLogger();
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
