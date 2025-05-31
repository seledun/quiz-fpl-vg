import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';

export function MNav({ setPlayMode }) {
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Quizapp</Navbar.Brand>
                <Nav className="me-auto">
                    <Button variant="dark" onClick={() => setPlayMode(true)}>Quiz me!</Button>
                    <Button variant="dark" onClick={() => setPlayMode(false)}>History</Button>
                </Nav>
            </Container>
        </Navbar>
        </>
    );
}