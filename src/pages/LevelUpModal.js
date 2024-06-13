import React from 'react';
import { ModalOverlay, ModalContent, ModalTitle, ModalButton } from '../style/quizstyle';

function LevelUpModal({ isOpen, onClose, newLevel }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>레벨 업!</ModalTitle>
        <p>축하합니다! {newLevel} 레벨에 도달했습니다.</p>
        <ModalButton onClick={onClose}>닫기</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default LevelUpModal;
