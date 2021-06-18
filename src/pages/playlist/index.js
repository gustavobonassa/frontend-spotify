import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import Dropdown from '../../components/Dropdown';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlaylistDetailsActions } from '../../store/ducks/playlistDetails';
import { Creators as PlayerActions } from '../../store/ducks/player';
import { Creators as SongActions } from '../../store/ducks/song';

import Loading from '../../components/Loading';
import Button from '../../styles/components/Button';
import Modal from '../../components/Modal';
import axios from 'axios';

import { Container, Header, SongList, SongItem, ButtonPlay } from './styles';

import ClockIcon from '../../assets/images/clock.svg';
import PlusIcon from '../../assets/images/plus.svg';

class Playlist extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string,
            }),
        }).isRequired,
        getPlaylistDetailsRequest: PropTypes.func.isRequired,
        playlistDetails: PropTypes.shape({
            data: PropTypes.shape({
                title: PropTypes.string,
                thumbnail: PropTypes.string,
                description: PropTypes.string,
                song: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    title: PropTypes.string,
                    author: PropTypes.string,
                    album: PropTypes.string
                }))
            }),
            loading: PropTypes.bool,
        }).isRequired,
        loadSong: PropTypes.func.isRequired,
        currentSong: PropTypes.shape({
            id: PropTypes.number
        })
    };

    state = {
        selectedSong: null,
        clickedSong: null,
        userId: -1
    }

    componentDidMount() {
        this.setState({ userId: JSON.parse(localStorage.getItem('@Spoti:user')).id });
        this.loadPlaylistDetails();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadPlaylistDetails();
        }
    }

    loadPlaylistDetails = () => {
        const { id } = this.props.match.params;

        this.props.getPlaylistDetailsRequest(id);
    }
    handleClick = async (e, data) => {
        //console.log(e, data);
        const playlist = this.props.playlistDetails.data;
        var index = playlist.songs.findIndex((f) => f.id === parseInt(data.target.className));
        if (index !== -1) {
            this.setState({
                clickedSong: playlist.songs[index]
            });
            if (data.foo === 'play') {
                this.props.loadSong(playlist.songs[index], playlist.songs)
            }
            if (data.foo === 'baixar') {
                await axios({
                    url: playlist.songs[index].url,
                    method: 'GET',
                    responseType: 'blob'
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${playlist.songs[index].name}.mp3`);
                    document.body.appendChild(link);
                    link.click();
                });

            }
            if (data.foo === 'excluir') {
                const { openDelSongModal } = this.props;
                openDelSongModal();
            }
        }
    }
    modalDelPlaylist = () => {
        const { openDelModal } = this.props;
        openDelModal();
    }
    handleSubmitDel = (e) => {
        e.preventDefault();
        const { deleteSong, closeDelSongModal } = this.props;
        const { id } = this.props.match.params;

        closeDelSongModal();
        deleteSong(this.state.clickedSong.id, id);
    }
    handleSubmitPlaylistDel = (e) => {
        e.preventDefault();
        const { deletePlaylist, closeDelModal } = this.props;
        const { id } = this.props.match.params;

        closeDelModal();
        deletePlaylist(id);
    }
    handlePlayButton = () => {
        const { selectedSong } = this.state;
        const playlist = this.props.playlistDetails.data;

        var index = playlist.songs.findIndex((e) => e.id === selectedSong);
        if (index !== -1) {
            var somSelected = playlist.songs[index];
        }
        this.props.loadSong(somSelected || playlist.songs[0], playlist.songs);
    }

    renderDetails = () => {
        const playlist = this.props.playlistDetails.data;
        const { delSongModalOpen } = this.props.song;
        const { delModalOpen } = this.props.playlistDetails;
        const { closeDelSongModal, closeDelModal } = this.props;
        const { clickedSong, userId } = this.state;
        return (
            <Container>
                <Header>
                    <img src={playlist.thumbnail} alt={playlist.title} />

                    <div>
                        <span>PLAYLIST</span>
                        <h1>{playlist.title}</h1>
                        {!!playlist.songs && <p>{playlist.songs.length} músicas</p>}

                        <ButtonPlay onClick={this.handlePlayButton}>PLAY</ButtonPlay>
                        {(userId === playlist.user_id) && (
                            <>
                                <Link to={`/search/${playlist.id}`}>
                                    <ButtonPlay color="#b77d41">ADICIONAR MÚSICA</ButtonPlay>
                                </Link>
                                <ButtonPlay color="#8c8ccc" onClick={this.delPlaylist}><Dropdown func={this.modalDelPlaylist} /></ButtonPlay>
                            </>
                        )}
                    </div>
                </Header>
                <ContextMenuTrigger id="some_unique_identifier">
                    <SongList cellPadding={0} cellSpacing={0}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Título</th>
                                <th>Artista</th>
                                <th>Álbums</th>
                                <th><img src={ClockIcon} alt="Duração" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!playlist.songs ? (
                                <tr>
                                    <td colSpan={5}>Nenhuma música cadastrada</td>
                                </tr>
                            ) : (
                                    playlist.songs.map(song => (
                                        <SongItem
                                            key={song.id}
                                            onClick={() => this.setState({ selectedSong: song.id })}
                                            onDoubleClick={() => this.props.loadSong(song, playlist.songs)}
                                            selected={this.state.selectedSong === song.id}
                                            playing={this.props.currentSong && this.props.currentSong.id === song.id}
                                        >
                                            <td className={song.id}><img src={PlusIcon} alt="Adicionar" /></td>
                                            <td className={song.id}>{song.name}</td>
                                            <td className={song.id}>{song.author}</td>
                                            <td className={song.id}>{song.album}</td>
                                            <td className={song.id}>{song.duration}</td>
                                        </SongItem>
                                    ))
                                )
                            }

                        </tbody>
                    </SongList>
                </ContextMenuTrigger>
                <div>
                    <ContextMenu id="some_unique_identifier">
                        <MenuItem data={{ foo: 'play' }} onClick={this.handleClick}>
                            Play
                        </MenuItem>
                        <MenuItem data={{ foo: 'baixar' }} onClick={this.handleClick}>
                            Download
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem data={{ foo: 'excluir' }} onClick={this.handleClick}>
                            Excluir
                        </MenuItem>
                    </ContextMenu>

                </div>
                {delSongModalOpen && (
                    <Modal>
                        <form onSubmit={this.handleSubmitDel}>
                            <div>Tem certeza que deseja excluir a música <strong>{clickedSong.name}</strong>?</div>
                            <Button type="submit" color="danger">EXCLUIR</Button>
                            <Button size="small" color="gray" onClick={closeDelSongModal}>Cancelar</Button>
                        </form>
                    </Modal>
                )}
                {delModalOpen && (
                    <Modal>
                        <form onSubmit={this.handleSubmitPlaylistDel}>
                            <div>Tem certeza que deseja excluir essa playlist?</div>
                            <Button type="submit" color="danger">EXCLUIR</Button>
                            <Button size="small" color="gray" onClick={closeDelModal}>Cancelar</Button>
                        </form>
                    </Modal>
                )}
            </Container>
        );
    }

    render() {
        return this.props.playlistDetails.loading ? <Container loading="true"><Loading /></Container> : this.renderDetails();
    }
}

const mapStateToProps = state => ({
    playlistDetails: state.playlistDetails,
    currentSong: state.player.currentSong,
    song: state.song
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...PlaylistDetailsActions, ...PlayerActions, ...SongActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
