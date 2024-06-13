import styled from 'styled-components';

export const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-position: center;
  text-align: center;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

export const Title = styled.h2`
  font-family: 'PixelEmulator', sans-serif;
  color: black;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 200px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 220px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f39c12;
  color: white;
  &:hover {
    background-color: #e67e22;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export const SignupPrompt = styled.p`
  color: black;
  font-size: 14px;
`;
