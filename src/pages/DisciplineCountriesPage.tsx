import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../services/api';
import { Country } from '../types';

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
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    opacity: 0.8;
  }

  img {
    width: 24px;
    height: 24px;
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
  text-transform: capitalize;
`;

const DisciplineIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: 30px auto;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
`;

const TableContainer = styled.div`
  margin-top: 40px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 12px 16px;
  margin-bottom: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  
  div {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const CountryRow = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const CountryName = styled.div`
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const MedalsCount = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

interface CountryMedals {
  country: Country;
  totalMedals: number;
}

export const DisciplineCountriesPage = () => {
  const { discipline } = useParams<{ discipline: string }>();
  const navigate = useNavigate();
  const [countries, setCountries] = useState<CountryMedals[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      if (!discipline) return;
      try {
        const data = await api.getCountriesByDiscipline(discipline);
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, [discipline]);

  const handleBackClick = () => {
    navigate('/disciplines');
  };

  const handleCountryClick = (countryId: number) => {
    navigate(`/disciplines/${discipline}/countries/${countryId}`);
  };

  if (!discipline) return null;

  return (
    <PageContainer>
      <Content>
        <BackButton onClick={handleBackClick}>
          <img src="/media/images/icons/back.png" alt="Back" />
          Back
        </BackButton>
        
        <LogosContainer>
          <img src="/media/images/logo-left.png" alt="Olympic logo" />
          <img src="/media/images/logo-right.png" alt="Paralympic logo" />
        </LogosContainer>

        <Title>{discipline.charAt(0).toUpperCase() + discipline.slice(1)}</Title>
        
        <DisciplineIcon>
          <img 
            src={`/media/images/disciplines/${discipline.toLowerCase()}.png`}
            alt={discipline}
          />
        </DisciplineIcon>

        <TableContainer>
          <TableHeader>
            <div>Country</div>
            <div>Medals</div>
          </TableHeader>

          {countries.map(({ country, totalMedals }) => (
            <CountryRow
              key={country.id}
              onClick={() => handleCountryClick(country.id)}
            >
              <CountryName>
                <img src={country.flag} alt={`${country.name} flag`} />
                {country.name}
              </CountryName>
              <MedalsCount>{totalMedals}</MedalsCount>
            </CountryRow>
          ))}
        </TableContainer>
      </Content>
    </PageContainer>
  );
};
