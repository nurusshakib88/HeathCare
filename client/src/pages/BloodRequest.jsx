import { useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "../context/LoginContext"; // Import useLogin to access user context

const BloodRequest = () => {
  const { user } = useLogin();
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    bloodGroup: "",
    quantity: "",
    urgency: "",
    country: "",
    division: "",
    district: "",
    city: "",
    contactInfo: "",
    caption: "",
  });
  const [newComment, setNewComment] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/blood-requests/all")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the blood requests!", error);
      });
  }, []);

  const handleChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/blood-requests/create", {
        ...newRequest,
        userId: user._id // Include the user ID when creating a blood request
      })
      .then((response) => {
        setRequests([response.data, ...requests]);
        setNewRequest({
          bloodGroup: "",
          quantity: "",
          urgency: "",
          country: "",
          division: "",
          district: "",
          city: "",
          contactInfo: "",
          caption: "",
        });
        document.getElementById("createRequestModal").close();
      })
      .catch((error) => {
        console.error("There was an error creating the blood request!", error);
      });
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/blood-requests/comment", {
        requestId: selectedRequestId,
        userId: user._id, // Include the user ID when adding a comment
        comment: newComment,
      })
      .then((response) => {
        const updatedRequests = requests.map((request) => {
          if (request._id === selectedRequestId) {
            return {
              ...request,
              comments: [...request.comments, response.data],
            };
          }
          return request;
        });
        setRequests(updatedRequests);
        setNewComment("");
        document.getElementById(`commentModal-${selectedRequestId}`).close();
      })
      .catch((error) => {
        console.error("There was an error adding the comment!", error);
      });
  };

  return (
    <div>
      <h2>Blood Requests</h2>
      <button
        type="button"
        onClick={() =>
          document.getElementById("createRequestModal").showModal()
        }
        className="btn btn-primary"
      >
        Create Blood Request
      </button>

      <dialog
        id="createRequestModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-primary p-10 rounded-xl my-10">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <h2 className="text-white text-2xl mb-5">Create Blood Request</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="bloodGroup"
                value={newRequest.bloodGroup}
                onChange={handleChange}
                placeholder="Blood Group"
                required
                className="form-control input mb-3"
              />
              <input
                type="number"
                name="quantity"
                value={newRequest.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="form-control input mb-3"
              />
              <input
                type="text"
                name="urgency"
                value={newRequest.urgency}
                onChange={handleChange}
                placeholder="Urgency"
                required
                className="form-control input mb-3"
              />
              <input
                type="text"
                name="country"
                value={newRequest.country}
                onChange={handleChange}
                placeholder="Country"
                className="form-control input mb-3"
              />
              <input
                type="text"
                name="division"
                value={newRequest.division}
                onChange={handleChange}
                placeholder="Division"
                className="form-control input mb-3"
              />
              <input
                type="text"
                name="district"
                value={newRequest.district}
                onChange={handleChange}
                placeholder="District"
                className="form-control input mb-3"
              />
              <input
                type="text"
                name="city"
                value={newRequest.city}
                onChange={handleChange}
                placeholder="City"
                className="form-control input mb-3"
              />
              <input
                type="text"
                name="contactInfo"
                value={newRequest.contactInfo}
                onChange={handleChange}
                placeholder="Contact Info"
                required
                className="form-control input mb-3"
              />
              <textarea
                name="caption"
                value={newRequest.caption}
                onChange={handleChange}
                placeholder="Caption"
                required
                className="form-control input mb-3"
              />
              <button type="submit" className="btn btn-success">
                Post Request
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <h3>All Blood Requests</h3>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <p>
              {request.userId ? request.userId.name : "Unknown User"}: {request.bloodGroup} - {request.quantity} units
            </p>
            <p>Urgency: {request.urgency}</p>
            <p>
              Location: {request.city}, {request.district}, {request.division}
            </p>
            <p>Contact: {request.contactInfo}</p>
            <p>Caption: {request.caption}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSelectedRequestId(request._id);
                document
                  .getElementById(`commentModal-${request._id}`)
                  .showModal();
              }}
            >
              Add Comment
            </button>

            <dialog
              id={`commentModal-${request._id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div>
                  <h3>Add Comment</h3>
                  <form onSubmit={handleCommentSubmit}>
                    <input
                      type="text"
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Your comment"
                      required
                      className="form-control input mb-3"
                    />
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </dialog>

            <h4>Comments</h4>
            <ul>
              {request.comments.map((comment) => (
                <li key={comment._id}>
                  <p>
                    {comment.userId ? comment.userId.name : "Unknown User"}: {comment.comment}
                  </p>
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
