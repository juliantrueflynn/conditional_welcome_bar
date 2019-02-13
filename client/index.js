import 'isomorphic-fetch';
import server from './server';

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
