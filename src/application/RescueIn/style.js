
import styled from 'styled-components'
import globalStyle ,{ r } from '../../assets/global-style'

export const ScrollContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 60;
    width: 100%;
    background-color: ${globalStyle["grey"]};
`

export const Footer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px;
`