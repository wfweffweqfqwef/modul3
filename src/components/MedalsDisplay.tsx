import styled from 'styled-components';

const MedalsTable = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px auto;
  border-spacing: 0;
  border-collapse: separate;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
`;

const MedalsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  gap: 10px;
  margin: 10px 0;
`;

const MedalHeader = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 5px;
`;

const MedalValue = styled.div<{ highlight?: boolean }>`
  font-size: ${props => props.highlight ? '32px' : '28px'};
  font-weight: 600;
  color: white;
  padding: 5px;
  ${props => props.highlight && `
    color: #FFD700;
  `}
`;

interface MedalsDisplayProps {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  showTotal?: boolean;
}

export const MedalsDisplay = ({
  gold,
  silver,
  bronze,
  total,
  showTotal = false
}: MedalsDisplayProps) => {
  return (
    <MedalsTable>
      <MedalsRow>
        <MedalHeader>GOLD</MedalHeader>
        <MedalHeader>SILVER</MedalHeader>
        <MedalHeader>BRONZE</MedalHeader>
        <MedalHeader>TOTAL</MedalHeader>
      </MedalsRow>
      <MedalsRow>
        <MedalValue>{gold}</MedalValue>
        <MedalValue>{silver}</MedalValue>
        <MedalValue>{bronze}</MedalValue>
        <MedalValue highlight>{total}</MedalValue>
      </MedalsRow>
    </MedalsTable>
  );
};
