import styled from 'styled-components'
import globalStyle from '../../assets/global-style'

export const Top = styled.div`
    .am-search {
        background: #fff;
    }
    .am-search-input {
        background: #efeff4;
    }
`
export const ScrollContainer = styled.div`
    position: fixed;
    top: 44px;
    bottom: 60px;
    width: 100%;
`
export const SubBox = styled.div`
    >div {
        display: flex;
        font-size: ${globalStyle['font-size-5']};
        color: ${globalStyle['color-text1-3']};
        > span {
          padding-right:4px;
        }
        margin-bottom: 4px;
        ${globalStyle.noWrap()}
    }
`

export const Warning = styled.div`
    color: ${globalStyle["yellow"]};
    font-size: 14px;
    .iconfont {
        padding-right: 4px;
    }
`
export const Footer = styled.div`
    position: fixed;
    height: 50px;
    padding: 4px 16px;
    width: 100%;
    left: 0;
    bottom: 10px;
`