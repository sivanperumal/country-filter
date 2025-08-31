export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  image: string;
  role: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | unknown;
}

export interface Country {
  name: string;
  region: string;
  flag: string;
}

export interface CountryState {
  countries: Country[];
  selectedRegion: string;
  filteredCountries: Country[];
  visibleCountries: Country[];
  visibleCount: number;
  loading: boolean;
  error: string | unknown;
}
