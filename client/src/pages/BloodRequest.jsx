import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BloodReq.css'
const BloodRequest = () => {
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({
        bloodGroup: '',
        quantity: '',
        urgency: '',
        country: '',
        division: '',
        district: '',
        city: '',
        contactInfo: ''
    });
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/blood-requests/all')
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the blood requests!", error);
            });
    }, []);

    const handleChange = (e) => {
        setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/blood-requests/create', newRequest)
            .then(response => {
                setRequests([response.data, ...requests]);
                setNewRequest({
                    bloodGroup: '',
                    quantity: '',
                    urgency: '',
                    country: '',
                    division: '',
                    district: '',
                    city: '',
                    contactInfo: ''
                });
            })
            .catch(error => {
                console.error("There was an error creating the blood request!", error);
            });
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e, requestId) => {
        e.preventDefault();
        axios.post('http://localhost:3001/blood-requests/comment', { requestId, comment: newComment })
            .then(response => {
                const updatedRequests = requests.map(request => {
                    if (request._id === requestId) {
                        return { ...request, comments: [...request.comments, response.data] };
                    }
                    return request;
                });
                setRequests(updatedRequests);
                setNewComment('');
            })
            .catch(error => {
                console.error("There was an error adding the comment!", error);
            });
    };

    return (
        <div>
            <h2>Blood Requests</h2>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createBloodRequestModal">Create Blood Request</button>
            <div className="modal fade" id="createBloodRequestModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Blood Request</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="bloodGroup" value={newRequest.bloodGroup} onChange={handleChange} placeholder="Blood Group" required />
                                <input type="number" name="quantity" value={newRequest.quantity} onChange={handleChange} placeholder="Quantity" />
                                <input type="text" name="urgency" value={newRequest.urgency} onChange={handleChange} placeholder="Urgency" required />
                                <input type="text" name="country" value={newRequest.country} onChange={handleChange} placeholder="Country" />
                                <input type="text" name="division" value={newRequest.division} onChange={handleChange} placeholder="Division" />
                                <input type="text" name="district" value={newRequest.district} onChange={handleChange} placeholder="District" />
                                <input type="text" name="city" value={newRequest.city} onChange={handleChange} placeholder="City" />
                                <input type="text" name="contactInfo" value={newRequest.contactInfo} onChange={handleChange} placeholder="Contact Info" required />
                                <button type="submit" className="btn btn-primary">Post Request</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <h3>All Blood Requests</h3>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        <p>{request.bloodGroup} - {request.quantity} units</p>
                        <p>Urgency: {request.urgency}</p>
                        <p>Location: {request.city}, {request.district}, {request.division}</p>
                        <p>Contact: {request.contactInfo}</p>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#commentModal">Add Comment</button>
                        <div className="modal fade" id={`commentModal${request._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add Comment</h5>
                                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(e) => handleCommentSubmit(e, request._id)}>
                                            <input type="text" name="comment" value={newComment} onChange={handleCommentChange} placeholder="Your comment" required />
                                            <button type="submit" className="btn btn-primary">Post Comment</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul>
                            {request.comments.map(comment => (
                                <li key={comment._id}>
                                    <p>{comment.comment}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BloodRequest;

