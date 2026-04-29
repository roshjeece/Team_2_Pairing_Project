import React, {useEffect, useState} from 'react';
import axios from "axios";
import type {Leader} from "../leader/LeaderType.ts";
import {Card} from "react-bootstrap";
import type {Review} from "./ReviewType.ts";

const ViewReviewPage = () => {
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null)
    const [reviews, setReviews] = useState<Review[]>([]);


    useEffect(() => {
        axios.get('/api/entity/leader')
            .then(r => setLeaders(r.data))
            .catch(err => console.error('Failed to fetch leaders:', err));
    }, []);

    useEffect(() => {
        if (!selectedLeader) return;
        axios.get(`/api/entity/review/leader/${selectedLeader.id}`)
            .then(d => setReviews(d.data))
            .catch(err => console.error('Failed to fetch leaders:', err));

    }, [selectedLeader]);

    return (
        <div>
            <label htmlFor="leader">Select Leader:</label>
            <select
                id="leader"
                onChange={(e) => {
                    const found = leaders.find(l => l.id === Number(e.target.value));
                    setSelectedLeader(found || null);
                }}
            >
                {/*SELECT A LEADER & MAPS THROUGH THEIR FIRST AND LAST NAME*/}
                <option value="">-- Select a Leader --</option>
                {leaders.map(leader => (
                    <option key={leader.id} value={leader.id}>
                        {leader.fname} {leader.lname}
                    </option>
                ))}
            </select>
            {reviews.map(review => (
            <Card
                key={review.id}
                className="h-100 shadow-sm"
                style={{
                    backgroundColor: '#212529',
                    color: '#fff',
                    border: 'none',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
                }}
            >


                <Card.Body className="d-flex flex-column">
                    <Card.Text className="mb-2">
                        <strong> Description: </strong> {review.description}<br/>
                        <strong> Rating: </strong> {review.rating}<br/>
                    </Card.Text>

                </Card.Body>
            </Card>
                ))}

        </div>
    );
};

export default ViewReviewPage;