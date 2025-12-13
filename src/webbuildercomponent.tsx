// New WebBuilderComponent: organizes all sections/components

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ImpactBoard from './components/ImpactBoard';
import VisionSection from './components/VisionSection';
import WhatWeDoSection from './components/WhatWeDoSection';
import Foundersection from './components/FoundersSection';
import GirlsList from './components/Girlslist';
import SocialMediaSection from './components/SocialMediaSection';
import ContactSection from './components/ContactSection';

// Organize all data by ID
export const webbuilderData = [
  {
    id: 'hero',
    component: HeroSection
  },
  {
    id: 'about',
    component: AboutSection
  },
  {
    id: 'impact',
    component: ImpactBoard
  },
  {
    id: 'vision',
    component: VisionSection
  },
  {
    id: 'whatwedo',
    component: WhatWeDoSection
  },
  {
    id: 'founders',
    component: Foundersection
  },
  {
    id: 'girls',
    component: GirlsList
  },
  {
    id: 'social',
    component: SocialMediaSection
  },
  {
    id: 'contact',
    component: ContactSection
  }
];
