
# canvas 橡皮擦效果
---

**效果图** 

![效果展示图](./public/static/images/153767988119261.gif)

---

> 大概思路是 首先设置一张背景图 => 设置 canvas 遮挡 => canvas中使用图片=> 设置其合成模式为destination-out=>监听触摸事件，将当前的区域裁剪掉
更多细节查看
    * [react版（移动端）](./src/page/home/home.jsx)
    * [原生版（pc端）](./public/pc_demo/index.js)

[移动端在线demo](https://maocanhua.cn/simple/index.html) 仅适用于移动端

[pc端在线demo](https://maocanhua.cn/simple/pc_demo/index.html)