import type React from "react";
import type { Country } from "../interface";
import { useCountriesList } from "../redux/slices/country.slice";
import { Row, Col, Card, Spinner } from "react-bootstrap";
export type countryListProps = {
  countries: Country[];
};
const CountryGrid: React.FC<countryListProps> = (props) => {
  const { countries } = props;
  const { loading } = useCountriesList();
  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {countries &&
            countries?.map((country) => (
              <Col key={country.name} xs={12} md={6} className="mb-3">
                <Card className="h-100 shadow-sm country-card">
                  <Row className="g-0 align-items-center">
                    <Col xs={3}>
                      <Card.Img
                        src={country.flag}
                        alt={country.name}
                        style={{ height: "60px", objectFit: "cover" }}
                      />
                    </Col>
                    <Col xs={9}>
                      <Card.Body>
                        <Card.Title>{country.name}</Card.Title>
                        <Card.Text>{country.region}</Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};
export default CountryGrid;
