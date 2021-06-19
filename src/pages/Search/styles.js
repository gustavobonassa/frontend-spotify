import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;

  input,
  select {
    height: 40px;
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.1);
    color: #f6f6f6;
    transition: border 0.15s easy;
    font-size: 16px;

    &:focus {
      border-color: #f77f00;
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
  overflow-y: auto;
`;

export const Result = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);

  img {
    border-radius: 5px;
  }

  .videoFull {
    display: flex;
    word-wrap: break-word;
    align-items: center;
  }
  .videoName {
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
  border: 1px solid #4fd84f;
  border-radius: 5px;

  .titleDown {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
`;

export const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  form {
    display: flex;
    align-items: center;
  }
`;

export const DownloadItem = styled.div`
  min-width: 250px;

  .small-size {
    font-size: 12px;
    color: #999;
  }
  .title {
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
    font-weight: bold;
  }
`;

export const SmallTime = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  padding: 0 5px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  font-size: 10px;
`;
