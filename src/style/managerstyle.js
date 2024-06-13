import styled from 'styled-components';

export const ManagerContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const UpdateQuantityContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
`;

export const UpdateButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  margin: 5px 0;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
