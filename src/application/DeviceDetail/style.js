import styled from 'styled-components'
import globalStyle from '../../assets/global-style'
export const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: ${globalStyle["gery-bg"]};
`
export const List = styled.ul`
    padding: 16px 0;
    >li {
        padding: 16px;
        background-color: #fff;
        border-bottom: 1px solid ${globalStyle["border-color1"]};
        font-size: ${globalStyle["font-size-4"]};
        color: ${globalStyle["color-text1-4"]};
        font-weight: 700;
        .title {
            font-weight: 700;
            margin-bottom: 15px;
        }
        .desc {
            line-height: 1.4;
            >span {
                padding-right: 8px;
            }
            font-size: ${globalStyle["font-size-5"]};
            color: ${globalStyle["color-text1-3"]};
            ${globalStyle.noWrap()}
        }
    }
` 