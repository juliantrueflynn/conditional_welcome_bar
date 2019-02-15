import 'isomorphic-fetch';
import server from './server';

const { PORT } = process.env;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
