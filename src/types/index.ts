export interface Medals {
  gold: number;
  silver: number;
  bronze: number;
}

export interface DisciplineMedals extends Medals {
  total?: number;
}

export interface CountryMedals {
  gold: number;
  silver: number;
  bronze: number;
  disciplines: {
    [key: string]: DisciplineMedals;
  };
}

export interface Country {
  id: number;
  name: string;
  code: string;
  flag: string;
  medals: CountryMedals;
}

export interface Discipline {
  name: string;
  icon: string;
  countries: {
    [countryCode: string]: DisciplineMedals;
  };
}
