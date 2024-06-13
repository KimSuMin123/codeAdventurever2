import styled from 'styled-components';
import background from '../img/background.png';

export const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
`;

export const UserInfoContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  text-align: left;
  width: 100%;
  max-width: 600px;
  column-count: 2;
  column-gap: 20px;
`;

export const UserInfoItem = styled.p`
  font-size: 16px;
  margin: 5px 0;
  break-inside: avoid;
`;

export const Title = styled.h2`
  font-family: 'PixelEmulator', sans-serif;
  color: black;
  margin-bottom: 20px;
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
