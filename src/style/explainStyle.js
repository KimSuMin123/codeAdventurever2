// explainStyle.js

import styled from 'styled-components';

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const Container = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const RuleList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  text-align: left;
  li {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const Text = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const MonsterImage = styled.img`
  width: 100px;
  height: auto;
  margin: 0 10px;
`;

export const BackButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
  }
`;
