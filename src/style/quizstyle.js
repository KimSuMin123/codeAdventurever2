// quizstyle.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: skyblue;
  color: #fff;
  min-height: 100vh;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const Explanation = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-align: center;
`;

export const Question = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 20px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  margin: 10px;
  border-radius: 10px;
  border: none;
  background-color: #ff6b6b;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #ff4757;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #333;
  max-width: 400px;
  width: 100%;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #3a1c71;
`;

export const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 10px;
  border: none;
  background-color: #3a1c71;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #2a0d49;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;
