import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'


export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
`
export const Title = styled.div`
    height: 44px;
    line-height: 44px;
    padding-left: 16px;
    color: ${globalStyle['color-text1-3']};
    font-size: ${globalStyle['font-size-4']};
`

export const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 240px;
    background-color: #434969;
    text-align:center;
    #mountNode {
        width:200px;
        height: 200px;
        margin: 0 20px;
    }
    color: #fff;
    .number {
        font-size: ${globalStyle['font-size-1']};
        line-height: 32px;
        font-weight: 700;
    }
    .label {
        font-size: ${globalStyle['font-size-4']};
        color: rgba(255,255,255,.3);
    }
`

export const WBlock = styled.div`
    background-color: #fff;
    padding: 8px 16px;
    .text {
        font-size: ${globalStyle['font-size-4']};
        color: ${globalStyle['color-text1-4']};
        line-height: 32px;
    }
    .desc {
        font-size: ${globalStyle['font-size-6']};
        color: ${globalStyle['color-text1-2']};
        .iconfont {
            margin-right: 8px;
        }
    }
`
export const CheckList = styled.div`
    .check-item {
        position: relative;
        background-color:#fff;
        padding-top: 8px;
        .state-bar {
            width: 6px;
            height: 24px;
            border-radius: 4px;
            position: absolute;
            top: 8px;
            left: 8px;
        }
        .normal {
            background-color: ${globalStyle['green']};
        }
        .abnormal {
            background-color: #e98839;
        }
        .text, .desc{
            padding-left: 24px;
            padding-right: 16px;
            padding-bottom: 15px;
        }
        .text {
            font-size: ${globalStyle['font-size-4']};
            color: ${globalStyle['color-text1-4']};
            font-weight: 700;
            line-height: 1.47;
        }
        .desc {
            font-size: ${globalStyle['font-size-6']};
            color: ${globalStyle['color-text1-2']};
            line-height: 1.47;
            border-bottom: 1px solid ${globalStyle['border-color1']};
        }
        .list-info {
            li {
                display: flex;
                justify-content: space-between;
                padding: 16px;
                border-bottom: 1px solid ${globalStyle['border-color1']};
                font-size: ${globalStyle['font-size-4']};
                .title {
                    color: ${globalStyle['color-text1-4']};
                }
                .value {
                    color: ${globalStyle['font-red']}
                }
            }
            .col {
                flex-direction: column;
                .imgs {
                    display: flex;
                    padding: 8px 0;
                    img {
                        margin-right: 10px;
                        width: ${r('100px')};
                        height: ${r('100px')};
                    }
                }
            }
        }
    }
`   