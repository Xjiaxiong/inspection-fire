import styled from 'styled-components'

export const Top = styled.div`
    background-color:#242333;
    color: #fff;
    height: 100px;
    padding: 30px 16px;
    > p {
        font-size: 16px;
    }
    > p:first-child {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 2px;
    }
`
export const ScrollContainer = styled.div`
    position: fixed;
    top: 100px;
    bottom: 0;
    width: 100%;
    background-color: #F6F6F6;
`
export const List = styled.ul`
    >li {
        display: flex;
        margin: 10px;
        background-color: #fff;
        border-radius: 6px;
        align-items: center;
        padding: 16px;
        >section {
            width: 80%;
            .title {
                font-size: 16px;
                color: #101010;
                margin-bottom: 15px;
            }
            .desc {
                font-size: 14px;
                color: rgba(25, 31, 37, 0.40);
                .iconfont {
                    padding-right:4px;
                }
            }
        }
        .score {
            font-size: 26px;
            font-weight: 700;
            margin-left: auto;
        }
        .score.red {
            color: #ca4d2c;
        }
        .score.green {
            color: #68f046;
        }
    }
`