import { create } from 'zustand';
import { Country } from '../data/countries';

interface CountryState {
  search: string;
  selected?: Country;
  setSearch: (search: string) => void;
  setSelected: (country?: Country) => void;
}

export const useCountryStore = create<CountryState>((set) => ({
  search: '',
  selected: undefined,
  setSearch: (search) => set({ search }),
  setSelected: (country) => set({ selected: country }),
}));
