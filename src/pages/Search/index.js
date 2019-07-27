import React, { Component } from 'react';

import { Container, Result, AllResults, Downloading } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../components/Modal';
import Button from '../../styles/components/Button';
import { Progress } from 'semantic-ui-react'

import { Creators as SongAction } from '../../store/ducks/song';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';

import setupWebsocket from '../../services/websocket';
const ws = setupWebsocket().subscribe('song');

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
            downloadProgress: []
        };
        this.chat = null;
    }

    componentDidMount() {
        this.chat = ws;

        this.chat.on('message', (message) => {
            //console.log(message);

            this.setState({
                downloadProgress: message
            });

        })
        this.props.getPlaylistsRequest();
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
            playlist: parseInt(this.state.playlistId)
        }
        //console.log(data)
        this.chat.emit('song', data);
        closeModal();
    }
    render() {
        const { searchFe, maxResults, quality, playlistId, type, downloadProgress } = this.state;
        const { results } = this.props.song.search;
        const { playlistModalOpen } = this.props.song;
        const { closeModal } = this.props;
        //console.log(downloadProgress)
        return (
            <Container>
                <h1>Buscar música do youtube</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="searchFe" placeholder="Search" value={searchFe} onChange={this.handleInputChange} />
                    <input type="number" name="maxResults" value={maxResults} onChange={this.handleInputChange} />
                    <Button type="submit">BUSCAR</Button>
                </form>
                {downloadProgress.length !== 0 && downloadProgress.map(dp =>
                    <Downloading>
                        <div className="titleDown">
                            <span>{dp.audioName}</span>
                            <span>
                                {dp.percent !== 100 &&
                                    (<div>{dp.atualSize}MB - {dp.maxSize}MB</div>)
                                }
                            </span>
                        </div>
                        <Progress percent={dp.percent} indicating progress success={dp.percent === 100}>
                            {dp.message}
                        </Progress>
                    </Downloading>
                )}
                <AllResults>
                    {results && results.map(result => (
                        <Result key={result.id}>
                            <div className="videoFull">
                                <img src={result.thumbnails.default.url} alt="Thumb" />
                                <div className="videoName">{result.title}</div>
                            </div>
                            <div>
                                <Button onClick={() => this.addSongClick(result.link)}>Adicionar á playlist</Button>
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