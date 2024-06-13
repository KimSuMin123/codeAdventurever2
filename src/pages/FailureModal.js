import React, { useState } from 'react';
import { ModalOverlay, ModalContent, ModalTitle, ModalButton } from '../style/quizstyle';

function FailureModal({ isOpen, onClose, onPurchaseHint }) {
  const [successMessage, setSuccessMessage] = useState("");

  const handlePurchaseHint = () => {
    onPurchaseHint().then((result) => {
      if (result.success) {
        setSuccessMessage("힌트 구매 성공!");
      } else {
        setSuccessMessage(result.message);
      }
    });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>틀렸습니다.</ModalTitle>
        <p>다시 시도해주세요</p>
        {successMessage && <p>{successMessage}</p>}
        
        <ModalButton onClick={handlePurchaseHint}>힌트 구매 (300 코인)</ModalButton>
      
        <ModalButton onClick={onClose}>Close</ModalButton>
        </ModalContent>
    </ModalOverlay>
  );
}

export default FailureModal;
