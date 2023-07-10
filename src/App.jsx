import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import LandingPage from './containers/LandingPage';
import HouseListPage from './containers/HouseListPage.jsx';
import LandListPage from './containers/LandListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/buy-house" element={<HouseListPage />} />
      <Route exact path="/buy-land" element={<LandListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
