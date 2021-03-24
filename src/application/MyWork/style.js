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
export const MyListContainer = styled.div`
    position: absolute;
    top:${props => props.height};
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

export const Extra = styled.div`
    font-size: ${globalStyle['font-size-4']};
    color: ${globalStyle['color-text1-4']};
    > span {
        color: ${globalStyle['color-brand1-6']};
    }
`
export const Title = styled.div`
    height: 44px;
    line-height: 44px;
    padding-left: 16px;
    color: ${globalStyle['color-text1-3']};
    font-size: ${globalStyle['font-size-4']};
`

