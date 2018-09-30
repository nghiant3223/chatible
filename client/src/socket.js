import socketIOClient from 'socket.io-client';
import { socketPath } from './configs';

const socketGetter = (function () {
        let instance;

        function createInstance() {
            // TODO: add +  PORT if you want to run it locally
            const socket = new socketIOClient(socketPath);
            return socket;
        }

        return {
            getInstance: function () {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };
})();

export default socketGetter;