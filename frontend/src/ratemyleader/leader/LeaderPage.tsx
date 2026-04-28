import { useState, useEffect } from "react";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import { LeaderForm } from "./LeaderForm.tsx";
import { LeaderItem } from "./LeaderItem.tsx";
import type { Leader } from "./LeaderType.ts";
import axios from "axios";

export const LeaderPage = () => {
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [search, setSearch] = useState("");

    const fetchLeaders = () => {
        axios.get('/api/entity/leader')
            .then(r => setLeaders(r.data))
            .catch(err => console.error('Failed to fetch leaders:', err));
    };

    useEffect(() => {
        fetchLeaders();
    }, []);

    const filteredLeaders = leaders.filter(leader =>
        `${leader.fname} ${leader.lname}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1 className="mb-4">Rate My Leader</h1>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <LeaderForm onLeaderSaved={fetchLeaders} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2>Leader List</h2>
                    <Form.Control
                        type="text"
                        placeholder="Search leaders..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-3"
                        aria-label="search leaders"
                    />
                    <ListGroup id="list">
                        {filteredLeaders.length === 0
                            ? <ListGroup.Item>No leaders</ListGroup.Item>
                            : filteredLeaders.map(leader => (
                                <LeaderItem key={leader.id} initialLeader={leader} />
                            ))
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};