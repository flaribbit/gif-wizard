(function(e){function t(t){for(var n,i,s=t[0],c=t[1],u=t[2],f=0,p=[];f<s.length;f++)i=s[f],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(p.length)p.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,s=1;s<r.length;s++){var c=r[s];0!==a[c]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},o=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/gif-wizard/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=c;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-main",[r("v-container",[r("v-row",{attrs:{align:"center"}},[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("v-file-input",{attrs:{accept:"video/*, .mkv, .flv",label:"选择视频文件","prepend-icon":"mdi-file-video-outline","hide-details":"auto"},on:{change:e.onfilechange}})],1)],1),r("v-row",[r("v-col",{attrs:{cols:"6"}},[r("v-text-field",{attrs:{label:"开始时间","hide-details":"auto","prepend-icon":"mdi-arrow-left","append-outer-icon":"mdi-arrow-right",value:e.toTime(e.range[0])},on:{change:function(t){return e.setTime(0,t)},"click:prepend":function(t){return e.adjustTime(0,-1)},"click:append-outer":function(t){return e.adjustTime(0,1)}}})],1),r("v-col",{attrs:{cols:"6"}},[r("v-text-field",{attrs:{label:"结束时间","hide-details":"auto","prepend-icon":"mdi-arrow-left","append-outer-icon":"mdi-arrow-right",value:e.toTime(e.range[1])},on:{change:function(t){return e.setTime(1,t)},"click:prepend":function(t){return e.adjustTime(1,-1)},"click:append-outer":function(t){return e.adjustTime(1,1)}}})],1)],1),r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("v-range-slider",{attrs:{label:"截取时间",min:"0",max:e.frames,"hide-details":"auto"},model:{value:e.range,callback:function(t){e.range=t},expression:"range"}})],1)],1),r("v-row",[r("v-col",{attrs:{cols:"4"}},[r("v-checkbox",{attrs:{label:"优化调色板","hide-details":"auto"}})],1),r("v-col",{attrs:{cols:"4"}},[r("v-text-field",{attrs:{label:"颜色数","hide-details":"auto"}})],1),r("v-col",{attrs:{cols:"4"}},[r("v-select",{attrs:{items:e.DITHER,label:"仿色算法","hide-details":"auto"}})],1)],1),r("v-row",[r("v-col",{attrs:{cols:"4"}},[r("v-checkbox",{attrs:{label:"裁剪画面","hide-details":"auto"}})],1),r("v-col",{attrs:{cols:"4"}},[r("v-text-field",{attrs:{label:"左上角","hide-details":"auto"}})],1),r("v-col",{attrs:{cols:"4"}},[r("v-text-field",{attrs:{label:"右下角","hide-details":"auto"}})],1)],1),r("v-row",[r("v-col",[r("v-btn",{staticClass:"mr-4",attrs:{color:"primary",outlined:""},on:{click:e.convert}},[e._v("转换")])],1)],1),r("v-row",[r("v-col",[r("p",[e._v("视频信息："+e._s(this.frames)+", "+e._s(this.fps)+"fps")])])],1)],1),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-img",{staticClass:"mx-auto",attrs:{contain:"",src:e.image}}),r("v-btn",{staticClass:"mt-4 mx-auto d-block",attrs:{color:"primary",alt:"output",outlined:""},on:{click:e.save}},[e._v("保存图片")])],1)],1),r("v-snackbar",{attrs:{light:""},scopedSlots:e._u([{key:"action",fn:function(t){var n=t.attrs;return[r("v-btn",e._b({attrs:{color:"primary",text:""},on:{click:function(t){e.snackbar.show=!1}}},"v-btn",n,!1),[e._v("知道了")])]}}]),model:{value:e.snackbar.show,callback:function(t){e.$set(e.snackbar,"show",t)},expression:"snackbar.show"}},[e._v(" "+e._s(e.snackbar.message)+" ")])],1)],1)],1)},o=[],i=r("1da1"),s=(r("96cf"),r("ac1f"),r("466d"),r("a9e3"),r("b0c0"),r("2ca0"),r("d3b7"),r("3ca3"),r("ddb0"),r("2b3d"),{name:"App",data:function(){return{DITHER:["bayer","heckbert","floyd_steinberg","sierra2","sierra2_4a"],image:"https://picsum.photos/id/11/500/300",range:[0,1],frames:1,fps:1,ffmpeg:null,file:null,fetchFile:null,snackbar:{show:!1,message:""}}},methods:{message:function(e){this.snackbar.message=e,this.snackbar.show=!0},toFrames:function(e){var t=e.match(/(\d+):(\d+):(\d+\.\d+)/);return t?Math.round((3600*Number(t[1])+60*Number(t[2])+Number(t[3]))*this.fps):(this.message("时间格式不符合00:00:00.000"),0)},toTime:function(e){return new Date(e/this.fps*1e3).toISOString().substring(11,23)},setTime:function(e,t){this.$set(this.range,e,this.toFrames(t)),this.getImage(this.range[e])},adjustTime:function(e,t){this.$set(this.range,e,this.range[e]+t),this.getImage(this.range[e])},onfilechange:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e){r.next=2;break}return r.abrupt("return");case 2:return t.file=e,r.t0=t.ffmpeg,r.t1=t.file.name,r.next=7,t.fetchFile(t.file);case 7:return r.t2=r.sent,r.t0.FS.call(r.t0,"writeFile",r.t1,r.t2),r.next=11,t.getInfo();case 11:t.message("视频读取成功");case 12:case"end":return r.stop()}}),r)})))()},getImage:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return console.log(e),r.next=3,t.ffmpeg.run("-ss",t.toTime(e),"-i",t.file.name,"-frames","1","output.png");case 3:n=t.ffmpeg.FS("readFile","output.png"),t.image.startsWith("blob://")&&URL.revokeObjectURL(t.image),t.image=URL.createObjectURL(new Blob([n.buffer],{type:"image/png"}));case 6:case"end":return r.stop()}}),r)})))()},getInfo:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("getInfo"),r=/^ {2}Duration: (\d+):(\d+):(\d+\.\d+)/,n=/^ {4}Stream #0:.+?([\d.]+) fps/,e.ffmpeg.setLogger((function(t){var a,o=t.message;(a=r.exec(o))?e.frames=Math.round(3600*Number(a[1])+60*Number(a[2])+Number(a[3])):(a=n.exec(o))&&(e.fps=Number(a[1]),e.frames*=e.fps,e.$set(e.range,1,e.frames))})),t.next=6,e.ffmpeg.run("-i",e.file.name);case 6:e.ffmpeg.setLogger((function(){}));case 7:case"end":return t.stop()}}),t)})))()},convert:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.ffmpeg.run("-ss",e.toTime(e.range[0]),"-to",e.toTime(e.range[1]),"-i",e.file.name,"-vf","scale=-2:240","-r","10","output.gif");case 2:r=e.ffmpeg.FS("readFile","output.gif"),e.image.startsWith("blob://")&&URL.revokeObjectURL(e.image),e.image=URL.createObjectURL(new Blob([r.buffer],{type:"image/gif"})),e.message("转换为gif成功");case 6:case"end":return t.stop()}}),t)})))()},save:function(){var e=document.createElement("a");e.href=this.image,e.download="output.gif",e.click()}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,a,o,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=r("9110"),a=n.createFFmpeg,o=n.fetchFile,i=a({log:!0}),e.ffmpeg=i,e.fetchFile=o,t.next=6,i.load();case 6:e.message("加载ffmpeg成功");case 7:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){this.ffmpeg.exit()}}),c=s,u=(r("034f"),r("2877")),l=r("6544"),f=r.n(l),p=r("7496"),m=r("8336"),d=r("ac7c"),g=r("62ad"),v=r("a523"),h=r("23a7"),b=r("adda"),w=r("f6c4"),k=r("5963"),x=r("0fd9"),y=r("b974"),j=r("2db4"),O=r("8654"),R=Object(u["a"])(c,a,o,!1,null,null,null),T=R.exports;f()(R,{VApp:p["a"],VBtn:m["a"],VCheckbox:d["a"],VCol:g["a"],VContainer:v["a"],VFileInput:h["a"],VImg:b["a"],VMain:w["a"],VRangeSlider:k["a"],VRow:x["a"],VSelect:y["a"],VSnackbar:j["a"],VTextField:O["a"]});var _=r("f309");n["a"].use(_["a"]);var F=new _["a"]({});n["a"].config.productionTip=!1,new n["a"]({vuetify:F,render:function(e){return e(T)}}).$mount("#app")},"85ec":function(e,t,r){}});
//# sourceMappingURL=app.7d6a0be7.js.map