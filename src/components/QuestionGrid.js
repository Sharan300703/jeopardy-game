// QuestionGrid.js
import React from "react";
import "./QuestionGrid.css";

export default function QuestionGrid({ data, onCardClick }) {
  return (
    <div className="card-grid">
      {data.map((category, catIndex) => (
        <div key={catIndex} className="category-column">
          <h2 className="category-title">{category.topic}</h2>
          <div className="card-container">
            {category.questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className={`card ${q.questionAnswered ? "answered" : ""}`}
                onClick={() => onCardClick(category.topic, q)}
              >
                <span>
                  {q.value} {q.value > 1 ? "Points" : "Point"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
