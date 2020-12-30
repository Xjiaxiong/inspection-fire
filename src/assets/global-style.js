
const deviceWidth = document.documentElement.clientWidth;

//扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before{
      content: '';
      position: absolute;
      top: -10px;
      bottom: -10px;
      left: -10px;
      right: -10px;
    };
  `
}
// 一行文字溢出部分用... 代替
export const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

export const bgFull = () => {
  return `
    background-position: 50%;
    background-size: contain;
    background-repeat: no-repeat;
  `
};

// 处理px转换成rem

export const r = (pxValue) => {
  
  const designPx = 750; //设计稿大小
  const ratio =  deviceWidth/10;
  pxValue = parseInt(pxValue);
  const remValue = ((pxValue / designPx)*deviceWidth)/ratio
  return remValue + 'rem';
}

let style = {
  "font-red":"#F25643",
  "border-color0":"rgba(25,31,37,.12)", //顶部底部栏分割
  "border-color1":"rgba(25,31,37,.08)", //一级分割线颜色，非同类分割
  "border-color2":"rgba(25,31,37,.04)", //二级分割线颜色，同类分割
  "gery-bg": "#F6F6F6", //通用页面背景色
  "theme-color": "#3296FA",
  "theme-color-shadow": "rgba(212, 68, 57, .5)",
  "font-color-light": "#f1f1f1",
  "font-color-light-shadow": "rgba(241, 241, 241, 0.6)",//略淡
  "font-color-desc": "#2E3030",
  "font-color-desc-v2": "#bba8a8", //略淡
  "font-size-ss": "10px",
  "font-size-s": "12px",
  "font-size-m": "14px",
  "font-size-l": "16px",
  "font-size-ll": "18px",
  "font-size-8": "10px",  //一般，备注级文案，如底部的提示
  "font-size-7": "12px",  //一般，辅助文案，补充级描述
  "font-size-6": "13px",  //重要，辅助文案，补充级描述
  "font-size-5": "14px",  //重要，辅助说明，次要文本信息
  "font-size-4": "16px",  //重要，主要文本信息
  "font-size-3": "17px",  //重要，正文字体
  "font-size-2": "20px",  //引领，大标题
  "font-size-1": "24px",  //引领，特大标题
  "border-color": "#e4e4e4",
  "border-color-v2": "rgba(228, 228, 228, 0.1)",
  "background-color": "#f2f3f4",
  "background-color-shadow": "rgba(0, 0, 0, 0.3)",
  "highlight-background-color": "#fff",
  "color-text1-4": "rgba(25, 31, 37, 1)",  //Primary Text #191F25
  "color-text1-3": "rgba(25, 31, 37, 0.64)",  //Secondary Text
  "color-text1-2": "rgba(25, 31, 37, 0.40)",  //辅助信息 Caption
  "color-text1-1": "rgba(25, 31, 37, 0.28)",  //失效信息 Disable
  "color-brand1-1": "#ADDEFF",  
  "color-brand1-6": "#3296FA",  //Link-normal
  "color-brand1-9": "#3296FA", //Link-click
  "green": "#15BC83",
  "yellow": "#f0873a",
  extendClick,
  noWrap,
  bgFull,
  r
};

if(deviceWidth <= 360) {
  style['font-size-1'] = "18px";
  style['font-size-2'] = "16px";
  style['font-size-3'] = "14px";
  style['font-size-4'] = "12px";
  style['font-size-5'] = "10px";
  style['font-size-6'] = "8px";
}

export default style
