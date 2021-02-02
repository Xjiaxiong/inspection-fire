import styled from 'styled-components'
import globalStyle ,{ r } from '../../assets/global-style'

export const Top = styled.div`
    .am-search {
        background: #fff;
    }
    .am-search-input {
        background: #efeff4;
    }
`
export const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 65px;
    width: 100%;
`
export const SelectPanel = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    padding: 8px;
    z-index: 10;
    visibility: hidden;
    opacity: 0;
    transition: all, 0.3s;
    background-color: rgba(0,0,0,.3);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .top {
        height: 50px;
        padding: 0 10px;
        color: ${globalStyle["color-text1-4"]};
        font-size: 16px;
        background-color: #fff;
        font-weight: 700;
        display: flex;
        align-items: center;
        .center {
            justify-self: center;
        }
        .left {
            margin-right: auto;
        }
        .right {
            margin-left: auto;
        }
    }
    .condition-row {
        display: flex;
        background-color: #fff;
        height: 50px;
        align-items: center;
        border-top: 1px solid ${globalStyle["border-color1"]};
        border-bottom: 1px solid ${globalStyle["border-color1"]};
        .area-type {
            width: 25%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-right: 1px;
            border-right: ${globalStyle['border-color1']};
            font-size: 14px;
            .caret {
                position: relative;
                top: 2px;
                border: 4px solid transparent;
                border-top: 4px solid #101010;
                margin-left: 4px;
            }
        }
        .area-type.cur {
            color: #f8822a;
        }
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
`

export const Footer = styled.div`
    position: fixed;
    height: 50px;
    padding: 4px 16px;
    width: 100%;
    left: 0;
    bottom: 10px;
    z-index: 9;
`