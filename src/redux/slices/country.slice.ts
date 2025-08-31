import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CountryState } from "../../interface";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const initialState: CountryState = {
  countries: [],
  selectedRegion: "All",
  filteredCountries: [],
  visibleCountries: [],
  visibleCount: 8,
  loading: false,
  error: null,
};
export const fetchAllCountries = createAsyncThunk(
  "fetch/countries",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v2/all?fields=name,region,flag`
      );
      return res.data;
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    filteredCountryList: (state, action) => {
      state.selectedRegion = action.payload;
      state.filteredCountries =
        state.selectedRegion === "All"
          ? state.countries
          : state.countries.filter(
              (country) => country.region === action.payload
            );
      state.visibleCountries = state.filteredCountries.slice(
        0,
        state.visibleCount
      );
    },
    incrementVisibleCount: (state) => {
      state.visibleCount = state.visibleCount + 6;
      state.visibleCountries = state.filteredCountries.slice(
        0,
        state.visibleCount
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.filteredCountries = action.payload;
        state.visibleCountries = state.filteredCountries.slice(
          0,
          state.visibleCount
        );
        state.selectedRegion = "All";
        state.loading = false;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { filteredCountryList, incrementVisibleCount } =
  countrySlice.actions;
export default countrySlice.reducer;

export const useCountriesList = () => {
  const countryObj = useSelector((state: RootState) => {
    return state.country;
  });
  return { ...countryObj };
};
