import { useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "../context/LoginContext"; // Import useLogin to access user context
import { Inventory, LocationOn, WaterDrop } from "@mui/icons-material";

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
      .get(`/api/blood-requests/all`)
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
      .post(`/api/blood-requests/create`, {
        ...newRequest,
        userId: user._id, // Include the user ID when creating a blood request
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
      .post(`/api/blood-requests/comment`, {
        requestId: selectedRequestId,
        userId: user._id,
        comment: newComment,
      })
      .then((response) => {
        const newCommentData = {
          _id: response.data._id, // assuming response contains the comment ID
          userId: { _id: user._id, name: user.name },
          comment: newComment, // use the newComment state value
        };

        const updatedRequests = requests.map((request) => {
          if (request._id === selectedRequestId) {
            return {
              ...request,
              comments: [...request.comments, newCommentData],
            };
          }
          return request;
        });

        setRequests(updatedRequests);
        setNewComment("");
        // No need to close the modal here
      })
      .catch((error) => {
        console.error("There was an error adding the comment!", error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-10 mt-5">Blood Requests</h1>
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
        <div className="modal-box p-10 rounded-xl my-10">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <h2 className="text-xl mb-5 font-bold">Create Blood Request</h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 flex-col gap-3"
            >
              <input
                type="text"
                name="bloodGroup"
                value={newRequest.bloodGroup}
                onChange={handleChange}
                placeholder="Blood Group"
                required
                className="form-control input input-bordered"
              />
              <input
                type="number"
                name="quantity"
                value={newRequest.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="form-control input input-bordered"
              />
              <input
                type="text"
                name="urgency"
                value={newRequest.urgency}
                onChange={handleChange}
                placeholder="Urgency"
                required
                className="form-control input input-bordered"
              />
              <input
                type="text"
                name="country"
                value={newRequest.country}
                onChange={handleChange}
                placeholder="Country"
                className="form-control input input-bordered"
              />
              <input
                type="text"
                name="division"
                value={newRequest.division}
                onChange={handleChange}
                placeholder="Division"
                className="form-control input input-bordered"
              />
              <input
                type="text"
                name="district"
                value={newRequest.district}
                onChange={handleChange}
                placeholder="District"
                className="form-control input input-bordered"
              />
              <input
                type="text"
                name="city"
                value={newRequest.city}
                onChange={handleChange}
                placeholder="City"
                className="form-control input input-bordered"
              />
              <input
                type="text"
                name="contactInfo"
                value={newRequest.contactInfo}
                onChange={handleChange}
                placeholder="Contact Info"
                required
                className="form-control input input-bordered"
              />
              <textarea
                name="caption"
                value={newRequest.caption}
                onChange={handleChange}
                placeholder="Caption"
                required
                className="form-control input input-bordered col-span-2 resize-none h-20"
              />
              <button
                type="submit"
                className="btn btn-success text-secondary col-span-2"
              >
                Post Request
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <h1 className="text-2xl font-bold my-10"> AllBlood Requests</h1>

      <div className="flex flex-col gap-8">
        {requests.map((request) => (
          <div
            key={request._id}
            style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
            className="p-6 bg-white rounded-xl"
          >
            <div className="mb-5">
              <h1 className="font-bold text-2xl mb-3 text-gray-800">
                {request.userId ? request.userId.name : "Unknown User"}
              </h1>
              <h2 className="flex items-center text-xl mb-2 text-gray-700">
                <WaterDrop className="text-red-500 mr-2" /> {request.bloodGroup}{" "}
                - {request.quantity} units
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Urgency:</span>{" "}
                {request.urgency}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Location:</span> {request.city},{" "}
                {request.district}, {request.division}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Contact:</span>{" "}
                {request.contactInfo}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Message:</span>{" "}
                {request.caption}
              </p>
            </div>
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
              Comment
            </button>

            <dialog id={`commentModal-${request._id}`} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Comments</h3>
                  <ul className="mb-4">
                    {request.comments.map((comment) => (
                      <li
                        key={comment._id}
                        className="p-2 mb-3 rounded-xl"
                        style={{ boxShadow: "0 1px 10px rgb(0,0,0,.3)" }}
                      >
                        <p className="text-gray-700">
                          <span className="font-semibold">
                            {comment.userId
                              ? comment.userId.name
                              : "Unknown User"}
                            :
                          </span>{" "}
                          {comment.comment}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <form onSubmit={handleCommentSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Your comment"
                      required
                      className="form-control input input-bordered w-full"
                    />
                    <button type="submit" className="btn btn-success w-full">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodRequest;
