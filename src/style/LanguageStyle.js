import styled from 'styled-components';
import backgroundImage from '../img/background.png';

export const Container = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative; /* 추가 */
`;

export const AdContainer = styled.div`
  position: absolute;
  top: 20px; /* 조정 */
  left: 43%;
  transform: translateX(-50%);
`;

export const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 10px;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: black;
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const TableItem = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 100px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  transition: background-color 0.3s;
  &:hover {
    background-color: #555;
  }
`;

export const Links = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const Link = styled.a`
  margin: 0 10px;
  color: black;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const StatusContainer = styled.div`
  position: absolute; /* 추가 */
  top: 20px; /* 조정 */
  right: 20px; /* 조정 */
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const CoinImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

export const StatusText = styled.span`
  font-size: 14px;
`;
