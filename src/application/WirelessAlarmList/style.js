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
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    >li {
        width: 49%;
        padding: 0 16px;
        background-color: #fff;
        margin-bottom: 2%;
        border-radius: 4px;
        .state {
            display: inline-block;
            padding: 6px;
            font-size: 14px;
            color:#fff;
            margin-left: 4px;
            margin-bottom: 10px;
        }
        .state.normal {
            background-color: ${globalStyle["green"]}
        }
        .state.abnormal {
            background-color: #ce2633;
        }
        .title {
            font-size: 16px;
            color: ${globalStyle["color-text1-4"]};
            font-weight: 700;
            margin-bottom: 15px;
        }
        .desc {
            display: flex;
            .icon {
                padding-right: 4px;
                font-size: 13px;
                color: ${globalStyle["color-text1-2"]};
            }
            >p {
                flex: 1;
                font-size: 12px;
                color: ${globalStyle["color-text1-2"]};
                display: table-cell;
                >span {
                    ${globalStyle.tableCell()};
                }
            }
            padding-bottom: 15px;
        }
    }
    >li:nth-child(2n) {
        margin-left: 2%;
    }
` 