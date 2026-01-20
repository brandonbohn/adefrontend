import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Donate from './pages/donate';
import Privacy from './pages/Privacy';
import DonateTerms from './pages/DonateTerms';
import SponsorAGirl from './pages/SponsorAGirl';
import SponsoredGirls from './pages/SponsoredGirls';
import MeetTheTeams from './pages/MeetTheTeams';
import Foundersection from './components/FoundersSection';

function App() { 
  return (


    <div style={{ minHeight: '100vh', backgroundColor: '#0b0b0b' }}>
      <div style={{ paddingTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/donate-terms" element={<DonateTerms />} />
          <Route path="/sponsor-a-girl" element={<SponsorAGirl />} />
          <Route path="/sponsored-girls" element={<SponsoredGirls />} />
          <Route path="/meet-the-teams" element={<MeetTheTeams />} />
        </Routes>
      </div>
    </div>
  
  
  );
}

export default App;