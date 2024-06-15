import React, { useEffect, useState } from 'react';
import { Container, Title, Text, MonsterImage, RuleList, Background, BackButton } from '../style/explainStyle';
import monster1 from '../img/monster1.png';
import monster2 from '../img/monster2.png';
import monster3 from '../img/monster3.png';

function ExplainPage({ setMode }) {
    const [exp, setExp] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3001/userinfo")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.experience) {
                    setExp(data.experience);
                }
            });
    }, []);

    const calculateMonsterStats = (experience, multiplier) => ({
        attack: experience * multiplier,
        health: experience * multiplier,
    });

    const handleConfirm = () => {
        const monster1Stats = calculateMonsterStats(exp, 0.8);
        const monster2Stats = calculateMonsterStats(exp, 1.2);
        const monster3Stats = calculateMonsterStats(exp, 1.5);

        localStorage.setItem('monster1', JSON.stringify(monster1Stats));
        localStorage.setItem('monster2', JSON.stringify(monster2Stats));
        localStorage.setItem('monster3', JSON.stringify(monster3Stats));

        setMode('QUIZ');
    };

    return (
        <Background>
            <Container>
                <Title>게임 규칙</Title>
                <RuleList>
                    <li>몬스터 3마리가 나오고 몬스터를 3마리를 다 죽여야 클리어</li>
                    <li>유저가 정답을 맞추면 유저가 공격, 유저가 틀리면 몬스터 공격</li>
                    <li>유저나 몬스터 중 하나라도 체력이 0이 되면 게임 종료</li>
                </RuleList>
                <Text>몬스터들을 물리치고 왕국을 탈출하세요!</Text>
                <div>
                    <MonsterImage src={monster1} alt="Monster 1" />
                    <MonsterImage src={monster2} alt="Monster 2" />
                    <MonsterImage src={monster3} alt="Monster 3" />
                </div>
                <BackButton onClick={handleConfirm}>확인</BackButton>
            </Container>
        </Background>
    );
}

export default ExplainPage;
