import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle `	
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    touch-action: none;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
html, body {
    background: #f2f3f4;;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
a {
    text-decoration: none;
    color: #1f1f1f;
} 
.color-yellow {
    color: #f0873a!important;
}
.color-blue {
    color: #739ff0!important;
}
.color-red {
    color: #ce2633!important;
}
.color-green {
    color: #15BC83!important;
}
.f-row {
    display: -webkit-flex;
    display: flex;
  }
  .f-row-wrap {
    display: flex;
    flex-wrap: nowrap;
  }
  .f-col-1 {
    flex:0 0 8.33%;
  }
  .f-col-2 {
    flex:0 0 16.66%;
  }
  .f-col-3 {
    flex:0 0 25%;
  }
  .f-col-4 {
    flex:0 0 33.33%;
  }
  .f-col-5 {
    flex:0 0 41.66%;
  }
  .f-col-6 {
    width:50%;
  }
  .f-col-7 {
    width:58.33%;
  }
  .f-col-8 {
    width:66.66%;
  }
  .f-col-9 {
    width:75%;
  }
  .f-col-10 {
    width:83.33%;
  }
  .f-col-11 {
    width:91.66%;
  }
  .f-col-12 {
    width:100%;
  }
`