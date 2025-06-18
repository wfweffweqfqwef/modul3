import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { WelcomePage } from './pages/WelcomePage';
import { CountriesPage } from './pages/CountriesPage';
import { CountryPage } from './pages/CountryPage';
import { CountryMedalsPage } from './pages/CountryMedalsPage';
import { DisciplinesPage } from './pages/DisciplinesPage';
import { DisciplineCountriesPage } from './pages/DisciplineCountriesPage';
import { DisciplineCountryPage } from './pages/DisciplineCountryPage';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background-color: #f5f5f5;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>        <Route path="/" element={<WelcomePage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/countries/:id" element={<CountryPage />} />
        <Route path="/countries/:id/medals/:medalType" element={<CountryMedalsPage />} />        <Route path="/disciplines" element={<DisciplinesPage />} />
        <Route path="/disciplines/:discipline/countries" element={<DisciplineCountriesPage />} />
        <Route path="/disciplines/:discipline/countries/:id" element={<DisciplineCountryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
