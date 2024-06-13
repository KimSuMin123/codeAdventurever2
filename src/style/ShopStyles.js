import styled from 'styled-components';

export const ShopContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

export const ShopTitle = styled.h2`
  margin-bottom: 20px;
`;

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: rgba(225, 225, 225, 0.7);
`;

export const TableHeader = styled.thead`
  background-color: #f4f4f4;

  th {
    padding: 10px;
    border: 1px solid #ddd;
  }
`;

export const TableRow = styled.tr`
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }

  img {
    max-width: 100px;
    height: auto;
  }

  button {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #008CBA;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #007B9E;
  }
`;
