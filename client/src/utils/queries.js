import { gql } from '@apollo/client';

// Query to get the currently authenticated user
export const GET_ME = gql`
query Me {
  me {
    bookCount
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;
