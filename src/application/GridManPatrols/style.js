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
    >li {
        padding: 16px;
        background-color: #fff;
        border-bottom: 1px solid ${globalStyle["border-color1"]};
        font-size: 16px;
        color: ${globalStyle["color-text1-4"]};
        font-weight: 700;
        .title {
            text-align: left;
            line-height: 24px;
            font-weight: 700;
            margin-bottom: 15px;
        }
        .desc {
            >p {
                display: flex;
                margin-bottom: 8px;
                font-size: 14px;
                color: ${globalStyle["color-text1-3"]};
                .label {
                    padding-right: 4px;
                }
            }
        }
    }
` 