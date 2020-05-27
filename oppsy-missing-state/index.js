const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const Oppsy = require('@hapi/oppsy');

const server = new Hapi.Server();

server.ext('onRequest', () => {
  throw Boom.notFound();
})

const oppsy = new Oppsy(server);

server.start().then(() => {
  oppsy.start(1000);
  console.log('listening at', server.info.uri)
}).catch(error => {
  console.error('FATAL')
  console.error(error)
  process.exit(1)
});
