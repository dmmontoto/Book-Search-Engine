import { gql } from '@apollo/client';

// Mutation to log in a user
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// Mutation to add a new user
export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

// Mutation to save a book to user's savedBooks
export const SAVE_BOOK = gql`
mutation SaveBook($bookInput: BookInput!) {
  saveBook(bookInput: $bookInput) {
    username
    savedBooks {
      title
    }
  }
}
`;

// Mutation to remove a book from user's savedBooks
export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    username
    savedBooks {
      title
    }
  }
}
`;