import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #1a1e2c 0%, #1e2b47 40%, #4a2837 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 20px 0 40px;
  padding: 20px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;

  img {
    width: 140px;
    height: 140px;
    object-fit: contain;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1/1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 3px solid white;
    border-radius: 16px;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 36px;
  margin: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Subtitle = styled.h2`
  color: white;
  text-align: center;
  font-size: 24px;
  margin: 8px 0 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NavigationButton = styled.button<{ variant?: 'countries' | 'disciplines' }>`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid white;
  border-radius: 12px;
  color: white;
  font-size: 22px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }

  img {
    width: 28px;
    height: 28px;
  }
`;

export const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <LogosContainer>
        <img src="/media/images/logo-left.png" alt="Olympic logo" />
        <img src="/media/images/logo-right.png" alt="Paralympic logo" />
      </LogosContainer>

      <MainContent>        <ImageContainer>
          <img src="/media/images/medals.jpg" alt="Olympic Medals" />
          <TextOverlay>
            <Title>Olympics</Title>
            <Subtitle>Medals</Subtitle>
          </TextOverlay>
        </ImageContainer>

        <NavigationButton
          variant="countries"
          onClick={() => navigate('/countries')}
        >
          <img src="/media/images/icons/world.png" alt="" />
          Countries
        </NavigationButton>

        <NavigationButton 
          variant="disciplines"
          onClick={() => navigate('/disciplines')}
        >
          <img src="/media/images/icons/sports.png" alt="" />
          Disciplines
        </NavigationButton>
      </MainContent>
    </PageContainer>
  );
};
