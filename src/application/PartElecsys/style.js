import styled from 'styled-components'
import globalStyle from '../../assets/global-style'

export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
`
export const Content = styled.div`
    margin-bottom: 10px;
    padding: 16px;
    padding-top: 50px;
    background-color: #fff;
    color: ${globalStyle["color-text1-4"]};
    font-size: ${globalStyle["font-size-4"]};
    .top-content {
        display: flex; 
        .left-item {
            height: 150px;
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-right: 10px;
            .big-font {
                font-size: 44px;
                font-weight: 700;
            }
            .lb-item {
                display: flex;
                justify-content: space-between;
            }
            .count-box {
                font-size: ${globalStyle["font-size-2"]};
            }
        }
        .right-item {
            width: 50%;
            align-items: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: center;
            .circle {
                width: 120px;
                height: 120px;
                border: 8px solid #34b6f2;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                >span {
                    font-size: 26px;
                    color: #34b6f2;
                }
            }
        }
        .label {
            line-height: 1.56;
            font-size: ${globalStyle["font-size-4"]};
            color: ${globalStyle["color-text1-3"]};
        }
    }
    .devices {
        padding: 10px;
        background-color: #f2f2f2;
        display: flex;
        margin-top: 20px;
        .device-wrap {
            width: 50%;
            >section {
                padding-left: 15px;
                padding-bottom: 15px;
                >p:first-child {
                    font-weight: 700;
                    font-size: ${globalStyle["font-size-2"]};
                    color: ${globalStyle["color-text1-3"]};
                }
                .label {
                    line-height: 1.78;
                    font-size: ${globalStyle["font-size-4"]};
                    color: ${globalStyle["color-text1-3"]};
                }
                .label.red {
                    color: #d8201e;
                }
            }
            >section:last-child {
                padding-bottom: 5px;
            }
        }
    }
`