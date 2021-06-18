import React, { Component } from 'react';

import { Container, Result, AllResults, Downloading } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../components/Modal';
import Button from '../../styles/components/Button';
import { Progress } from 'semantic-ui-react'

import { Creators as SongAction } from '../../store/ducks/song';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';

import connection from '../../services/websocket';

let subscription;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFe: '',
            maxResults: 7,
            playlistId: props.match.params.id || -1,
            quality: 'highestaudio',
            type: 'mp3',
            url: '',
            downloadProgress: {},
        };
        this.chat = null;
    }

    componentDidMount() {
        connection.connect();
        subscription = connection.subscribe('song', (message) => {
            console.log(message);

            this.setState({
                downloadProgress: {
                    ...this.state.downloadProgress,
                    [`${message.playlist}-${message.url}`]: message,
                }
            });

        });
        console.log(subscription)
        this.props.getPlaylistsRequest();
    }

    componentWillUnmount () {
        subscription.close();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { getSearchRequest } = this.props;
        const { searchFe, maxResults } = this.state;

        const data = {
            search: searchFe,
            maxResults
        }
        if (data.search.indexOf('https://www.youtube.com/') > -1) {
            this.addSongClick(data.search)
        } else {
            if (data.search) {
                getSearchRequest(data);
            }
        }
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    addSongClick = (videoUrl) => {
        const { openModal } = this.props;
        this.setState({
            url: videoUrl
        })
        openModal();
    }
    addSongSubmit = (e) => {
        e.preventDefault();

        const { closeModal } = this.props;
        const data = {
            url: this.state.url,
            type: this.state.type,
            quality: this.state.quality,
            playlist: parseInt(this.state.playlistId),
        }
        //console.log(data)
        subscription.emit('song', data);
        closeModal();
    }
    render() {
        const { searchFe, maxResults, quality, playlistId, type, downloadProgress } = this.state;
        const results = this.props.song.search;
        const { playlistModalOpen } = this.props.song;
        const { closeModal } = this.props;
        const download = Object.keys(downloadProgress);

        return (
            <Container>
                <h1>Buscar música do youtube</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="searchFe" placeholder="Search" value={searchFe} onChange={this.handleInputChange} />
                    <Button type="submit">BUSCAR</Button>
                </form>
                {download.length !== 0 && download.map(dp =>
                    <Downloading>
                        <div className="titleDown">
                            <span>{downloadProgress[dp].audioName}</span>
                            <span>
                                {downloadProgress[dp].percent !== 100 &&
                                    (<div>{downloadProgress[dp].atualSize}MB - {downloadProgress[dp].maxSize}MB</div>)
                                }
                            </span>
                        </div>
                        <Progress percent={downloadProgress[dp].percent} indicating progress success={downloadProgress[dp].percent === 100}>
                            {downloadProgress[dp].message}
                        </Progress>
                    </Downloading>
                )}
                <AllResults>
                    {results && results.map(result => (
                        <Result key={result.videoId}>
                            <div className="videoFull">
                                <img src={result.thumbnail} alt="Thumb" width="100" />
                                <div className="videoName">{result.title}</div>
                            </div>
                            <div>
                                <Button onClick={() => this.addSongClick(result.url)}>Adicionar á playlist</Button>
                            </div>
                        </Result>
                    ))}
                </AllResults>
                {playlistModalOpen && (
                    <Modal>
                        <form onSubmit={this.addSongSubmit}>
                            <span>SELECIONE A PLAYLIST</span>
                            <select name="playlistId" onChange={this.handleInputChange} value={playlistId} required>
                                <option value="">Selecione</option>
                                {this.props.playlists.data.map(playlist => (
                                    <option key={playlist.id} value={playlist.id}>
                                        {playlist.title}
                                    </option>
                                ))}
                            </select>
                            <span>Formato</span>
                            <select name="type" onChange={this.handleInputChange} value={type}>
                                <option value="mp3">MP3</option>
                                <option value="mp4">MP4</option>
                            </select>
                            <span>Qualidade</span>
                            <select name="quality" onChange={this.handleInputChange} value={quality}>
                                <option value="highestaudio">Alta</option>
                                <option value="lowest">Baixa</option>
                            </select>
                            <Button type="submit">BAIXAR</Button>
                            <Button size="small" color="gray" onClick={closeModal}>Cancelar</Button>
                        </form>
                    </Modal>
                )}
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    song: state.song,
    playlists: state.playlists,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...SongAction, ...PlaylistsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
