import {createGlobalStyle} from 'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {
  font-family: 'iconfont';  /* project id 655725 */
  src: url('https://at.alicdn.com/t/font_655725_pqp1rxbebeh.eot');
  src: url('https://at.alicdn.com/t/font_655725_pqp1rxbebeh.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_655725_pqp1rxbebeh.woff2') format('woff2'),
  url('https://at.alicdn.com/t/font_655725_pqp1rxbebeh.woff') format('woff'),
  url('https://at.alicdn.com/t/font_655725_pqp1rxbebeh.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_655725_pqp1rxbebeh.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`