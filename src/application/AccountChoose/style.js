import styled from 'styled-components'

export const List = styled.div`
    background: #fff;
    margin-top: 16px;
    margin-bottom: 30px;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    .list-item {
        display: flex;
        padding: 16px 16px;
        align-items: center;
        border-bottom: 1px solid #e4e4e4;
    }
    .list-item:last-child {
        border-bottom: none;
    }
    .list-icon {
        font-size: 30px;
        padding-right: 8px;
        color:#bba8a8;
    }
    .list-p {
        font-size: 16px;
        color: #1f1f1f;
    }
    .list-p-1 {
        width: 80px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .list-p-2 {
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .list-select {
        margin-left: auto;
        font-size: 30px;
        color: #3296FA;
    }
`