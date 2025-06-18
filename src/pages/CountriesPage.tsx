import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../services/api';
import type { Country } from '../types';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #1a1e2c 0%, #1e2b47 40%, #4a2837 100%);
  padding: 20px;
`;

const Content = styled.div`
  max-width: 430px;
  margin: 0 auto;
  position: relative;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  position: absolute;
  left: 0;
  top: 10px;
  z-index: 1;
  
  &:hover {
    opacity: 0.8;
  }
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
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
  margin: 10px 0 20px;
  letter-spacing: 2px;
`;

const CountryButton = styled.button`
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

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

export const CountriesPage = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await api.getCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <PageContainer>      <Content>
        <BackButton onClick={handleBackClick}>←</BackButton>
        <LogosContainer>
          <img src="/media/images/logo-left.png" alt="Olympic logo" />
          <img src="/media/images/logo-right.png" alt="Paralympic logo" />
        </LogosContainer>

        <Title>Countries</Title>

        {countries.map(country => (
          <CountryButton
            key={country.id}
            onClick={() => navigate(`/countries/${country.id}`)}
          >
            <img
              src={country.flag}
              alt={`${country.name} flag`}
            />
            {country.name}
          </CountryButton>
        ))}
      </Content>
    </PageContainer>
  );
};
