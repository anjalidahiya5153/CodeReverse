import React from "react";
import "../styles/HintModal.css"; // Add styles here if needed

const HintModal = ({ show, onClose, hint }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Hint</h2>
        <p>{hint || "No hints available at the moment."}</p>
        <button onClick={onClose} className="btn close-btn">Close</button>
      </div>
    </div>
  );
};

export default HintModal;
