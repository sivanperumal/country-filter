import type React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const MainLayout: React.FC = () => {
  return (
    <Container>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};
export default MainLayout;
