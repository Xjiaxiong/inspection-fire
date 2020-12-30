import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'

export const ContainerBottom = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 60px;
`
export const Map = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    .anchorBL {
        display: none;
    }
`
export const MapContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    padding: 8px;
    .top {
        height: 44px;
        display: flex;
        background: #fff;
        border-radius: 4px;
        padding: 0 8px;
        align-items: center;
        .label {
            font-size: 16px;
            color: ${globalStyle['color-text1-4']};
            width: ${r('150px')};
            font-weight: 700;
            text-align: center;
        }
        .search {
            height: 32px;
            display: flex;
            align-items: center;
            flex: 1;
            border-left: 1px solid ${globalStyle['border-color1']};
            padding:0 8px;
            color: ${globalStyle['color-text1-2']};
            font-size: ${globalStyle['font-size-4']};
            >i {
                margin-left: auto;
                font-size: ${globalStyle['font-size-2']};
                color: ${globalStyle['color-text1-4']};
            }
        }
    }
    .item-group {
        margin-top: 8px;
        background: #fff;
        border-radius: 4px;
        padding: 8px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        height: 120px;
        align-content: space-between;
        >li {
            border-right: 1px solid ${globalStyle['border-color2']};
            width: 16.6666%;
            >p {
                font-size: ${globalStyle['font-size-4']};
                line-height: 32px;
                color: #8d9fff;
                font-weight: 700;
            }
            >div {
                font-size: ${globalStyle['font-size-7']};
                color: ${globalStyle['color-text1-4']};
                ${globalStyle.noWrap()}
            }
        }
        >li:nth-child(6) {
            border-right: none;
        }
    }
    .alarm-panel {
        position: fixed;
        right: 8px;
        bottom: 60px;
        display: flex;
        flex-direction: column;
        >li {
            position: relative;
            background: #fff;
            padding: 8px;
            border-radius: 6px;
            >img {
                display: block;
                width: 32px;
                height: 32px;
                margin: 4px auto;
            }
            >p {
                text-align: center;
                font-size: ${globalStyle['font-size-6']};
                color: ${globalStyle['color-text1-4']};
                font-weight: 700;
            }
            >span {
                width: 33px;
                height: 33px;
                text-align:center;
                line-height: 33px;
                color: #fff;
                font-size: 12px;
                border-radius: 50%;
                position: absolute;
                top: 0;
                left: 0;
                margin-left: -11px;
                margin-top: -11px;
                background: #87a1fe;
            }
            margin-bottom: 15px;
        }
    }
`
export const SelectPanel = styled.div`
    position: fixed;
    width: 100%;
    top: ${props => props.top};
    bottom: 80px;
    padding: 8px;
    z-index: 10;
    transition: all, 0.3s;
    .top {
        padding: 16px 8px;
        color: #fff;
        font-size: 16px;
        background-color: #108ee9;
        font-weight: 700;
    }
    .condition-row {
        display: flex;
        background-color: #fff;
        .area-type {
            vertical-align: middle;
            padding: 16px 8px;
            padding-right: 2px;
            border-right: ${globalStyle['border-color1']};
            font-size: 14px;
            .caret {
                display: inline-block;
                border: 4px solid transparent;
                border-top: 4px solid #101010;
                margin-left: 15px;
            }
        }
        .area-type.cur {
            color: #f8822a;
        }
        border-bottom: 1px solid ${globalStyle['border-color1']};  
    }
    .area-list-body {
        position: relative;
        overflow-x: hidden;
        height: 70%;
        background-color: #f5f5f5;
        li {
           font-size: 16px;
           padding: 15px 8px;
           background-color: #fff;
           color: #101010;
           border-bottom: 1px solid ${globalStyle['border-color2']};
           font-weight: 700;
           display: flex;
           align-items: center;
           .right {
               margin-left: auto;
               color: ${globalStyle['green']}
           }  
        }
        li:last-child {
            border-bottom: none;  
        }
    }
    .btns {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 1%;
        .btn {
            width: 46%;
        }
    }

`