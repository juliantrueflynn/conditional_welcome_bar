import {graphql} from 'msw';
import {Bar, UpdateBar, UpdateBar_updateBar_userErrors} from '../../components/single_bar_view/graphql';
import {UpdateBarInput} from '../../types/graphqlGlobals';
import {mockBarFields} from '../single_bar_mocks';

export const graphqlHandlers = [
  // Queries
  graphql.query('Bar', (_req, res, ctx) => res(ctx.data({bar: mockBarFields} as Bar))),
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
    const {id, clientMutationId, ...newVariables}: UpdateBarInput = req.variables.input;

    return res(
      ctx.data({
        updateBar: {
          bar: {...mockBarFields, ...newVariables},
          userErrors: [] as UpdateBar_updateBar_userErrors[],
          __typename: 'UpdateBarPayload',
        },
      } as UpdateBar)
    );
  }),
];
