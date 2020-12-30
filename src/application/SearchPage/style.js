import styled from 'styled-components'
import globalStyle from '../../assets/global-style'

export const Top = styled.div`
    .am-search {
        background: #fff;
    }
    .am-search-input {
        background: #efeff4;
    }
`
export const ScrollContainer = styled.div`
    position: fixed;
    top: 44px;
    bottom: 0;
    width: 100%;
`
export const SubBox = styled.div`
    >div {
        display: flex;
        font-size: 14px;
        > i {
          color: ${globalStyle['color-text1-2']};
          margin-right: 4px;
        }
        > span {
          color: ${globalStyle['color-text1-3']}
        }
        margin-bottom: 4px;
    }

`