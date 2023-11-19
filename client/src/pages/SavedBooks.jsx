import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../path-to-your-queries-file/queries'; // Update the path accordingly
import { REMOVE_BOOK } from '../path-to-your-mutations-file/mutations'; // Update the path accordingly
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

  // Use the useMutation hook to execute the REMOVE_BOOK mutation
  const [removeBook] = useMutation(REMOVE_BOOK);

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    console.error(error);
    return <h2>Error loading data</h2>;
  }

  const userData = data.me;

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = userData ? userData.token : null;

    if (!token) {
      return false;
    }

    try {
      // Use the removeBook mutation here
      const { data: { removeBook: updatedUser } } = await removeBook({
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
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
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
