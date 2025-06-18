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

const MedalsTable = styled.div`
  width: 100%;
  margin: 30px auto;
  border-spacing: 0;
  border-collapse: separate;
  color: white;
`;

const MedalsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  gap: 10px;
  margin: 10px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 10px;
  }
`;

const MedalHeader = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
`;

const MedalValue = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const MedalButton = styled.button<{ type: 'gold' | 'silver' | 'bronze' }>`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid white;
  border-radius: 12px;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

export const CountryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      if (!id) return;
      try {
        const data = await api.getCountry(Number(id));
        setCountry(data);
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchCountry();
  }, [id]);

  if (!country) {
    return null;
  }

  const totalMedals = country.medals.gold + country.medals.silver + country.medals.bronze;

  const handleBackClick = () => {
    navigate('/countries');
  };

  const handleMedalTypeClick = (type: 'gold' | 'silver' | 'bronze') => {
    navigate(`/countries/${id}/medals/${type}`);
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

        <MedalsTable>
          <MedalsRow>
            <MedalHeader>GOLD</MedalHeader>
            <MedalHeader>SILVER</MedalHeader>
            <MedalHeader>BRONZE</MedalHeader>
            <MedalHeader>TOTAL</MedalHeader>
          </MedalsRow>
          <MedalsRow>
            <MedalValue>{country.medals.gold}</MedalValue>
            <MedalValue>{country.medals.silver}</MedalValue>
            <MedalValue>{country.medals.bronze}</MedalValue>
            <MedalValue>{totalMedals}</MedalValue>
          </MedalsRow>
        </MedalsTable>

        <MedalButton
          type="gold"
          onClick={() => handleMedalTypeClick('gold')}
        >
          <img src="/media/images/medals/gold.png" alt="" />
          Medals
        </MedalButton>

        <MedalButton
          type="silver"
          onClick={() => handleMedalTypeClick('silver')}
        >
          <img src="/media/images/medals/silver.png" alt="" />
          Medals
        </MedalButton>

        <MedalButton
          type="bronze"
          onClick={() => handleMedalTypeClick('bronze')}
        >
          <img src="/media/images/medals/bronze.png" alt="" />
          Medals
        </MedalButton>
      </Content>
    </PageContainer>
  );
};
