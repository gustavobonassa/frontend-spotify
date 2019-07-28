import Ws from '@adonisjs/websocket-client';

const setupWebsocket = () => {
    const token = localStorage.getItem('@Omni:token');
    const ws = Ws('wss://adonis-be.herokuapp.com/').withJwtToken(token).connect();
    return ws;
};

export default setupWebsocket;
