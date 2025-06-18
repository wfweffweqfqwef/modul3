import axios from 'axios';
import type { Country, DisciplineMedals } from '../types';

const API_URL = 'http://localhost:3001';

export const api = {
  getCountries: async (): Promise<Country[]> => {
    const response = await axios.get(`${API_URL}/countries`);
    return response.data;
  },
  getCountry: async (id: number): Promise<Country> => {
    const response = await axios.get(`${API_URL}/countries/${id}`);
    return response.data;
  },

  getDisciplines: async (): Promise<string[]> => {
    const response = await axios.get(`${API_URL}/countries`);
    const countries: Country[] = response.data;
    const disciplines = new Set<string>();
    
    countries.forEach(country => {
      Object.keys(country.medals.disciplines).forEach(discipline => {
        disciplines.add(discipline);
      });
    });

    return Array.from(disciplines).sort();
  },

  getCountriesByDiscipline: async (discipline: string): Promise<{ country: Country; totalMedals: number }[]> => {
    const response = await axios.get(`${API_URL}/countries`);
    const countries: Country[] = response.data;
    
    return countries
      .map(country => {
        const disciplineMedals = country.medals.disciplines[discipline] as DisciplineMedals;
        if (!disciplineMedals) return null;
        
        const totalMedals = disciplineMedals.gold + disciplineMedals.silver + disciplineMedals.bronze;
        return totalMedals > 0 ? { country, totalMedals } : null;
      })
      .filter((item): item is { country: Country; totalMedals: number } => item !== null)
      .sort((a, b) => b.totalMedals - a.totalMedals);
  },

  getCountryDisciplineMedals: async (countryId: number, discipline: string): Promise<DisciplineMedals | null> => {
    try {
      const country = await api.getCountry(countryId);
      return country.medals.disciplines[discipline] as DisciplineMedals || null;
    } catch (error) {
      console.error('Error getting country discipline medals:', error);
      return null;
    }
  }
};
