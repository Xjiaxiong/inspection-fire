import styled from 'styled-components';
import globalStyle, { r } from '../../assets/global-style'
import building from './buildingBg.png'

export const Container = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    bottom: 0;
    width: 100%;
    padding: ${r('32px')} 0;
    background: #f5f5f5;
    header {
        padding: ${r('40px')};
        font-size: ${globalStyle['font-size-6']};
        color: ${globalStyle['color-text1-3']};
    }
`
export const SearchBox = styled.div`
    display: flex;
    margin: ${r('40px')};
    margin-bottom: 0;
    background-color: #fff;
    padding: ${r('20px')} ${r('30px')};
    font-size: ${globalStyle['font-size-2']};
    color: ${globalStyle['color-text1-2']};
    border-radius: 4px;
    &>i {
        font-size: ${globalStyle['font-size-1']};
        margin-left: auto;
    }
`
export const Desc = styled.div`
    text-align: center;
    .img {
        width: ${r('312px')};
        height: ${r('312px')};
        background: url(${building}) no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;    
    }
    &>p {
        line-height: 32px;
        font-size: ${globalStyle['font-size-4']};
    }
`
export const Around = styled.div`
    position: relative;
    height: ${r('600px')};
    ul {
        width: 100%;
    }
    li {
        padding: ${r('30px')} ${r('40px')};
        background: #fff;
        border-bottom: 1px solid ${globalStyle['border-color']};
        &:last-child {
            border-bottom: none;
        }
    }
    .row {
        display: flex;
        align-items: center;
        .title {
            margin-right: auto;
            font-size: ${globalStyle['font-size-4']};
            color: ${globalStyle['color-text1-4']};
            line-height:32px;
            display: block;
            width:${r('500px')};
            ${globalStyle.noWrap()}
        }
        .type {
            margin-left: auto;
            font-size: ${globalStyle['font-size-6']};
            color: ${globalStyle['color-text1-4']};
        }
        .address {
            margin-right: auto;
            font-size: ${globalStyle['font-size-5']};
            color: ${globalStyle['color-text1-2']};
            display: block;
            width:${r('500px')};
            ${globalStyle.noWrap()}
        }
        .distance {
            margin-left: auto;
            font-size: ${globalStyle['font-size-7']};
            color: ${globalStyle['color-text1-1']};
        }
    }
`