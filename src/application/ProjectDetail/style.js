import styled from 'styled-components'
import globalStyle from '../../assets/global-style'

const whitePanel = () => {
    return `
        background-color: #fff;
        padding: 8px 10px;
        border-radius: 4px;
        font-size: 16px;
    `
}

export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #464b68;
    padding: 16px;
`
export const Title = styled.h1`
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    >span {
        margin-left: auto;
        padding: 6px 12px;
        border: 1px solid ${globalStyle['yellow']};
        border-radius: 10px;
        color: ${globalStyle['yellow']};
        font-size: 14px;
        .iconfont {
            font-size:12px;
            padding-right:4px;
        }
    }
`
export const Base = styled.div`
    ${whitePanel()}
    color: #626262;
    >div {
        padding: 8px 0;
        padding-left: 12px;
    }
    .icon {
        font-size: 14px;
        margin-right: 8px;
    }
    .tel {
        color: ${globalStyle['yellow']}
    }
    .txt {
        flex: 1;
    }
`
export const Rank = styled.div`
    ${whitePanel()}
    display: flex;
    margin-top: 1px;
    .gap-line {
        width: 2%;
        display: flex;
        justify-content: center;
    }
    .gap-line:after {
        content: '';
        display: block;
        height: 100%;
        width: 1px;
        background-color: ${globalStyle['border-color1']};
    }
    .item {
        padding: 0 8px;
        display: flex;
        align-items: center;
        width: 49%;
        font-size: ${globalStyle['font-size-4']};
        color: ${globalStyle['color-text1-4']};
        .icon {
            width: 30px;
            height: 30px;
            background-color: ${globalStyle['yellow']};
            line-height: 30px;
            text-align: center;
            color: #fff;
            font-size: 16px;
            border-radius: 50%;
            margin-right: 4px;
        }
        >span {
           margin-left: auto;
           font-weight: 700; 
        }
    }
`
export const Alarm = styled.div`
    ${whitePanel()}
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    min-height: 100px;
    p {
        font-size: ${globalStyle['font-size-4']};
        color: ${globalStyle['color-text1-4']};
        font-weight: 500;
        line-height: 1.47;
        margin-bottom: 10px;
    }
    .link-text {
        text-align: right;
        font-size: ${globalStyle['font-size-4']};
        color: #eaa969;
        
        .iconfont {
            color: #eaa969;
            padding: 0 2px;
        }
    }
    .full {
        position: relative;
        width: 100%;
        height: 100px;
    }
`

export const SystemMenu = styled.ul`
    background-color: #fff;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    >li {
        width: 33.33%;
        display: flex;
        box-sizing: border-box;
        padding: 15px;
        border-bottom: 1px solid ${globalStyle['border-color1']};
        border-right: 1px solid ${globalStyle['border-color1']};
        flex-direction: column;
        align-items: center;
        .img {
            width: 30px;
            height: 30px;
        }
        >p {
            font-size: ${globalStyle['font-size-5']};
            color: ${globalStyle['color-text1-4']};
            font-weight: 700;
            margin-top: 8px;
            ${globalStyle.noWrap()}
        }
    }
    >li:nth-child(3n) {
        border-right: none;
    }
`