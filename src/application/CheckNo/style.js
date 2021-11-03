import styled from 'styled-components'
import globalStyle, { r } from '../../assets/global-style'


export const Container = styled.div`
    position: fixed;
    top: 0;
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
export const WBlock = styled.div`
    margin: 10px 0;
    background-color: #fff;
    padding: 8px 16px;
    .f-row {
        margin-bottom: 10px;
        align-items: center;
    }
    .label-5 {
        width: 85px;
        margin-right: 5px;
        font-size: ${globalStyle['font-size-4']};
        color: ${globalStyle['color-text1-2']};
    }
    .list-value {
        flex: 1;
        font-size: ${globalStyle['font-size-4']};
        color: ${globalStyle['color-text1-4']};
    }
    img {
        width: 120px;
        height: 120px;
        margin: 5px 0;
    }
`  