import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../services/api';
import type { Country } from '../types';

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

const CountryName = styled.h1`
  color: white;
  text-align: center;
  font-size: 36px;
  margin: 20px 0;
  text-transform: uppercase;
`;

const FlagContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 20px auto;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid white;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MedalTypeTitle = styled.h2`
  color: white;
  text-align: center;
  font-size: 24px;
  margin: 20px 0;
  text-transform: uppercase;
`;

const TotalMedals = styled.div`
  color: white;
  text-align: center;
  font-size: 64px;
  margin: 20px 0;
  font-weight: bold;
`;

const DisciplinesTable = styled.div`
  width: 100%;
  margin-top: 30px;
  border-spacing: 0;
  border-collapse: separate;
  color: white;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 8px;
  
  div {
    color: white;
    font-size: 18px;
    text-transform: uppercase;
    padding: 0 16px;
  }
`;

const DisciplineRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  div {
    color: white;
    font-size: 18px;
    padding: 0 16px;
  }
`;

export const CountryMedalsPage = () => {
  const { id, medalType } = useParams<{ id: string; medalType: 'gold' | 'silver' | 'bronze' }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [disciplines, setDisciplines] = useState<{name: string, medals: number}[]>([]);
  const [totalMedals, setTotalMedals] = useState(0);

  useEffect(() => {
    const fetchCountry = async () => {
      if (!id || !medalType) return;
      try {
        const data = await api.getCountry(Number(id));
        setCountry(data);

        // Подготавливаем данные о медалях по дисциплинам
        const disciplinesList = Object.entries(data.medals.disciplines)
          .map(([name, medals]) => ({
            name,
            medals: medals[medalType]
          }))
          .filter(d => d.medals > 0)
          .sort((a, b) => b.medals - a.medals);

        setDisciplines(disciplinesList);
        setTotalMedals(disciplinesList.reduce((sum, d) => sum + d.medals, 0));
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchCountry();
  }, [id, medalType]);

  if (!country || !medalType) {
    return null;
  }

  const handleBackClick = () => {
    navigate(`/countries/${id}`);
  };

  const getMedalTypeTitle = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1) + ' Medals';
  };

  return (
    <PageContainer>
      <Content>
        <BackButton onClick={handleBackClick}>←</BackButton>
        
        <LogosContainer>
          <img src="/media/images/logo-left.png" alt="Olympic logo" />
          <img src="/media/images/logo-right.png" alt="Paralympic logo" />
        </LogosContainer>

        <CountryName>{country.name}</CountryName>
        
        <FlagContainer>
          <img src={country.flag} alt={`${country.name} flag`} />
        </FlagContainer>

        <MedalTypeTitle>{getMedalTypeTitle(medalType)}</MedalTypeTitle>
        <TotalMedals>{totalMedals}</TotalMedals>

        <DisciplinesTable>
          <TableHeader>
            <div>DISCIPLINE</div>
            <div>MEDALS</div>
          </TableHeader>

          {disciplines.map(discipline => (
            <DisciplineRow key={discipline.name}>
              <div>{discipline.name}</div>
              <div>{discipline.medals}</div>
            </DisciplineRow>
          ))}
        </DisciplinesTable>
      </Content>
    </PageContainer>
  );
};
