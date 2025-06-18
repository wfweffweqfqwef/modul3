import styled from 'styled-components';

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

const Icon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 16px;
`;

const DisciplineName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
  text-transform: capitalize;
`;

interface DisciplineCardProps {
  discipline: string;
  onClick: () => void;
}

export const DisciplineCard = ({ discipline, onClick }: DisciplineCardProps) => {
  return (
    <Card onClick={onClick}>
      <Icon 
        src={`/media/images/disciplines/${discipline.toLowerCase()}.png`} 
        alt={`${discipline} icon`} 
      />
      <DisciplineName>{discipline}</DisciplineName>
    </Card>
  );
};
