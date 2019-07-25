import styled from 'styled-components';

export const Container = styled.div`
    overflow-y: auto;
    margin-top: 30px;

    input, select {
        height: 40px;
        width: 100%;
        max-width: 400px;
        padding: 10px;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        background-color: rgba(0, 0, 0, 0.1);
        color: #f6f6f6;
        margin-top: 8px;
        margin-right: 5px;
        transition: border 0.15s easy;
        font-size: 16px;

        &:focus {
            border-color: #7289da;
        }
    }
    option {
        color: #d6d3d3;
        background-color: #424040;
    }
    input[type="number"] {
        max-width: 70px;
    }
`;
export const AllResults = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 5px;
`;
export const Result = styled.div`
    height: 100px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #d8d7d6;

    img {
        border-radius: 5px;
    }

    .videoFull {
        display: flex;
        word-wrap: break-word;
    }
    .videoName{
        margin: auto;
        margin-left: 10px;
    }

    &:last-child {
        border-bottom: none;
    }
`;

export const Downloading = styled.div`
    margin: 10px;
    padding: 10px;
`;
