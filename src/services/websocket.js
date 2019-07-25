import Ws from '@adonisjs/websocket-client';

const setupWebsocket = () => {
    const token = localStorage.getItem('@Omni:token');
    const ws = Ws('ws://localhost:3333').withJwtToken(token).connect();
    return ws;
};

export default setupWebsocket;
