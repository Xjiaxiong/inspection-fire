import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'

export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #f5f5f5;
`
export const TabsBox = styled.div`
    position: relative;
    height: 100%;
`
export const TopInfo = styled.div`
    display: flex;
    height: ${r('130px')};
    background-color: #fff;
    .item {
        display: flex;
        flex-direction: column;
        width: 33.333%;
        height: 100%;
        justify-content: flex-start;
        align-items: center;
        .count {
            font-size: ${globalStyle['font-size-2']};
            color: ${globalStyle['color-brand1-6']};
            font-weight: 700;
            line-height: 28px;
            margin-top: ${r('20px')};
        }
        .label {
            font-size: ${globalStyle['font-size-6']};
            color: ${globalStyle['color-text1-4']};
        }
        .bottom-bar {
            width: 60%;
            height: 4px;
            background-color: ${globalStyle['color-brand1-6']};
            margin-top: auto;
        }
    }
`
export const MyListContainer = styled.div`
    position: absolute;
    /* top: calc(${r('130px')} + ${props => props.height} + 93.5px); */
    top: 50px;
    height:300px;
    left: 0;
    bottom: 0;
    overflow: hidden;
    width: 100%;
`;

export const MyList = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`
export const MyListItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${r('20px')};
    background:#fff;
    border-bottom: 1px solid ${globalStyle['border-color']};
    &:first-child {
        border-top: 1px solid ${globalStyle['border-color']};
    }
    header {
        color: ${globalStyle['color-text1-4']};
        font-size: ${globalStyle['font-size-4']};
        font-weight: 700;
        padding-bottom: ${r('40px')}
    }
    .bottom {
        display: flex;
        &>span {
            font-size: ${globalStyle['font-size-5']};
            color: ${globalStyle['color-text1-3']}
        }
        &>span:last-child {
            margin-left: auto;
            color: ${globalStyle['color-brand1-6']}
        }
    }
`
export const DeteScope = styled.div`
    display: flex;
    height: 50px;
    align-items: center;
    background:#fff;
    padding: 0 16px;
    margin-bottom: 9px;
    .date-box {
        margin-right: ${r('10px')};
        .label {
            font-size: ${globalStyle['font-size-6']};
            color: ${globalStyle['color-text1-2']};
        }
        .date {
            font-size: ${globalStyle['font-size-4']};
            color: ${globalStyle['color-text1-4']};
            line-height: 1.4;
            font-weight: 700;
        }
    }
    .line {
        height: 4px;
        width: ${r('80px')};
        margin: 0 ${r('20px')};
        background-color: ${globalStyle['border-color']};
    }
    .btn {
        margin-left: auto;
    }
`

