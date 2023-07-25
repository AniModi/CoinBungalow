import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import LandingPage from './containers/LandingPage';
import HouseListPage from './containers/HouseListPage.jsx';
import LandListPage from './containers/LandListPage';
import { useEffect } from 'react';
import InvestPage from './containers/InvestPage';
import SellHouseForm from './containers/SellHouseForm';
import MyNFTPage from './containers/MyNFTPage';
// wagmi ---
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  polygonMumbai, hardhat, sepolia
} from 'wagmi/chains';
import ProfileDashBoard from './containers/ProfileDashBaord';
import ProfileOffers from './components/ProfileOffers';
import ProfilePendingLoans from './containers/ProfilePendingLoans';
import ProfileLoanActions from './containers/ProfileLoanActions';
import ProfilePropertyActions from './containers/ProfilePropertyActions';
import MyCardDetailPage from './containers/MyCardDetailPage';
import BuyCardDetailPage from './containers/BuyCardDetailPage';
import LoanCardDetailPage from './containers/LoanCardDetailPage';
import DAOPage from './containers/DAOPage';
import AllDAOPage from './containers/AllDAOPage';
import ProposalDetailPage from './assets/styles/containers/ProposalDetailPage';
import PropertyProposalDetailPage from './assets/styles/containers/PropertyProposalDetailPage';
const { chains, publicClient } = configureChains(
  [sepolia],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'CB',
  projectId: 'cbabb06b3a049fce0e9231318d94998e',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
// ----

function App() {
  const {pathname} = useLocation();
  useEffect(() => {
    document.body.scrollTo(0, 0);
  }, [pathname]);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
      <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/buy-house" element={<HouseListPage />} />
      <Route exact path="/sell-house" element={<MyNFTPage />} />
      <Route exact path="/my-nfts" element={<MyNFTPage />} />
      <Route exact path="/buy-land" element={<LandListPage />} />
      <Route exact path="/sell-land" element={<MyNFTPage />} />
      <Route exact path="/lend" element={<InvestPage />} />
      <Route exact path="/borrow" element={<MyNFTPage />} />
      <Route exact path="/add-nft" element={<SellHouseForm />} />
      <Route exact path="/profile/dashboard" element={<ProfileDashBoard />} />
      <Route exact path="/profile/offers" element={<ProfileOffers />} />
      <Route exact path="/profile/pending-loans" element={<ProfilePendingLoans />} />
      <Route exact path="/profile/loan-actions" element={<ProfileLoanActions />} />
      <Route exact path="/profile/property-actions" element={<ProfilePropertyActions />} />
      <Route exact path="/my-nfts/:id" element={<MyCardDetailPage />} />
      <Route exact path="/buy/:id" element={<BuyCardDetailPage />} />
      <Route exact path="/lend/:id" element={<LoanCardDetailPage />} />
      <Route exact path="/dao/" element={<AllDAOPage />} />
      <Route exact path="/dao/:hash/:id" element={<DAOPage />} />
      <Route exact path="/dao/:id/proposal/:id" element={<ProposalDetailPage />} />
      <Route exact path="/dao/:id/propertyProposal/:id" element={<PropertyProposalDetailPage />} />
      </Routes>
      </RainbowKitProvider>
    </WagmiConfig >
  );
}

export default App;
