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