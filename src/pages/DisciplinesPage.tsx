import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../services/api';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #1a1e2c 0%, #1e2b47 40%, #4a2837 100%);
  padding: 20px;
  position: relative;
`;

const Content = styled.div`
  max-width: 430px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-top: 10px;

  img {
    height: 50px;
    width: auto;
  }
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 36px;
  margin: 20px 0 30px;
  text-transform: uppercase;
`;

const DisciplineButton = styled.button`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid white;
  border-radius: 12px;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;

  img {
    width: 32px;
    height: 32px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

interface Discipline {
  name: string;
  icon: string;
}

export const DisciplinesPage = () => {
  const navigate = useNavigate();
  const [disciplines, setDisciplines] = useState<string[]>([]);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await api.getDisciplines();
        setDisciplines(data);
      } catch (error) {
        console.error('Error fetching disciplines:', error);
      }
    };

    fetchDisciplines();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleDisciplineClick = (discipline: string) => {
    navigate(`/disciplines/${discipline}/countries`);
  };

  return (
    <PageContainer>
      <Content>
        <BackButton onClick={handleBackClick}>←</BackButton>

        <LogosContainer>
          <img src="/media/images/logo-left.png" alt="Olympic logo" />
          <img src="/media/images/logo-right.png" alt="Paralympic logo" />
        </LogosContainer>

        <Title>Disciplines</Title>

        {disciplines.map((discipline) => (
          <DisciplineButton
            key={discipline}
            onClick={() => handleDisciplineClick(discipline)}
          >
            <img
              src={`/media/images/disciplines/${discipline.toLowerCase()}.png`}
              alt={discipline}
            />
            {discipline.charAt(0).toUpperCase() + discipline.slice(1)}
          </DisciplineButton>
        ))}
      </Content>
    </PageContainer>
  );
};
