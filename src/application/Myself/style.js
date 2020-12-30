import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'

export const ContainerBottom = styled.div`
        height: 100vh;
        padding-bottom: 60px;
    `

export const Top = styled.div`
    height: ${r('500px')};
    background: #242333;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
        p {
            text-align: center;
            color: #fff;
            font-size: ${globalStyle['font-size-2']};
        }
        .title {
            font-weight: 700;
            line-height:32px;
        }
        p:last-child{
            font-size: ${globalStyle['font-size-4']};
            color: ${ globalStyle['font-color-light'] }
        }
    }
`