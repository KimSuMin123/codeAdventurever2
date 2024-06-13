import React, { useState, useEffect } from 'react';
import { Container, Title, Explanation, Question, Input, Button } from '../style/quizstyle';
import { CodeBlock } from "react-code-blocks";
import LevelUpModal from './LevelUpModal';
import SuccessModal from './SuccessModal';
import FailureModal from './FailureModal';

function Quiz({ stageId, setMode, selectedLanguage }) {
  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState("");
  const [nextStageId, setNextStageId] = useState(stageId);
  const [levelUp, setLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [hint, setHint] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/quiz/${nextStageId}?language=${selectedLanguage}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setHint("");
        setAnswer("");
      });
  }, [nextStageId, selectedLanguage]);

  const handleSubmit = () => {
    fetch("http://localhost:3001/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stageId: nextStageId, answer, language: selectedLanguage }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.correct) {
          if (data.firstTime) {
            setShowSuccessModal(true);
            if (data.levelUp) {
              setNewLevel(data.newLevel);
              setLevelUp(true);
            }
          } else {
            alert("정답입니다! 이미 클리어한 스테이지입니다, 보상은 지급되지 않습니다.");
          }
          setNextStageId(nextStageId + 1);
        } else {
          setShowFailureModal(true);
        }
      });
  };

  const handlePurchaseHint = () => {
    return fetch("http://localhost:3001/purchase-hint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stageId: nextStageId, language: selectedLanguage }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHint(data.hint);
        }
        return data;
      });
  };

  if (!quiz) return <Container>로딩 중...</Container>;

  return (
    <Container>
      <Title>스테이지 {nextStageId} ({selectedLanguage.toUpperCase()})</Title>
      <Explanation>{quiz.explanation}</Explanation>
      <Question><CodeBlock text={quiz.question}></CodeBlock></Question>
      {hint && <p>힌트: {hint}</p>}
      <Input 
        type="text" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
      />
      <Button onClick={handleSubmit}>제출</Button>
      <Button onClick={() => setMode("STAGE")}>돌아가기</Button>
      <LevelUpModal 
        isOpen={levelUp} 
        onClose={() => setLevelUp(false)} 
        newLevel={newLevel} 
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <FailureModal 
        isOpen={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        onPurchaseHint={handlePurchaseHint}
      />
    </Container>
  );
}

export default Quiz;
