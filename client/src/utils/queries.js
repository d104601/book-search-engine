import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetSingleUser {
    me {
      _id
      username
      email
      bookCount
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