import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WebsiteComponent from '../components/webbuildercomponent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/AboutSection';
import Foundersection from '../components/FoundersSection';
import MeetTheTeams from './MeetTheTeams';
import type { clientdata } from '../types';

const Home: React.FC = () => {
  const [entry, setEntry] = useState<clientdata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:3000/api/content')
      .then(res => {
        console.log('Backend data:', res.data); // Inspect backend response
        setEntry(res.data as clientdata);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load site content.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign:'center',margin:'2rem'}}>Loading...</div>;
  if (error) return <div style={{textAlign:'center',margin:'2rem',color:'#d32f2f'}}>{error}</div>;
  if (!entry) return null;

  return (
    <>
      <Header />
      <WebsiteComponent entry={entry} />
      {/* Render Meet the Teams section below About grid */}
      <div style={{ margin: '2.5rem auto 1.5rem auto', maxWidth: 1200, width: '100%' }}>
        <MeetTheTeams />
      </div>
      <Footer />
    </>
  );
};

export default Home;