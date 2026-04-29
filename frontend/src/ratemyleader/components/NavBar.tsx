import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router";

export const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Rate My Leader
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" role="navigation">
                    <Nav className="me-auto">
                        {/* Link to the Leaders page */}
                        <Nav.Link as={Link} to="/">Leaders</Nav.Link>

                        {/* Link to the Reviews page */}
                        <Nav.Link as={Link} to="/review">Post Reviews</Nav.Link>

                        {/* Link to the Reviews page */}
                        <Nav.Link as={Link} to="/viewReview">View Reviews</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default NavBar;