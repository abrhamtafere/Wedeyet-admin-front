import React from 'react';

const DeleteConfirmationDialog = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <p>Are you sure you want to delete?</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmationDialog;
