import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'


export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
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

export const ListInfo = styled.div`
    position:relative;
    background:#fff;
    font-size: ${globalStyle['font-size-4']};
    color: ${globalStyle['color-text1-4']};
    .row {
        display: flex;
        padding: 16px;
        border-bottom: 1px solid ${globalStyle['border-color1']};
        .label {
            margin-right: ${r('16px')};
        }
        .text {
            display: flex;
            flex-wrap: wrap;
            flex: 1;
        }
    }
    .state-img {
        position: absolute;
        bottom: 16px;
        right: 16px;
        height: ${r('160px')};
        width: ${r('170px')};
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
    .desc {
        padding-bottom: ${r('8px')};
        color: ${globalStyle['color-text1-2']};
        font-size: ${globalStyle['color-text1-6']};
    }
    
`