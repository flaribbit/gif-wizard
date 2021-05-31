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
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6"><v-text-field label="开始时间" hide-details="auto"></v-text-field></v-col>
              <v-col cols="6"><v-text-field label="结束时间" hide-details="auto"></v-text-field></v-col>
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
          </v-col>
          <v-col cols="6">
            <v-img class="mx-auto" max-height="360" max-width="640" src="https://picsum.photos/id/11/500/300"></v-img>
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
    range: [30, 60],
    DITHER: ["bayer", "heckbert", "floyd_steinberg", "sierra2", "sierra2_4a"],
  }),
};
</script>
