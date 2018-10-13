import socketIOClient from 'socket.io-client';
import { socketPath } from './configs';

const socketGetter = (function () {
    let instance;

    return {
            getInstance: function () {
                if (!instance) {
                    instance = new socketIOClient(socketPath);
                }
                return instance;
            },
            deleteInstance: function () {
                if (instance) {
                    instance = null;
                }
            }
        };
})();

export default socketGetter;