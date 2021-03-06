import styled from "styled-components";

import SearchIcon from "../../assets/images/search.svg";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;

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
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  height: 24px;
  width: 175px;
  padding: 6px 7px 6px 26px;
  background: #fff url(${SearchIcon}) no-repeat 7px center;

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
  font-size: 13px;
  border-radius: 15px;
  background-color: black;
  padding: 2px;
  padding-right: 10px;
  cursor: pointer;

  img {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;
