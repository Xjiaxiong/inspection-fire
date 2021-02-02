import styled from 'styled-components'
import globalStyle ,{ r } from '../../assets/global-style'

export const Title = styled.h1`
    color: ${globalStyle["color-text1-3"]};
    font-size: 16px;
    line-height: 40px;
    padding-left: 16px;
`

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
    top: 172px;
    bottom: 0px;
    width: 100%;
`
export const DeteScope = styled.div`
    display: flex;
    height: 44px;
    align-items: center;
    background:#fff;
    padding: 0 16px;
    .label {
        font-size: ${globalStyle['font-size-4']};
        color: ${globalStyle['color-text1-4']};
        width: 85px;
    }
    .right-content {
        display: flex;
        align-items: center;
        .date-box {
            margin-right: ${r('10px')};
            .label {
                font-size: ${globalStyle['font-size-6']};
                color: ${globalStyle['color-text1-2']};
            }
            .date {
                font-size: ${globalStyle['font-size-4']};
                color: ${globalStyle['color-text1-4']};
                line-height: 1.4;
                font-weight: 700;
            }
        }
        .gap-text {
            font-size: ${globalStyle['font-size-4']};
            color: ${globalStyle['color-text1-4']};
            margin: 0 ${r('20px')};
        }
    }
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