import "@fontsource/noto-sans";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, HashRouter as Router, Routes } from "react-router";
import SignIn from "./pages/Authentication/SignIn";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { useEffect } from "react";
import {
  fetchLoginUser,
  fetchTokensFromStorage,
  refreshToken,
} from "./redux/slices/auth.slice";
import MainLayout from "./components/MainLayout";
function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTokensFromStorage());
    dispatch(fetchLoginUser())
      .unwrap()
      .catch(() => {
        dispatch(refreshToken()).then(() => {
          dispatch(fetchLoginUser());
        });
      });
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/countries" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
