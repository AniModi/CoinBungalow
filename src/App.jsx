import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import LandingPage from './containers/LandingPage';
import HouseListPage from './containers/HouseListPage.jsx';
import LandListPage from './containers/LandListPage';
import { useEffect } from 'react';

function App() {
  const {pathname} = useLocation();
  useEffect(() => {
    document.body.scrollTo(0, 0);
    console.log(pathname);
  }, [pathname]);
  return (
      <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/buy-house" element={<HouseListPage />} />
      <Route exact path="/buy-land" element={<LandListPage />} />
      </Routes>
  );
}

export default App;
