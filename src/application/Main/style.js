
import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'
import home_bg from './img/home_bg.png'

import search from './img/search.png'
import query from './img/query.png'
import fireRecord from './img/fireRecord.png'
import hiddenQuery from './img/hiddenQuery.png'
import partAdd from './img/partAdd.png'
import dayCheck from './img/dayCheck.png'

export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 60px;
    width: 100%;
    padding: ${r('16px')};
    background: #fff;
    border-top: 1px solid ${globalStyle['border-color']};
    border-bottom: 1px solid ${globalStyle['border-color']};
`
export const Row = styled.div`
    display: flex;
    align-items: center;
    .row-left {
        margin-right: auto;
        img {
            width: ${r('90px')};
            height: ${r('90px')};
            margin-right: 8px;
            border-radius: 50%;
        }
    }
    .row-right {
        margin-left: auto;
        display: flex;
        align-self: flex-end;
    }
    .header-icon {
        font-size: ${r('90px')};
        padding-right: 8px;
        color:${globalStyle['color-brand1-9']};
    }
    .title {
        color: ${globalStyle['color-text1-4']};
        font-size: ${globalStyle['font-size-1']};
        line-height: 32px;
        font-weight: 700;
        width: 3.666rem;
        ${globalStyle.noWrap()}
    }
    .desc {
        color: ${globalStyle['color-text1-2']};
        font-size: ${globalStyle['font-size-6']};
        width: 2.666rem;
        ${globalStyle.noWrap()}
    }
    .bottom-info {
        display: flex;
    }
    .bottom-info-item {
        display: flex;
        align-items: center;
        &>img {
            width: ${r('40px')};
            height:  ${r('40px')};
            margin-right: ${r('4px')};
        }
        &>span {
            font-size: ${globalStyle['font-size-5']};
            padding-right: ${r('8px')}; 
        }
        &>span:last-child {
            padding-right: 0;
        }
    }
    .bottom-info-first {
        margin-right: ${r('16px')};
    }
`

export const TotalBox = styled.div`
    display: flex;
    margin: 10px 0;
    width: 100%;
    height: ${r('320px')};
    border-radius: 4px;
    background:url(${home_bg}) no-repeat;
    background-size: 100% 100%;
    padding: ${r('30px')} ${r('50px')};
    padding-right: ${r('30px')};
    color: #fff;
    .label {
        color:#9fb4f7;
        font-size: ${globalStyle['font-size-5']};
    }
    .value {
        font-size: ${globalStyle['font-size-3']};
        font-weight: 700;
    }
    .important {
        font-size: ${globalStyle['font-size-1']};
        font-weight: 700;
        line-height: 32px;
        width:100%;
    }
    .right {
        margin-left: auto;
    }
    .left {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`
export const NumberItem = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: ${r('15px')};
    &:last-child {
        margin-bottom:0;
    }
    &>span:last-child {
        margin-left:auto;
    }
`
export const NumberGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-content: space-between;
    &>div {
        width: 50%;
    }
    .value {
        line-height: 20px;
    }
`
export const DeviceTotal = styled.div`
    display: flex;
    &>div {
        width: 16.6666%;
        text-align: center;
        border-right: 1px solid ${globalStyle['border-color']};
        .value {
            font-size: ${globalStyle['font-size-4']};
            line-height: 28px;
            color: ${globalStyle['color-text1-4']};
            font-weight: 700;
            ${globalStyle.noWrap()}
        }
        .label {
            font-size: ${globalStyle['font-size-8']};
            color: ${globalStyle['color-text1-2']};
            ${globalStyle.noWrap()}
        }
    }
    &>div:last-child {
        border-right: none;
    }
`
export const SearchBox = styled.div`
    display: flex;
    margin: ${r('40px')} 0;
    background-color: #f2f2f5;
    padding: ${r('20px')} ${r('30px')};;
    font-size: ${globalStyle['font-size-2']};
    color: ${globalStyle['color-text1-2']};
    border-radius: 4px;
    &>i {
        font-size: ${globalStyle['font-size-1']};
        margin-left: auto;
    }
`

export const Mymenu = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`
export const MenuItem = styled.div`
    width:20%;
    margin-right: 6.666%;
    margin-bottom:${r('30px')};
    text-align: center;
    &:nth-child(4n) {
        margin-right: 0;
    }
    .icon {
        width:${r('96px')};
        height:${r('100px')};
        display: inline-block;
        background-repeat : no-repeat;
        background-size: 100% 100%;
    }
    .search {
    background-image:url(${search});
    }
    .query {
        background-image:url(${query});
    }
    .fireRecord {
        background-image:url(${fireRecord});
    }
    .hiddenQuery {
        background-image:url(${hiddenQuery});
    }
    .partAdd {
        background-image:url(${partAdd});
    }
    .dayCheck {
        background-image:url(${dayCheck});
    }
    &>p {
        font-size: ${globalStyle['font-size-7']};
        color: ${globalStyle['color-text1-3']};
        line-height: 28px;
        ${globalStyle.noWrap()}
    }
`



