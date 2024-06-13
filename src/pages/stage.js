import React, { useState, useEffect } from 'react';
import { Container, Title, StageList, StageItem, StageButton, BackButton, Background } from '../style/stagestyle';
import cBackground from '../img/cbackground.png';
import cssBackground from '../img/cssbackground.png';
import javaBackground from '../img/javabackground.png';
import pythonBackground from '../img/pythonbackground.png';
import jsBackground from '../img/jsbackground.png';
import htmlBackground from '../img/htmlbackground.png';

const backgroundImages = {
  c: cBackground,
  css: cssBackground,
  java: javaBackground,
  python: pythonBackground,
  js: jsBackground,
  html: htmlBackground,
};

function Stage({ setMode, setSelectedStage, selectedLanguage }) {
  const [stages, setStages] = useState([]);
  const [userProgress, setUserProgress] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/stages?language=${selectedLanguage}`)
      .then((res) => res.json())
      .then((data) => {
        setStages(data.stages);
        setUserProgress(data.userProgress);
      });
  }, [selectedLanguage]);

  const handleStageClick = (stageId) => {
    if (stageId <= userProgress + 1) {
      setSelectedStage(stageId);
      setMode("QUIZ");
    } else {
      alert("이전 스테이지를 완료해야 합니다.");
    }
  };

  return (
    <Background backgroundImage={backgroundImages[selectedLanguage]}>
      <Container>
        <Title>스테이지 선택 ({selectedLanguage.toUpperCase()})</Title>
        <Title>{selectedLanguage.toUpperCase()}왕국에 갇히셨습니다. <br/> 문제를 해결하고 왕국을 탈출 하세요.</Title>
        <StageList>
          {stages.map((stage) => (
            <StageItem key={stage.id}>
              <StageButton
                onClick={() => handleStageClick(stage.id)}
                completed={stage.id <= userProgress}
                disabled={stage.id > userProgress + 1}
              >
                {stage.title}
              </StageButton>
            </StageItem>
          ))}
        </StageList>
        <BackButton onClick={() => setMode("LANGUAGE")}>돌아가기</BackButton>
      </Container>
    </Background>
  );
}

export default Stage;
