import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 30px;
    overflow-y: auto;
    overflow-x: hidden;

    input {
        height: 40px;
        width: 100%;
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
            border-color: #f77f00;
        }
    }
    textarea {
        height: 100px;
        width: 100%;
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
            border-color: #f77f00;
        }
    }
`;

export const NewPlaylist = styled.div`
    display: flex;

    #thumbnail {
        overflow: hidden;
    }
    label[for="thumbnail"] {
        margin: auto;
        width: 200px;
        height: 200px;
        background: #eee;
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        overflow: hidden;
    }
`;
