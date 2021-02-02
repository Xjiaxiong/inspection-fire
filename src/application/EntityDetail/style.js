import styled from 'styled-components'
import globalStyle, { r }  from '../../assets/global-style'
export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: ${globalStyle["grey-bg"]};
`
export const BaseInfo = styled.div`
    padding: 15px;
    color: ${globalStyle["color-text1-4"]};
    font-size: 16px;
    >h1 {
        font-size: 24px;
        line-height: 32px;
        font-weight: 700;
        margin: 10px 0 15px 0;
    }
    .row {
        display: flex;
        margin-bottom: 15px;
        .label {
            color: ${globalStyle["color-text1-2"]};
            width: 110px;
        }
        .value {
            flex: 1;
            display: table-cell;
            >p {
                ${globalStyle.tableCell()}
            }
            >img {
                width: ${r('100px')};
                height: ${r('100px')};
                margin-right: 10px;
            }
        }
    }

`