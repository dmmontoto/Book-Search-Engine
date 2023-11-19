import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

// Replace the URL with your Apollo Server URL
const uri = 'YOUR_APOLLO_SERVER_URL';

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Outlet />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;