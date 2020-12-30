import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'
import bg from './darkBuilding.png'

export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 50px;
    width: 100%;
    background: #f5f5f5;
`

export const Top = styled.div`
    background: url(${bg}) no-repeat;
    background-size: 100% 100%;
    padding: 16px;
    .row {
        display: flex;
    }
    .block {
        margin-bottom: 15px;
    }
    .label {
        color: rgba(255,255,255,.3);
        font-size: ${globalStyle['font-size-6']};
    }
    .value {
        color: #fff;
        font-size: ${globalStyle['font-size-4']};
        line-height: 1.8;
        font-weight: 700;
        ${globalStyle.noWrap()}
    }
`

export const  CheckList = styled.div`
    
`
export const  ListItem = styled.div`
    padding: 10px 0;
    margin: ${r('20px')} 0;
    background-color: #fff;
    .content {
        position: relative;
        padding: 15px;
        padding-right: 80px;
        .text {
            font-size: ${globalStyle['font-size-4']};
            color: ${globalStyle['color-text1-4']};
            line-height: 1.2;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .desc {
            font-size: ${globalStyle['font-size-5']};
            color: ${globalStyle['color-text1-2']};
            line-height: 1.2;
        }
        .btn {
            position: absolute;
            top: 15px;
            right: 15px;
        }
    }
    .camera-box {
        padding: 15px;
        .camera-box-title {
            font-size: ${globalStyle['font-size-3']};
            color: ${globalStyle['color-text1-4']};
        }
    }
    .am-image-picker-list {
        padding-left: 0;
    }

`
export const Footer = styled.div`
    position: fixed;
    width: 100%;
    height: 50px;
    left: 0;
    bottom: 0;
    background: #fff;
    padding: 0 15px;
`