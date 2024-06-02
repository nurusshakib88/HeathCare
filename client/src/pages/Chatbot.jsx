import React, { useState } from "react";
import { Send } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Chatbot = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [days, setDays] = useState("");
  const [response, setResponse] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const steps = [
    { question: "What is your name?", state: name, setState: setName },
    {
      question: "Symptoms (comma-separated)",
      state: symptoms,
      setState: setSymptoms,
    },
    { question: "From how many days?", state: days, setState: setDays },
  ];

  const handleNextStep = async () => {
    if (step === steps.length - 1) {
      // Last step, submit form
      const response = await fetch("http://localhost:5000/get_disease", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, symptoms, days }),
      });
      const data = await response.json();
      setResponse(data);
    } else {
      // Move to next step
      setStep(step + 1);
      setChatHistory([
        ...chatHistory,
        { question: steps[step].question, answer: steps[step].state },
      ]);
    }
  };

  return (
    <div className="mx-32 my-10 p-10 bg-primary rounded-xl shadow-xl h-[71vh] flex flex-col items-end justify-end overflow-y-auto">
      <div className="w-full overflow-auto">
        {chatHistory.map((chat, index) => (
          <div key={index} className="text-gray-700 mb-2">
            <div className="chat chat-start">
              <p className="inline-block max-w-96 chat-bubble">
                {chat.question}
              </p>
            </div>
            <div className="chat chat-end">
              <p className="chat-bubble">{chat.answer}</p>
            </div>
          </div>
        ))}
        {response && (
          <div className="text-gray-700 mb-2">
            <div className="chat chat-start">
              <p className="inline-block max-w-96 chat-bubble">
                From how many days?
              </p>
            </div>
            <div className="chat chat-end">
              <p className="chat-bubble">{days}</p>
            </div>
          </div>
        )}
        {/* Result Section */}
        {response && (
          <div className="chat chat-start">
            <div className="chat-bubble text-secondary p-5">
              <div className="space-y-2">
                <p className="text-xl font-medium">
                  You may have: {response.disease}
                </p>
                {days > 7 ? (
                  <p className="text-red-600 font-medium">
                    You should take consultation from a doctor.
                  </p>
                ) : (
                  <p className="text-yellow-600 font-medium">
                    It might not be that bad but you should take precautions.
                  </p>
                )}
                <p>Disease Description</p>
                <p className="text-gray-400">{response.description}</p>
                <p>Take following measures:</p>
                <ul className="list-disc list-inside text-gray-400">
                  {response.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>

                <p className="mt-5">
                  Just to be on the safer side please see a doctor soon !!
                </p>

                <NavLink
                  to="/make-an-appointment"
                  className="btn btn-primary mt-5"
                >
                  Make an Appointment
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Render the form only if there's no response */}
      {!response && (
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleNextStep();
          }}
        >
          <div className="flex flex-col space-y-2">
            <div className="chat chat-start">
              <label
                htmlFor={steps[step].question}
                className="inline-block max-w-96 chat-bubble"
              >
                {steps[step].question}
              </label>
            </div>
            <div className="flex gap-3 items-center ">
              <input
                type="text"
                id={steps[step].question}
                value={steps[step].state}
                onChange={(e) => steps[step].setState(e.target.value)}
                className="input input-bordered w-full"
              />
              {step === steps.length - 1 ? (
                <button type="submit" className="btn bg-secondary">
                  <Send />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn bg-secondary"
                >
                  <Send />
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Chatbot;
