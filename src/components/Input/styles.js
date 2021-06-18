import styled from 'styled-components';

export const InputStyle = styled.input`
    height: 40px;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.1);
    color: #f6f6f6;
    transition: border 0.15s easy;
    font-size: 16px;

    &:focus {
        border-color: #f77f00;
    }
`;
