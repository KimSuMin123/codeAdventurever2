import React, { useState, useEffect } from 'react';
import { MyPageContainer, UserInfoContainer, UserInfoItem, 
  Title, Button } from '../style/MypageStyle';

function MyPage(props) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/userinfo")
      .then((res) => res.json())
      .then((json) => {
        setUserInfo(json);
      });
  }, []);

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <MyPageContainer>
      <Title>마이페이지</Title>
      <UserInfoContainer>
        <UserInfoItem>아이디: {userInfo.username}</UserInfoItem>
        <UserInfoItem>이메일: {userInfo.email}</UserInfoItem>
        <UserInfoItem>전화번호: {userInfo.phone}</UserInfoItem>
        <UserInfoItem>코인: {userInfo.coin}</UserInfoItem>
        <UserInfoItem>레벨: {userInfo.level}</UserInfoItem>
        <UserInfoItem>경험치: {userInfo.experience}</UserInfoItem>
        <UserInfoItem>C언어 단계: {userInfo.cst}</UserInfoItem>
        <UserInfoItem>Java 단계: {userInfo.javast}</UserInfoItem>
        <UserInfoItem>Python 단계: {userInfo.pythonst}</UserInfoItem>
        <UserInfoItem>HTML 단계: {userInfo.htmlst}</UserInfoItem>
        <UserInfoItem>CSS 단계: {userInfo.cssst}</UserInfoItem>
        <UserInfoItem>JS 단계: {userInfo.jsst}</UserInfoItem>
      </UserInfoContainer>
      <Button onClick={() => props.setMode("LANGUAGE")}>메인으로 돌아가기</Button>
    </MyPageContainer>
  );
}

export default MyPage;
