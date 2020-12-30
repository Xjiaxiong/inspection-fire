import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    .fade {
        position: absolute;
    }
    .fade-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .fade-enter-active {
        opacity: 1;
        transform: translateX(0);
        transition: all 500ms;
    }

    .fade-exit {
        opacity: 1;
        transform: translateX(0);
    }

    .fade-exit-active {
        opacity: 0;
        transform: translateX(-100%);
        transition: all 500ms;
    }
`