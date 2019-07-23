import styled from 'styled-components';

export const Container = styled.div`

    input {
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
`;
