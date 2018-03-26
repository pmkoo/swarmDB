const emulator = require('./emulator/Emulator');
const communication = require('../communication');
const assert = require('assert');


beforeEach(() => {

    emulator.reset();

});


it('should be able to reset', () => {});


describe('bluzelle connection', () => {

    beforeEach(() =>
        communication.connect('ws://localhost:8100'));

    afterEach(() =>
        communication.disconnect());


    it('should be able to connect to 8100', () => {});


    it('should be able to ping the connection', async () => {

        return communication.ping();

    });

    it('should be able to read and update base64 strings', async () => {

        await communication.update('mykey', 'abcdef');

        assert(await communication.read('mykey') === 'abcdef')

    });

    it('should be able to query if the database has a key', async () => {

        await communication.update('myKey', 'abc');
        assert(await communication.has('myKey'));
        assert(!await communication.has('someOtherKey'));

    });

    it('should be able to delete a key', async () => {

        await communication.update('myKey', 'abc');
        await communication.delete('myKey');
        assert(!await communication.has('myKey'));

    });

    it('should throw an error when trying to read a non-existent key', done => {

        communication.read('abc123').then(v => v instanceof Error && done());

    });

    it('should throw an error when trying to delete a non-existent key', done => {

        communication.delete('something').then(v => v instanceof Error && done());

    });

});