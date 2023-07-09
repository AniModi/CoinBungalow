import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import LandingPage from './containers/LandingPage';
import HouseListPage from './containers/HouseListPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/buy-houses" element={<HouseListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
