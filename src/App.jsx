import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const App = () => {
  const [rolling, setRolling] = useState(false); // 回転中:true, 停止中:false
  const [number, setNumber] = useState(null); // 数字記録用
  const intervalRef = useRef(null); // setInterval の ID を保存
  const [numberIndex, setNumberIndex] = useState(
    Array.from({ length: 99 }, (_, index) => index + 1)
  );
  const [numberList, setNumberList] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!flag) {
      return;
    }
    if (rolling) {
      if (numberIndex.length === 0) {
        alert('全ての数が出ました!');
      }

      intervalRef.current = setInterval(() => {
        setNumber(Math.floor(Math.random() * 99) + 1);
      }, 20); // 0.1秒ごとに変化
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      const randomElement =
        numberIndex[Math.floor(Math.random() * numberIndex.length)];

      // 正しくリストを更新
      setNumberList((prev) => [...prev, randomElement]);
      setNumberIndex((prev) => prev.filter((num) => num !== randomElement));

      setNumber(randomElement);
    }

    // クリーンアップ処理
    return () => clearInterval(intervalRef.current);
  }, [rolling]); // rolling が変化したときに実行>>依存配列

  const handleClick = () => {
    setFlag(true);
    setRolling((prev) => !prev);
  };

  return (
    <Bodydiv>
      <Title>BINGO!</Title>
      <BingNumber>{number !== null ? `${number}` : 'Press Start!'}</BingNumber>
      <Btn onClick={handleClick}>{rolling ? 'Stop' : 'Start'}</Btn>
      <NumberContainer>
        <h3>出た数字</h3>
        <h4>{`${numberList}`}</h4>
      </NumberContainer>
    </Bodydiv>
  );
};

export default App;

// CSS

const Bodydiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width 200vh
  height: 100vh;
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff4500;
  margin-bottom: 20px;
`;

const BingNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  align-itesm: center;
  justify-content: center;
  display: flex;
  min-width: 60px;
`;

const Btn = styled.button`
  font-size: 1.5rem;
  padding: 10px 20px;
  background-color: ${({ rolling }) => (rolling ? '#d9534f' : '#5cb85c')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ rolling }) => (rolling ? '#c9302c' : '#4cae4c')};
  }
`;

const NumberContainer = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 1.2rem;

  h3 {
    font-size: 1.5rem;
    color: #007bff;
  }

  h4 {
    font-size: 1.2rem;
    color: #333;
    background: #e9ecef;
    padding: 10px;
    border-radius: 5px;
  }
`;
