import styled from 'styled-components';
import type { Country } from '../types';

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin: 8px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(4px);
  }
`;

const Flag = styled.img`
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 16px;
`;

const CountryName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

export const CountryCard = ({ country, onClick }: CountryCardProps) => {
  return (
    <Card onClick={onClick}>
      <Flag src={country.flag} alt={`${country.name} flag`} />
      <CountryName>{country.name}</CountryName>
    </Card>
  );
};
