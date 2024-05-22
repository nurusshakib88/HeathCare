import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        contactInfo: '',
        caption:''
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
                    contactInfo: '',
                    caption:''
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
            <button type="button"  onClick={()=>document.getElementById('my_modal_5').showModal()} className="btn btn-primary" data-toggle="modal" data-target="#createBloodRequestModal">Create Blood Request</button>
            {/* <div className="bg-primary p-10 rounded-xl my-10">
                <h2 className="text-white text-2xl mb-5">Create Blood Request</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="bloodGroup" value={newRequest.bloodGroup} onChange={handleChange} placeholder="Blood Group" required className="form-control input mb-3" />
                    <input type="number" name="quantity" value={newRequest.quantity} onChange={handleChange} placeholder="Quantity" className="form-control input mb-3" />
                    <input type="text" name="urgency" value={newRequest.urgency} onChange={handleChange} placeholder="Urgency" required className="form-control input mb-3" />
                    <input type="text" name="country" value={newRequest.country} onChange={handleChange} placeholder="Country" className="form-control input mb-3" />
                    <input type="text" name="division" value={newRequest.division} onChange={handleChange} placeholder="Division" className="form-control input mb-3" />
                    <input type="text" name="district" value={newRequest.district} onChange={handleChange} placeholder="District" className="form-control input mb-3" />
                    <input type="text" name="city" value={newRequest.city} onChange={handleChange} placeholder="City" className="form-control input mb-3" />
                    <input type="text" name="contactInfo" value={newRequest.contactInfo} onChange={handleChange} placeholder="Contact Info" required className="form-control input mb-3" />
                    <button type="submit" className="btn btn-success">Post Request</button>
                </form>
            </div> */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box bg-primary p-10 rounded-xl my-10">
  <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
    {/* <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p> */}
    <div className="modal-action">
    <div className="">
                <h2 className="text-white text-2xl mb-5">Create Blood Request</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="bloodGroup" value={newRequest.bloodGroup} onChange={handleChange} placeholder="Blood Group" required className="form-control input mb-3" />
                    <input type="number" name="quantity" value={newRequest.quantity} onChange={handleChange} placeholder="Quantity" className="form-control input mb-3" />
                    <input type="text" name="urgency" value={newRequest.urgency} onChange={handleChange} placeholder="Urgency" required className="form-control input mb-3" />
                    <input type="text" name="country" value={newRequest.country} onChange={handleChange} placeholder="Country" className="form-control input mb-3" />
                    <input type="text" name="division" value={newRequest.division} onChange={handleChange} placeholder="Division" className="form-control input mb-3" />
                    <input type="text" name="district" value={newRequest.district} onChange={handleChange} placeholder="District" className="form-control input mb-3" />
                    <input type="text" name="city" value={newRequest.city} onChange={handleChange} placeholder="City" className="form-control input mb-3" />
                    <input type="text" name="contactInfo" value={newRequest.contactInfo} onChange={handleChange} placeholder="Contact Info" required className="form-control input mb-3" />
                    <textarea type="text" name="caption" value={newRequest.caption} onChange={handleChange} placeholder="Contact Info" required className="form-control input mb-3" />
                    
                    <button type="submit" className="btn btn-success">Post Request</button>
                </form>
            </div>
    </div>
  </div>
</dialog>
            <div className="modal fade text-black bg-slate-600" id="createBloodRequestModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <textarea type="text" name="caption" value={newRequest.caption} onChange={handleChange} placeholder="Contact Info" required className="form-control input mb-3" />
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
                        <p>Contact: {request.caption}</p>
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

