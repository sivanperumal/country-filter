import type React from "react";
import { Nav, Navbar } from "react-bootstrap";
import {
  filteredCountryList,
  useCountriesList,
} from "../redux/slices/country.slice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { userLogout } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { selectedRegion } = useCountriesList();
  const handleChangeRegion = (region: string) => {
    dispatch(filteredCountryList(region));
  };
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };
  return (
    <Navbar bg="transparent" expand="lg" className="country-navbar">
      <Navbar.Brand>Countries</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {["All", "Asia", "Europe"].map((region) => (
            <Nav.Link
              key={region}
              active={selectedRegion === region}
              onClick={() => handleChangeRegion(region)}
            >
              {region}
            </Nav.Link>
          ))}
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
