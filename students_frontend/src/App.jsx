import React from 'react';
import Header from './components/Organisms/Header';
import Footer from './components/Organisms/Footer';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container fluid="md" className="flex-grow-1 py-5">
        <h1 className="mb-3">Student Learning System</h1>
        <p>This is the main content.</p>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
