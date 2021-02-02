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
    padding: 16px;
    >li {
        padding: 16px;
        background-color: #efefef;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        border-radius: 4px;
        .icon {
            width: 30px;
            height: 30px;
            background-color: ${globalStyle["yellow"]};
            line-height: 30px;
            text-align: center;
            margin-right: 8px;
            color: #efefef;
            border-radius: 50%;
        }
        >section {
            flex: 1;
        }
        .title {
            font-size: 16px;
            color: ${globalStyle["color-text1-4"]};
            font-weight: 700;
            margin-bottom: 15px;
        }
        .date {
            text-align: left;
            font-size: 14px;
            color: ${globalStyle["color-text1-2"]};
        }
    }
` 