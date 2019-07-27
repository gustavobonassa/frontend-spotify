import styled, { css } from 'styled-components';

import { Spinner } from '../../components/Loading/styles';

export const Container = styled.div`
    margin-top: 30px;
    overflow-y: auto;

    ${Spinner} {
        height: 48px;
    }

    ${props => props.loading && css`
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `}

    .react-contextmenu {
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: .25rem;
        color: #373a3c;
        font-size: 16px;
        margin: 2px 0 0;
        min-width: 160px;
        outline: none;
        opacity: 0;
        padding: 5px 0;
        pointer-events: none;
        text-align: left;
        transition: opacity 250ms ease !important;
    }

    .react-contextmenu.react-contextmenu--visible {
        opacity: 1;
        pointer-events: auto;
        z-index: 9999;
    }

    .react-contextmenu-item {
        background: 0 0;
        border: 0;
        color: #373a3c;
        cursor: pointer;
        font-weight: 400;
        line-height: 1.5;
        padding: 3px 20px;
        text-align: inherit;
        white-space: nowrap;
    }

    .react-contextmenu-item.react-contextmenu-item--active,
    .react-contextmenu-item.react-contextmenu-item--selected {
        color: #fff;
        background-color: #20a0ff;
        border-color: #20a0ff;
        text-decoration: none;
    }

    .react-contextmenu-item.react-contextmenu-item--disabled,
    .react-contextmenu-item.react-contextmenu-item--disabled:hover {
        background-color: transparent;
        border-color: rgba(0,0,0,.15);
        color: #878a8c;
    }

    .react-contextmenu-item--divider {
        border-bottom: 1px solid rgba(0,0,0,.15);
        cursor: inherit;
        margin-bottom: 3px;
        padding: 2px 0;
    }
    .react-contextmenu-item--divider:hover {
        background-color: transparent;
        border-color: rgba(0,0,0,.15);
    }

    .react-contextmenu-item.react-contextmenu-submenu {
        padding: 0;
    }

    .react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item {
    }

    .react-contextmenu-item.react-contextmenu-submenu > .react-contextmenu-item:after {
        content: "▶";
        display: inline-block;
        position: absolute;
        right: 7px;
    }

    .example-multiple-targets::after {
        content: attr(data-count);
        display: block;
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;

    img {
        width: 220px;
        height: 220px;
    }

    div {
        margin-left: 20px;

        span {
            font-size: 11px;
            letter-spacing: 1.11px;
            font-weight: 300;
        }

        h1 {
            margin-top: 10px;
            font-size: 48px;
        }
        p {
            margin-top: 0;
            color: #b3b3b3;
            font-size: 11px;
            letter-spacing: 1.11px;
            text-transform: uppercase;
        }
    }
`;
export const ButtonPlay = styled.button`
    background: ${props => props.color || "#1db854"};
    height: 32px;
    border-radius: 16px;
    color: #FFF;
    line-height: 32px;
    padding: 0 35px;
    border: 0;
    margin-top: 10px;
    font-size: 12px;
    margin-right: 5px;
    letter-spacing: 1.11px;
`;

export const SongList = styled.table`
    width: 100%;
    text-align: left;
    margin-top: 20px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    thead th {
        font-size: 11px;
        color: #b3b3b3;
        letter-spacing: 1.11px;
        font-weight: normal;
        text-transform: uppercase;
        padding: 5px 10px;

        &:last-child {
            text-align: right;
        }
    }
`;

export const SongItem = styled.tr`
    td {
        border-top: 1px solid #282828;
        font-size: 13px;
        padding: 0 10px;
        line-height: 40px;
        background: ${props => props.selected ? '#282828' : 'trasparent'};
        color: ${props => props.playing ? '#1ED760' : '#FFF'};
        cursor: context-menu;

        &:first-child{
            width: 80px;
            text-align: right;
        }

        &:last-child{
            text-align: right;
        }
    }

    &:hover td {
        background: #282828;
    }
`;
