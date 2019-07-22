import { createGlobalStyle } from 'styled-components';

import 'rc-slider/assets/index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    html, body, #root {
        height: 100%;
        overflow-y: hidden;
    }

    body {
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
        background: #181818;
        font-family: 'Montserrat', sans-serif;
        color: #FFF;
    }

    button {
        cursor: pointer;
    }
    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }
    ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }
    ::-webkit-scrollbar-thumb {
        background: #5f5f5f;
        border: 0px none #ffffff;
        border-radius: 50px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #373737;
    }
    ::-webkit-scrollbar-thumb:active {
        background: #282828;
    }
    ::-webkit-scrollbar-track {
        background: #8f8f8b;
        border: 0px none #ffffff;
        border-radius: 50px;
    }
    ::-webkit-scrollbar-track:hover {
        background: #666666;
    }
    ::-webkit-scrollbar-track:active {
        background: #333333;
    }
    ::-webkit-scrollbar-corner {
        background: transparent;
    }
`;

export default GlobalStyle;
