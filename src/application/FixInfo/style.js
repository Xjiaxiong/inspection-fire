import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'


export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    .more-link {
        position: absolute;
        right: 10px;
        bottom: 10px;
        display:flex;
        align-items: center;
        font-size: ${globalStyle['font-size-4']};
        color: ${globalStyle['color-brand1-6']};
        & > i {
            padding-left: 2px;
        }
    }
`
export const Title = styled.div`
    height: 44px;
    line-height: 44px;
    padding-left: 16px;
    color: ${globalStyle['color-text1-3']};
    font-size: ${globalStyle['font-size-4']};
`

export const Top = styled.div`
    position:relative;
    background:#fff;
    font-size: ${globalStyle['font-size-4']};
    .row {
        display: flex;
        padding: 16px;
        .left {
            margin-right: auto;
        }
        .right {
            margin-left: auto;
        }
    }
    .first {
        border-bottom: 1px solid ${globalStyle['border-color']}
    }
    .desc {
        color: ${globalStyle['color-text1-3']};
        font-size: ${globalStyle['font-size-2']};
        font-weight: 700;
        i {
            font-size: ${globalStyle['font-size-2']};
            color: ${globalStyle['color-brand1-6']};
            padding-right: 8px;
        }
        &>span {
            ${ globalStyle.noWrap() }
        }
    }
    .state {
        font-weight: 700;
        color: #ecac52;
        font-size: ${globalStyle['font-size-4']};
    }
    .label {
        color: ${globalStyle['color-text1-2']};
        font-size: ${globalStyle['font-size-6']};
        padding-right: 10px;
    }
    .more-row-text-row {
        padding-bottom:30px;
    }
    .more-row-text {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        min-height: ${r('100px')};
        font-size: ${globalStyle['font-size-4']};
    }
`
export const WhitePanel = styled.div`
    background-color: #fff;
    padding: 10px 0;
    padding-left: 16px;
`
export const StepImg = styled.img`
    width: 22px;
    height: 22px;
`
export const DescBox = styled.div`
    position: relative;
    padding-bottom: 40px;
    padding-top: 8px;
    color: ${globalStyle['color-text1-3']};
    font-size: ${globalStyle['color-text1-6']};
    .date {
        position:absolute;
        font-size: 14px;
        line-height: 26px;
        font-weight: 700;
        top: -30px;
        right: 10px;
        color: ${globalStyle['color-text1-4']};
    }
    .row {
        display: flex;
        padding-bottom: ${r('8px')};
        .label {
            width: ${r('190px')};
        }
        .text {
            flex: 1;
            display: flex;
            flex-wrap: nowrap;
            img{
                width: ${r('90px')};
                height: ${r('90px')};
                margin-right: 10px;
            }
        }
    }
`
export const BottomBtn = styled.div`
    position: fixed;
    bottom: 5px;
    left: 0;
    height: 44px;
    display: flex;
    width: 100%;
    .btn {
        width: 50%;
        height: 100%;
    }
    .btn-full {
        width: 100%;
        height: 100%;
    }
`