import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1000;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 20px;
  flex: 1;
  text-align: center;
`;

interface NavBarProps {
  title: string;
  showBack?: boolean;
  onBackClick?: () => void;
}

export const NavBar = ({ title, showBack = false, onBackClick }: NavBarProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <NavBarContainer>
      {showBack && (
        <BackButton onClick={handleBackClick}>
          ←
        </BackButton>
      )}
      <Title>{title}</Title>
    </NavBarContainer>
  );
};
