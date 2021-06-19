import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PlaylistActions } from "../../store/ducks/playlists";

import Button from "../../styles/components/Button";

import { Container, NewPlaylist } from "./styles";

class newPlaylist extends Component {
  state = {
    thumbnail: null,
    title: "",
    description: "",
    imgSrc: null,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("thumbnail", this.state.thumbnail);
    data.append("title", this.state.title);
    data.append("description", this.state.description);

    const { newPlaylistRequest } = this.props;

    newPlaylistRequest(data);
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleImageChange = (e) => {
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        imgSrc: [reader.result],
      });
    }.bind(this);
    this.setState({ thumbnail: e.target.files[0] });
  };
  render() {
    return (
      <Container>
        <h1>Criar nova playlist</h1>
        <NewPlaylist>
          <form onSubmit={this.handleSubmit}>
            {this.state.imgSrc && (
              <label htmlFor="thumbnail">
                <img src={this.state.imgSrc} alt="Thumb" width="120%" />
              </label>
            )}
            <span>Thumbnail:</span>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              ref="file"
              onChange={this.handleImageChange}
            />
            <input
              placeholder="Nome da playlist"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              placeholder="Descrição da playlist"
            ></textarea>
            <Button type="submit">Criar</Button>
          </form>
        </NewPlaylist>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  playlist: state.playlists,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PlaylistActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(newPlaylist);
