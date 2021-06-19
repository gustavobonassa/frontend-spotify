import React, { Component } from "react";

import {
  Container,
  Result,
  AllResults,
  SearchHeader,
  DownloadItem,
  SmallTime,
} from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import Button from "../../styles/components/Button";
import { Progress, Dropdown } from "semantic-ui-react";

import { Creators as SongAction } from "../../store/ducks/song";
import { Creators as PlaylistsActions } from "../../store/ducks/playlists";
import qs from "qs";
import connection from "../../services/websocket";

let subscription;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFe: "",
      maxResults: 7,
      playlistId: props.match.params.id || -1,
      quality: "highestaudio",
      type: "mp3",
      url: "",
      downloadProgress: {},
      dropdownOpen: false,
    };
  }

  componentDidMount() {
    connection.connect();
    subscription = connection.subscribe("song", (message) => {
      let newSong = this.state.dropdownOpen;
      const key = `${message.playlist}-${message.url}`;
      if (!this.state.downloadProgress[key]) {
        newSong = true;
      }
      this.setState({
        downloadProgress: {
          ...this.state.downloadProgress,
          [key]: message,
        },
        dropdownOpen: newSong,
      });
    });
    this.props.getPlaylistsRequest();
    this.searchByParams();
  }

  componentWillUnmount() {
    subscription.close();
  }

  searchByParams() {
    const { history } = this.props;

    const location = history.location.search.replace("?", "");
    const params = qs.parse(location);

    if (params.q) {
      this.setState(
        {
          searchFe: params.q,
        },
        () => this.handleSubmit()
      );
    }
  }

  handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    const { getSearchRequest } = this.props;
    const { searchFe, maxResults } = this.state;

    const data = {
      search: searchFe,
      maxResults,
    };
    if (data.search.indexOf("https://www.youtube.com/") > -1) {
      this.addSongClick(data.search);
    } else {
      if (data.search) {
        getSearchRequest(data);
      }
    }
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addSongClick = (videoUrl) => {
    const { openModal } = this.props;
    this.setState({
      url: videoUrl,
    });
    openModal();
  };
  addSongSubmit = () => {
    const { closeModal } = this.props;
    const data = {
      url: this.state.url,
      type: this.state.type,
      quality: this.state.quality,
      playlist: parseInt(this.state.playlistId),
    };
    //console.log(data)
    subscription.emit("song", data);
    closeModal();
  };
  render() {
    const { searchFe, quality, playlistId, type, downloadProgress } =
      this.state;
    const results = this.props.song.search;
    const { playlistModalOpen, loading } = this.props.song;
    const { closeModal } = this.props;
    const download = Object.keys(downloadProgress);
    const hasDownload =
      download.filter((e) => downloadProgress[e].finished === false).length > 0;

    return (
      <>
        <Container>
          {playlistModalOpen && (
            <Modal>
              <form>
                <span>SELECIONE A PLAYLIST</span>
                <select
                  name="playlistId"
                  onChange={this.handleInputChange}
                  value={playlistId}
                  required
                >
                  <option value="">Selecione</option>
                  {this.props.playlists.data.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.title}
                    </option>
                  ))}
                </select>
                <span>Formato</span>
                <select
                  name="type"
                  onChange={this.handleInputChange}
                  value={type}
                >
                  <option value="mp3">MP3</option>
                  <option value="mp4">MP4</option>
                </select>
                <span>Qualidade</span>
                <select
                  name="quality"
                  onChange={this.handleInputChange}
                  value={quality}
                >
                  <option value="highestaudio">Alta</option>
                  <option value="lowest">Baixa</option>
                </select>
                <Button onClick={() => this.addSongSubmit()}>BAIXAR</Button>
                <Button size="small" color="gray" onClick={closeModal}>
                  Cancelar
                </Button>
              </form>
            </Modal>
          )}
          <div>
            <h1>Buscar música do youtube</h1>
            <SearchHeader>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="searchFe"
                  placeholder="Search"
                  value={searchFe}
                  onChange={this.handleInputChange}
                />
                <Button
                  type="submit"
                  style={{
                    marginLeft: 5,
                  }}
                  onClick={(e) => this.handleSubmit(e)}
                >
                  BUSCAR
                </Button>
              </form>
              <Dropdown
                text="Downloads"
                scrolling
                direction="left"
                onClick={() =>
                  this.setState({ dropdownOpen: !this.state.dropdownOpen })
                }
                open={this.state.dropdownOpen}
                onBlur={() => this.setState({ dropdownOpen: false })}
                loading={hasDownload}
              >
                <Dropdown.Menu>
                  {download.length !== 0 ? (
                    <>
                      {download.reverse().map((dp) => (
                        <Dropdown.Item>
                          <DownloadItem>
                            <div className="titleDown">
                              <span className="title">
                                {downloadProgress[dp].audioName}
                              </span>
                              <span>
                                <span>
                                  {downloadProgress[dp].percent !== 100 && (
                                    <div className="small-size">
                                      {downloadProgress[dp].currentSize}MB -{" "}
                                      {downloadProgress[dp].maxSize}MB
                                    </div>
                                  )}
                                </span>
                              </span>
                            </div>
                            <Progress
                              percent={downloadProgress[dp].percent}
                              active={!downloadProgress[dp].finished}
                              size="tiny"
                              color={
                                downloadProgress[dp].finished ? "green" : "blue"
                              }
                            >
                              <span
                                style={{
                                  color: downloadProgress[dp].finished
                                    ? "green"
                                    : "#2185d0",
                                }}
                              >
                                {downloadProgress[dp].message}
                              </span>
                            </Progress>
                          </DownloadItem>
                        </Dropdown.Item>
                      ))}
                    </>
                  ) : (
                    <Dropdown.Item>Voce nao fez nenhum download</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </SearchHeader>
          </div>
        </Container>
        <div
          style={{
            overflowY: "auto",
            padding: "0 20px",
          }}
        >
          <AllResults>
            {loading ? (
              <div
                style={{
                  width: "100%",
                  height: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading
                  style={{
                    width: 100,
                  }}
                />
              </div>
            ) : (
              <>
                {results &&
                  results.map((result) => (
                    <Result key={result.videoId}>
                      <div className="videoFull">
                        <div style={{ position: "relative", height: 60 }}>
                          <img
                            src={result.thumbnail}
                            alt="Thumb"
                            width="100"
                            style={{
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <SmallTime>{result.timestamp}</SmallTime>
                        </div>
                        <div className="videoName">{result.title}</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Button
                          onClick={() => this.addSongClick(result.url)}
                          style={{
                            marginRight: 5,
                          }}
                          color="gray"
                        >
                          Baixar
                        </Button>
                        <Button onClick={() => this.addSongClick(result.url)}>
                          Adicionar
                        </Button>
                      </div>
                    </Result>
                  ))}
              </>
            )}
          </AllResults>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  song: state.song,
  playlists: state.playlists,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...SongAction, ...PlaylistsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
