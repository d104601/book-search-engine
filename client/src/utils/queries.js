import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetSingleUser {
    getSingleUser {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;