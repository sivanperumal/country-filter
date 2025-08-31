import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
//import { useFetch } from "../hooks/useFetch";
import {
  fetchAllCountries,
  incrementVisibleCount,
  useCountriesList,
} from "../redux/slices/country.slice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import CountryGrid from "../components/CountryGrid";
import HomeBanner from "../components/HomeBanner";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredCountries, visibleCountries, visibleCount } =
    useCountriesList();

  const handleChangeCount = () => {
    dispatch(incrementVisibleCount());
  };

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);
  return (
    <>
      <h2 className="text-center fw-bold m-0 welcome-title">WELCOME</h2>
      <HomeBanner />

      <CountryGrid countries={visibleCountries} />

      {visibleCount < filteredCountries.length && (
        <div className="text-center mt-3">
          <Button variant="dark" onClick={handleChangeCount}>
            Load more
          </Button>
        </div>
      )}
    </>
  );
};

export default Home;
