import type React from "react";
import { useCountriesList } from "../redux/slices/country.slice";
import { Row, Col, Carousel } from "react-bootstrap";
import FrameIcon from "./../assets/frame-icon.png";

const HomeBanner: React.FC = () => {
  const { countries } = useCountriesList();
  return (
    <Row className="mb-4 homebanner-row">
      <Col md={9} xs={12}>
        <Carousel>
          {countries.slice(0, 5).map((country) => (
            <Carousel.Item
              key={country.name}
              style={{
                backgroundColor: "#F0F0F0",
                border: "2px solid #3D3D3D",
                borderRadius: "2px",
                height: "480px",
                textAlign: "center",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "16px",
                  }}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      {/* Right Frame (hidden on mobile) */}
      <Col md={3} className="d-none d-md-block">
        <div
          className="h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "#F0F0F0",
            border: "2px solid #3D3D3D",
            borderRadius: "2px",
            textAlign: "center",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <img
              src={FrameIcon}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "16px",
              }}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default HomeBanner;
