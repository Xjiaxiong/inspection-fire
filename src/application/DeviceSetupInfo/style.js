import styled from 'styled-components'
import globalStyle from '../../assets/global-style'
export const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: ${globalStyle["gery-bg"]};
`
export const Title = styled.h1`
    color: ${globalStyle["color-text1-3"]};
    font-size: 16px;
    line-height: 40px;
    padding-left: 16px;
`
export const DisplayRow = styled.div`
    .item-row {
        display: flex;
        border-bottom: 1px solid ${globalStyle["border-color1"]};
        font-size: ${globalStyle["font-size-4"]};
        background-color: #fff;
        padding: 16px;
        .label {
            width: 100px;
            text-align: left;
            color: ${globalStyle["color-text1-2"]};
        }
        .value {
            color: ${globalStyle["color-text1-4"]};
            flex: 1;
            ${globalStyle.noWrap()}
        }
    }
`
export const List = styled.ul`
    >li {
        padding: 8px 16px;
        background-color: #fff;
        border-bottom: 1px solid ${globalStyle["border-color2"]};
        font-size: ${globalStyle["font-size-4"]};
        color: ${globalStyle["color-text1-4"]};
        font-weight: 700;
        .title {
            text-align: left;
            line-height: 24px;
            font-weight: 700;
            margin-bottom: 16px;
        }
        .desc {
            >p {
                display: flex;
                margin-bottom: 8px;
                font-size: ${globalStyle["font-size-5"]};
                color: ${globalStyle["color-text1-3"]};
                .label {
                    padding-right: 4px;
                    flex: none;
                }
                .value {
                    flex: 1;
                    display: table-cell;
                    >span{
                        display: table;
                        width: 100%;
                        table-layout: fixed;
                        word-wrap: break-word;
                    }
                }
            }
        }
    }
`
export const DeviceTypes = styled.ul`
    padding-bottom: 15px;
    >li{
        padding: 8px 16px;
        background-color: #fff;
        border-bottom: 1px solid ${globalStyle["border-color1"]};
        display: flex;
        align-items: center;
        font-size: ${globalStyle["font-size-4"]};
        >img {
            width: 32px;
            height: 32px;
            margin-right: 8px;
        }
        .title {
            font-weight: 700;
            color: ${globalStyle["color-text1-4"]};
        }
        .right {
            margin-left: auto;
            ${globalStyle["color-text1-4"]};
            >span{
                padding: 0 4px;
            }
        }
    }
`