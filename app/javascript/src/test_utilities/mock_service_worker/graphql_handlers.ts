import {graphql} from 'msw';
import {mockBarFields} from '../single_bar_mocks';

const {__typename, ...mockBar} = mockBarFields;

export const graphqlHandlers = [
  // Queries
  graphql.query('Bar', (_req, res, ctx) => res(ctx.data({bar: mockBar}))),
  graphql.query('Bars', (_req, res, ctx) => res(ctx.data({bars: []}))),

  // Mutations
  graphql.mutation('CreateBar', (req, res, ctx) =>
    res(
      ctx.data({
        createBar: {
          bar: {id: req.variables.id},
        },
        __typename: 'CreateBarPayload',
      })
    )
  ),
  graphql.mutation('DestroyBar', (req, res, ctx) =>
    res(
      ctx.data({
        destroyBar: {
          bar: {id: req.variables.id},
        },
        __typename: 'DestroyBarPayload',
      })
    )
  ),
  graphql.mutation('UpdateBar', (req, res, ctx) => {
    const {id, ...newVariables} = req.variables.input;

    return res(
      ctx.data({
        updateBar: {
          bar: {...mockBar, ...newVariables, __typename: 'UpdateBar'},
          userErrors: [],
          __typename: 'UpdateBarPayload',
        },
      })
    );
  }),
];
