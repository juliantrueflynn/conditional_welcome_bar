import {gql} from '@apollo/client';

export * from './types/Bars';
export * from './types/CreateBar';

export const CREATE_BAR = gql`
  mutation CreateBar {
    createBar(input: {}) {
      bar {
        id
      }
    }
  }
`;

export const GET_ALL_BARS = gql`
  query Bars {
    bars {
      id
      title
      content
      createdAt
    }
  }
`;
