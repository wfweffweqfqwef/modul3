import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MedalsDisplay } from '../components/MedalsDisplay';
import { api } from '../services/api';
import type { Country, DisciplineMedals } from '../types';

const PageContainer = styled.div`
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background: linear-gradient(120deg, #1a1e2c 0%, #1e2b47 40%, #4a2837 100%);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  img {
    height: 40px;
    width: auto;
  }
`;

const DisciplineIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: 30px auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 80px;
    height: 80px;
  }
`;

const DisciplineName = styled.h1`
  margin: 0;
  font-size: 36px;
  color: white;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const CountryName = styled.h2`
  margin: 20px 0;
  font-size: 32px;
  color: white;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const LoadingText = styled.p`
  text-align: center;
  color: white;
  margin-top: 24px;
`;

export const DisciplineCountryPage = () => {
  const navigate = useNavigate();
  const { discipline, id } = useParams<{ discipline: string; id: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [medals, setMedals] = useState<DisciplineMedals | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!discipline || !id) return;
      try {
        const countryData = await api.getCountry(parseInt(id, 10));
        setCountry(countryData);
        if (countryData.medals.disciplines[discipline]) {
          setMedals(countryData.medals.disciplines[discipline]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [discipline, id]);

  const handleBackClick = () => {
    if (!discipline) return;
    navigate(`/disciplines/${encodeURIComponent(discipline)}/countries`);
  };

  if (!discipline || !id || isLoading) {
    return (
      <PageContainer>
        <LoadingText>Loading data...</LoadingText>
      </PageContainer>
    );
  }

  if (!country || !medals) {
    return (
      <PageContainer>
        <LoadingText>Country or medals not found</LoadingText>
      </PageContainer>
    );
  }

  const totalMedals = medals.gold + medals.silver + medals.bronze;

  return (
    <PageContainer>
      <BackButton onClick={handleBackClick}>←</BackButton>
      
      <LogosContainer>
        <img src="/media/images/logo-left.png" alt="Olympic logo" />
        <img src="/media/images/logo-right.png" alt="Paralympic logo" />
      </LogosContainer>
      
      <DisciplineIcon>
        <img 
          src={`/media/images/disciplines/${discipline.toLowerCase()}.png`}
          alt={discipline}
        />
      </DisciplineIcon>
      
      <DisciplineName>{discipline.toUpperCase()}</DisciplineName>
      <CountryName>{country.name.toUpperCase()}</CountryName>
      
      <MedalsDisplay 
        gold={medals.gold}
        silver={medals.silver}
        bronze={medals.bronze}
        total={totalMedals}
        showTotal
      />
    </PageContainer>
  );
};
