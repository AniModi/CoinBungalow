import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import LandingPage from './containers/LandingPage';
import HouseListPage from './containers/HouseListPage.jsx';
import LandListPage from './containers/LandListPage';
import { useEffect } from 'react';
import InvestPage from './containers/InvestPage';
import SellHouseForm from './containers/SellHouseForm';
import MyNFTPage from './containers/MyNFTPage';

function App() {
  const {pathname} = useLocation();
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, [pathname]);
  return (
      <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/buy-house" element={<HouseListPage />} />
      <Route exact path="/sell-house" element={<MyNFTPage />} />
      <Route exact path="/my-nfts" element={<MyNFTPage />} />
      <Route exact path="/buy-land" element={<LandListPage />} />
      <Route exact path="/sell-land" element={<MyNFTPage />} />
      <Route exact path="/lend" element={<InvestPage />} />
      <Route exact path="/borrow" element={<InvestPage />} />
      <Route exact path="/add-nft" element={<SellHouseForm />} />
      </Routes>
  );
}

export default App;
