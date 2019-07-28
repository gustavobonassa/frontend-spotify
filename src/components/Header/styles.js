import styled from 'styled-components';

import SearchIcon from '../../assets/images/search.svg';

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 0;

    .logout {
        display: flex;
        button {
            margin-left: 10px;
            padding: 5px;
            background-color: transparent;
            border: 1px solid #c16a6a;
            color: #c16a6a;
            border-radius: 5px;
        }
    }
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
            border-color: #7289da;
        }
    }
`;

export const Search = styled.div`
    display: flex;
    align-items: center;
    border-radius: 12px;
    height: 24px;
    width: 175px;
    padding: 6px 7px 6px 26px;
    background: #FFF url(${SearchIcon}) no-repeat 7px center;

    input {
        flex: 1;
        font-size: 13px;
        color: #121212;
        width: 100%;
        border: 0;
    }
`;
export const User = styled.div`
    display: flex;
    align-items: center;
    font-size:13px;

    img {
        width: 27px;
        height: 27px;
        border-radius: 50%;
        margin-right: 5px;
    }

`;
