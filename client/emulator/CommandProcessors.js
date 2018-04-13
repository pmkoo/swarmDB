const {maxNodes} = require('./Values');
const {read, update, delete:delet, has, setup} = require('./DataStore');
const {getAllNodesInfo} = require('./NodeStore.js');
const assert = require('assert');


const CommandProcessors = {
    setMaxNodes: num => maxNodes.set(num),
    requestAllNodes: ({data}, connection) =>
        connection.send(JSON.stringify({cmd: 'updateNodes', data: getAllNodesInfo()})),
    
    ping: ({request_id}, ws) => {

        ws.send(JSON.stringify({
            response_to: request_id
        }))

    },
    setup,
    read,
    update,
    'delete': delet,
    has

};


module.exports = CommandProcessors;
