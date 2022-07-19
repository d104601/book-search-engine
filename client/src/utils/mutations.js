import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
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
        s
    }
`;

export const REMOVE_BOOK = gql``;