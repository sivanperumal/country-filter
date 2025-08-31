import type React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

const MainLayout: React.FC = () => {
  return (
    <Container className="px-4 px-md-0">
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};
export default MainLayout;
