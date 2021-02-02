import styled from 'styled-components'
import globalStyle, { r, noWrap } from '../../assets/global-style'

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow: hidden;
`

export const Top = styled.div`
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .serch-bar {
        display: flex;
        height: 36px;
        width: calc( 100% - 90px);
        background-color: #fff;
        align-items: center;
        border-radius: 6px;
        >i {
            font-size: 26px;
            padding:0 8px;
        }
        >input {
            border: none;
            padding: 8px;
            font-size: 16px;
            color:${globalStyle['color-text1-4']}
        }     
    }
`
export const BaseInfo = styled.div`
    margin: 8px;
    padding: 8px;
    color: #fff;
    background: #4f5275;
    &> header {
        color: #fff;
        font-size: 16px;
        font-weight: 700;
    }
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        text-align: center;
        .bar {
            width: 3px;
            height: 30px;
            margin: 0 50px;
            background-color: #ccc;
        }
        .count {
            font-size: 36px;
        }
        .label {
            font-size: ${globalStyle['font-size-5']};
            line-height: 1.47;
        }
        .label.abnormal {
            color: #ffa042;
        }
    }
`
export const LineBox = styled.div`
    position: relative;
    margin: 12px;
    margin-top: -16px;
    background-color: #fff;
    min-height: 300px;
    z-index:9;
    box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    padding: 16px;
`
export const DescBox = styled.div`
    position: relative;
    padding-bottom: 40px;
    padding-top: 8px;
    color: ${globalStyle['color-text1-3']};
    font-size: ${globalStyle['color-text1-6']};
    .date-box {
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
            .color-red {
                padding-left: 4px;
            }
        }
    }
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

export const Dot = styled.div`
    width: 22px;
    height: 22px;
    .green,
    .yellow {
        height: 100%;
        border-radius: 50%;
    }
    .green {
        background: ${globalStyle['green']}
    }
    .yellow {
        background: ${globalStyle['yellow']}
    }
    .grey {
        background: #ccc;
    }
`