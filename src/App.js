import './App.css';
import React, { useState, useEffect } from 'react';
import Start from './pages/Start';
import Login from './pages/Login';
import Signin from './pages/Signin';
import MyPage from './pages/MyPage';
import Stage from './pages/Stage';
import Quiz from './pages/Quiz';
import Language from './pages/Language';
import Shop from './pages/Shop';
import Manager from './pages/Manager';

function App() {
  const [mode, setMode] = useState("START");
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/authcheck")
      .then((res) => res.json())
      .then((json) => {        
        if (json.isLogin === "True") {
          setMode("LANGUAGE");
        }
        else if (mode !== "START" && mode !== "LOGIN") {
          setMode("LOGIN");
        }
      });
  }, []); 

  let content = null;  

  if(mode === "START"){
    content = <Start setMode={setMode}></Start> 
  }
  else if(mode === "LOGIN"){
    content = <Login setMode={setMode}></Login> 
  }
  else if (mode === 'SIGNIN') {
    content = <Signin setMode={setMode}></Signin> 
  }
  else if (mode === 'MYPAGE') {
    content = <MyPage setMode={setMode}></MyPage>
  }
  else if (mode === 'LANGUAGE') {
    content = <Language setMode={setMode} setSelectedLanguage={setSelectedLanguage}></Language>
  }
  else if (mode === 'STAGE') {
    content = <Stage setMode={setMode} setSelectedStage={setSelectedStage} selectedLanguage={selectedLanguage}></Stage>
  }
  else if (mode === 'QUIZ') {
    content = <Quiz stageId={selectedStage} setMode={setMode} selectedLanguage={selectedLanguage}></Quiz>
  }
  else if (mode === 'SHOP') {
    content = <Shop setMode={setMode}></Shop>
  }
  else if (mode === 'MANAGER') {
    content = <Manager setMode={setMode}></Manager>
  }

  return (
    <>
      <div className="background">
        {content}
      </div>
    </>
  );
}

export default App;
