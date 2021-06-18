import styled from 'styled-components';

export const Container = styled.div`
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #19191B;
    padding: 12px;
    z-index: 100;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
`;

export const Current = styled.div`
    width: 250px;
    display: flex;
    align-items: center;

    img {
        width: 48px;
        height: 48px;
    }

    div {
        margin-left: 12px;
        display: flex;
        flex-direction: column;

        span {
            font-size: 13px;
            color: #fff;
        }
        small {
            font-size: 11px;
            color: #b3b3b3;
            margin-top: 5px;
        }
    }
`;

export const Volume = styled.div`
    display: flex;
    align-items: center;
    width: 100px;
    margin-right: 20px;

    img {
        margin-right: 5px;
    }
`;

export const Progress = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Controls = styled.div`
    display: flex;
    align-items: center;

    button {
        background: transparent;
        border: 0;
        margin: 0 15px;
    }
`;

export const Time = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;

    span {
        font-size: 11px;
        color: #b3b3b3;
        width: 25px;
    }
`;

export const ProgressSlider = styled.div`
    width: 500px;
    margin: 0 15px;
`;
