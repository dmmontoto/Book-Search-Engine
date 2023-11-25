import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries'; 
import { REMOVE_BOOK } from '../utils/mutations'; 
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // Use the useQuery hook to execute the GET_ME query
  const { loading, error, data } = useQuery(GET_ME);
  const savedBooks = data?.me.savedBooks || [];
  // Use the useMutation hook to execute the REMOVE_BOOK mutation
  const [RemoveBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [
      GET_ME,
      'Me'
    ]
  });

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    console.error(error);
    return <h2>Error loading data</h2>;
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {

    try {
      // Use the removeBook mutation here
      const { data } = await RemoveBook({
        variables: { bookId: bookId },
      });

      // upon success, remove book's id from localStorage
      removeBookId(bookId);

      // Note: You may need to modify this based on your data structure
      // Update the user data in state
      // setUserData(updatedUser);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {savedBooks.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
