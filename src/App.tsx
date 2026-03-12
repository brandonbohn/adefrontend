import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Donate from './pages/donate';
import Privacy from './pages/Privacy';
import DonateTerms from './pages/DonateTerms';
import SponsorAGirl from './pages/SponsorAGirl';
import SponsoredGirls from './pages/SponsoredGirls';
import SponsorshipForm from './pages/SponsorshipForm';
import MeetTheTeams from './pages/MeetTheTeams';
import DonationSuccess from './pages/DonationSuccess';
import DonationError from './pages/DonationError';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() { 
  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 100 }}>
        <Header />
      </div>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/donate-terms" element={<DonateTerms />} />
          <Route path="/sponsor-a-girl" element={<SponsorAGirl />} />
          <Route path="/sponsored-girls" element={<SponsoredGirls />} />
          <Route path="/sponsorship-form" element={<SponsorshipForm />} />
          <Route path="/meet-the-teams" element={<MeetTheTeams />} />
          <Route path="/donation-error" element={<DonationError />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;