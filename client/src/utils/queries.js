import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql`
  query GetSingleUser {
    getSingleUser {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;