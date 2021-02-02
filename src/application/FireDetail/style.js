import styled from 'styled-components'
import globalStyle ,{ r } from '../../assets/global-style'

export const Title = styled.h1`
    color: ${globalStyle["color-text1-3"]};
    font-size: 16px;
    line-height: 40px;
    padding-left: 16px;
`

export const Top = styled.div`
    background-color: #fff;
    padding: 15px;
    >h1 {
        font-size: ${globalStyle["font-size-3"]};
        color: ${globalStyle["color-text1-4"]};
        margin-bottom: 5px;
        font-weight: 700;
    }
    .sub {
        font-size: ${globalStyle["font-size-5"]};
        color: ${globalStyle["color-text1-2"]}
    }
    .desc {
        padding-top: 15px;
        font-size: ${globalStyle["font-size-4"]};
        color: ${globalStyle["color-text1-3"]}
    }
`
export const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 50px;
    width: 100%;
`

export const ListInfo = styled.ul`
    >li {
        background-color: #fff;
        padding: 15px;
        font-size: ${globalStyle["font-size-4"]};
        color: ${globalStyle["color-text1-4"]};
        display: flex;
        border-bottom: 1px solid ${globalStyle["border-color1"]};
        .label {
            width: 85px;
            margin-right: 5px;
            color: ${globalStyle["color-text1-2"]};
        }
        .value {
            flex: 1;
            ${globalStyle.noWrap()}
        }
        .value-long {
            flex: 1;
            display: table-cell;
            >p {
                ${globalStyle.tableCell()}
            }
        }
        .map-list {
            background-color: #ddd;
            height: ${r("200px")};
            flex: 0 0 70%;
        }
    }
`

export const Footer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: 16px;
    color: ${globalStyle["color-text1-4"]};
    width: 100%;
    .full-btn {
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: #ef9f3c;
        color: #fff;
    }
    .btn-group {
        display: flex;
        .btn {
            height: 50px;
            line-height: 50px;
            text-align: center;
            flex: 0 0 50%;
        }
        .right {
                background-color: #ef9f3c;
                color: #fff;
        }
        .left {
            background-color: #fff;
        }
    }
`
export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0,0,0,.3);
    .content {
        transition: all .3s;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translate(0,-50%);
        width: 80%;
        height: 400px;
        >h1 {
            position: relative;
            height: 40px;
            line-height: 40px;
            background-color: #454452;
            color: #fff;
            text-align: center;
            .iconfont {
                position: absolute;
                left: 10%;
                top: 50%;
                transform: translate(0,-50%);
            }
            >span {
                font-size: 16px;
                font-weight: 700;
            }
        }
        >footer {
            background-color: #fff;
            display: flex;
            height: 60px;
            .btn {
                flex: 0 0 50%;
                padding: 10px;
                .div {
                    border: none;
                }
            }

        }
    }
`
export const ScrollBody =  styled.div`
    position: relative;
    height: 180px;
    background-color: #fff;
` 
