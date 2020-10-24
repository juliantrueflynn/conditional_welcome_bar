import {setupServer} from 'msw/node';
import {apolloClient} from '../../components/apollo_provider';
import {graphqlHandlers} from './graphql_handlers';

export * from 'msw';

export const setupGraphqlServer = () => {
  const server = setupServer(...graphqlHandlers);

  beforeAll(() => server.listen());

  afterEach(() => {
    apolloClient.resetStore();
    server.resetHandlers();
  });

  afterAll(() => server.close());

  return server;
};
