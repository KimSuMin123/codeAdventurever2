import React from 'react';
import { ModalOverlay, ModalContent, ModalTitle, ModalButton } from '../style/quizstyle';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>정답입니다!</ModalTitle>
        <p>코인 500을 획득 하셨고 경험치가 50 증가하였습니다.</p>
        <ModalButton onClick={onClose}>확인</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SuccessModal;
