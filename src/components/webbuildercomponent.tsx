import React from "react";
import MissionPage from '../pages/MissionPage';
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ImpactSection from "../pages/ImpactSection";
import WhatWeDoSection from "./WhatWeDoSection";
import VisionSection from "./VisionSection";
import ContactSection from "./ContactSection";
import  SocialMediaSection from "./SocialMediaSection";
import Foundersection from "./FoundersSection";
import ImpactBoard from "./ImpactBoard";
import GirlsList from "./Girlslist";
import MeetTheTeams from "../pages/MeetTheTeams";
type WebsiteSection = 'hero' | 'impact' | 'about' | 'founder' | 'meetTheTeams' | 'services' | 'contact' | 'social' | 'mission' | 'girls';
interface WebsiteComponentProps {
    entry: any;
    sections?: WebsiteSection[];
    customStyles?: {
        hero?: React.CSSProperties;
        founder?: React.CSSProperties;
        about?: React.CSSProperties;
        services?: React.CSSProperties;
        contact?: React.CSSProperties;
        social?: React.CSSProperties;
    };
}





const WebsiteComponent = ({ entry, customStyles = {} }: WebsiteComponentProps) => {
    if (!entry) return <div>No entry found.</div>;

    const normalizedEntry = Array.isArray(entry) ? entry[0] : entry;
    const sectionsData = normalizedEntry.sectionsData || {};
    // Debug: log the keys and values for AboutSection
    console.log('sectionsData:', sectionsData);
    console.log('AboutSection props:', {
        about: sectionsData.aboutSection || sectionsData.about,
        whatWeDo: sectionsData.WhatweDo || sectionsData.whatWeDo,
        vision: sectionsData.visionSection || sectionsData.vision
    });

    // Render in the specified order: hero, dashboard (impact), about, founders, teams
    return (
        <div style={{ maxWidth: "100%", margin: "0" }}>
            {/* Hero Section */}
            {sectionsData.heroSection && <HeroSection data={sectionsData.heroSection} />}

            {/* Dashboard / Impact Board */}
            {sectionsData.impactBoard && <ImpactBoard data={sectionsData.impactBoard} />}

            {/* About Us Section (support both data shapes) */}
            {(sectionsData.aboutSection || sectionsData.about) && (sectionsData.WhatweDo || sectionsData.whatWeDo) && (sectionsData.visionSection || sectionsData.vision) && (
                <AboutSection 
                    about={sectionsData.aboutSection || sectionsData.about}
                    whatWeDo={sectionsData.WhatweDo || sectionsData.whatWeDo}
                    vision={sectionsData.visionSection || sectionsData.vision}
                />
            )}

            {/* Founders Section */}
            {sectionsData.foundersSection && <Foundersection data={sectionsData.foundersSection} customStyle={customStyles.founder} />}

            {/* Teams Section */}
            {sectionsData.teamGallery && <MeetTheTeams data={sectionsData.teamGallery} />}
        </div>
    );
};


export default WebsiteComponent;