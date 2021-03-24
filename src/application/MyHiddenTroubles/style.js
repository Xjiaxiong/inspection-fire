import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'

export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #f5f5f5;
`

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

