import React, { useState, useEffect } from 'react';
import { 
  ManagerContainer, 
  SectionTitle, 
  Table, 
  TableHeader, 
  TableRow, 
  TableCell, 
  UpdateQuantityContainer, 
  UpdateButton 
} from '../style/managerstyle';

function Manager({ setMode }) {
  const [purchaseLogs, setPurchaseLogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  useEffect(() => {
    fetch('/purchase-log')
      .then((res) => res.json())
      .then((data) => setPurchaseLogs(data));

    fetch('/shop')
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch('/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUpdateQuantity = () => {
    if (selectedProduct && newQuantity) {
      fetch(`/update-quantity/${selectedProduct.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProducts(products.map(product => 
              product.id === selectedProduct.id ? { ...product, productamount: newQuantity } : product
            ));
            setNewQuantity('');
            setSelectedProduct(null);
          } else {
            alert('Failed to update quantity');
          }
        });
    }
  };

  return (
    <ManagerContainer>
      <SectionTitle>Manager Page</SectionTitle>
      <SectionTitle>Member</SectionTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>이름</TableHeader>
            <TableHeader>이메일</TableHeader>
            <TableHeader>전화번호</TableHeader>
            <TableHeader>코인</TableHeader>
            <TableHeader>경험치</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.coin}</TableCell>
              <TableCell>{user.experience}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <SectionTitle>Purchase Logs</SectionTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>아이디</TableHeader>
            <TableHeader>구매 품목</TableHeader>
            <TableHeader>전화번호</TableHeader>
          </tr>
        </thead>
        <tbody>
          {purchaseLogs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.username}</TableCell>
              <TableCell>{log.productname}</TableCell>
              <TableCell>{log.phone}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <SectionTitle>Products</SectionTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>이름</TableHeader>
            <TableHeader>가격</TableHeader>
            <TableHeader>수량</TableHeader>
            <TableHeader>수량 변경</TableHeader>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.productname}</TableCell>
              <TableCell>{product.productprice}</TableCell>
              <TableCell>{product.productamount}</TableCell>
              <TableCell>
                <UpdateButton onClick={() => setSelectedProduct(product)}>수량 변경</UpdateButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      

      {selectedProduct && (
        <UpdateQuantityContainer>
          <h4>Update Quantity for {selectedProduct.productname}</h4>
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
          <UpdateButton onClick={handleUpdateQuantity}>Update Quantity</UpdateButton>
        </UpdateQuantityContainer>
      )}
    </ManagerContainer>
  );
}

export default Manager;
