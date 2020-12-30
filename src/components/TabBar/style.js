import styled from'styled-components';
import style from '../../assets/global-style';


export const Tabs = styled.div`
    position: fixed;
    display: flex;
    align-item: center;
    bottom: 0;
    left: 0;
    background: #fff;
    height: 60px;
    width: 100%;
    padding: 8px 0px;
    color: ${style["color-text1-3"]};
    a {
        display: block;
        width: 33.33%;
        text-align: center;
        i{
            font-size: 24px;
        }
        p{
            font-size: 10pt;
            line-height: 14pt;
            margin-top: 2pt;
        }
    }
    a.selected { 
        color: ${style["color-brand1-6"]};
    }
`