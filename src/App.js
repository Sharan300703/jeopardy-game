import React, { useState } from "react";

// components
import Navbar from "./components/Navbar";
import QuestionGrid from "./components/QuestionGrid";

// data
import { data } from "./data/questions";

// styles
import "./App.css"; // or wherever your global styles are

export default function App() {
  const [gameData, setGameData] = useState(data);

  // State to manage whether the modal is open
  const [showModal, setShowModal] = useState(false);
  // Store the currently selected question object
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  // Track whether the answer is revealed
  const [revealAnswer, setRevealAnswer] = useState(false);

  // Called when a card is clicked
  const handleCardClick = (topic, question) => {
    // If already answered, do nothing or you could open a modal indicating it's answered
    if (question.questionAnswered) return;

    setSelectedQuestion({ topic, question });
    setShowModal(true);
    setRevealAnswer(false); // Reset reveal state
  };

  // Reveal the answer and mark question as answered
  const handleRevealAnswer = () => {
    setRevealAnswer(true);

    // Update gameData to set questionAnswered = true for this question
    const updatedGameData = gameData.map((category) => {
      if (category.topic === selectedQuestion.topic) {
        return {
          ...category,
          questions: category.questions.map((q) => {
            if (q.question === selectedQuestion.question.question) {
              return { ...q, questionAnswered: true };
            }
            return q;
          }),
        };
      }
      return category;
    });

    setGameData(updatedGameData);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedQuestion(null);
    setRevealAnswer(false);
  };

  return (
    <div className="App">
      <Navbar />
      <QuestionGrid data={gameData} onCardClick={handleCardClick} />

      {/* Render the modal only if showModal is true and we have a selected question */}
      {showModal && selectedQuestion && (
        <div className="modal-overlay" onClick={closeModal}>
          {/* Stop click events on modal-content from closing the modal */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedQuestion.question.question}</h2>

            {/* If we haven't revealed the answer yet, show the Reveal button. Otherwise, show the answer and Close button. */}
            {!revealAnswer ? (
              <button onClick={handleRevealAnswer}>Reveal Answer</button>
            ) : (
              <>
                <p>
                  <strong>Answer:</strong> {selectedQuestion.question.answer}
                </p>
                <button onClick={closeModal}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
