import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    height: 100%;
    background: #121212;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SignForm = styled.form`
    background: #313033;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    padding: 40px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    h1 {
        font-size: 26px;
        font-weight: 500;
        text-align: center;
        margin: 0 0 10px;
    }

    span {
        color: #b9bbbe;
        font-size: 14px;
        line-height: 16px;
        font-weight: 600;
        margin-top: 15px;
    }
    input {
        height: 40px;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
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

    button {
        margin: 20px 0 0;
    }

    a {
        text-decoration: none;
        text-align: center;
        margin-top: 10px;
        font-size: 12px;
        color: white;
    }
`;
