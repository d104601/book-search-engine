import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                username
            }
        }
    } 
`;

export const ADD_USER = gql`
    mutation addUser(
        $username: String!
        $email: String!
        $password: String
    ) {
        addUser(
            username: $username
            email: $email
            password: $password
        ) {
            token
            user {
                    username
                }
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook(
        $bookId: String
        $title: String
        $authors: [String]
        $description: String
        $image: String
        $link: String
    ) {
        saveBook(
           bookId: $bookId
           title: $title
           authors: $authors
           description: $description
           image: $image
           link: $link
        ) {
            username
            savedBooks {
                bookId
                title
                authors
                description
                image
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            username
            savedBooks {
                authors
                description
                bookId
                image
                title
            }
        }
    }
`;