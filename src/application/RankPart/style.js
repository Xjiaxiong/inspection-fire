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
        padding: 12px 6px;
        background-color: #fff;
        border-bottom: 1px solid ${globalStyle["border-color1"]};
        display: flex;
        align-items: center;
        font-size: 16px;
        color: ${globalStyle["color-text1-4"]};
        font-weight: 700;
        text-align: center;
        .index {
            flex: 0 0 10%;
            color: ${globalStyle["color-text1-2"]};
        }
        .title {
            text-align: left;
            line-height: 24px;
            flex: 0 0 70%;
        }
        .score {
            flex: 0 0 20%;
        }
    }
` 