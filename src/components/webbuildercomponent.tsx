import React from "react";

import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ImpactSection from "../pages/ImpactSection";
import WhatWeDoSection from "./WhatWeDoSection";
import VisionSection from "./VisionSection";
import ContactSection from "./ContactSection";
import  SocialMediaSection from "./SocialMediaSection";
import Foundersection from "./FoundersSection";
import ImpactBoard from "./ImpactBoard";
import GirlsList, { GirlsListProps } from "./Girlslist";

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

import MissionPage from '../pages/MissionPage';

const WebsiteComponent = ({ entry, sections = ['hero', 'impact', 'about', 'founder', 'meetTheTeams'], customStyles = {} }: WebsiteComponentProps) => {
    if (!entry) return <div>No entry found.</div>;

    // Extract mission from MissionPage logic
    const mission = entry.sectionsData?.mission || entry.mission || entry.sectionsData?.ourMission || entry.ourMission || { title: 'Our Mission', description: '' };

    const sectionComponents: Record<string, React.ReactNode> = {
        hero: (
            <HeroSection data={{ ...(entry.sectionsData?.heroSection || entry.heroSection), mission }} />
        ),
        impact: (
            <ImpactBoard />
        ),
        about: null,
        founder: (
            <Foundersection customStyle={customStyles.founder} />
        ),
        meetTheTeams: null, // Prevent duplicate rendering of AboutSection/teams
        services: (
            <WhatWeDoSection data={entry.sectionsData?.WhatweDo || entry.WhatweDo} customStyle={customStyles.services} />
        ),
        contact: (
            <ContactSection data={entry.sectionsData?.contactSection || entry.contactSection} customStyle={customStyles.contact} />
        ),
        social: (
            <SocialMediaSection data={entry.sectionsData?.socialSection || entry.socialSection} customStyle={customStyles.social} />
        ),
        mission: (
            <VisionSection data={entry.sectionsData?.visionSection || entry.visionSection} />
        ),
        girls: (
            <GirlsList data={entry.sectionsData?.girlsSection || entry.girlsSection} />
        ),
    };

    return (
        <div style={{ maxWidth: "100%", margin: "0" }}>

            {/* Render hero section first */}
            {sectionComponents['hero']}

            {/* Render ImpactBoard immediately after hero */}
            {sectionComponents['impact']}

            {/* Dedicated section: three black boxes horizontally aligned, after ImpactBoard */}
            {(entry.sectionsData?.aboutSection || entry.sectionsData?.WhatweDo || entry.sectionsData?.visionSection) && (
                <section aria-label="who-we-are-grid" style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
                    <AboutSection data={{
                        title: entry.sectionsData?.aboutSection?.title || "",
                        intro: entry.sectionsData?.aboutSection?.intro || "",
                        description: entry.sectionsData?.aboutSection?.description || "",
                        WhatweDo: entry.sectionsData?.aboutSection?.WhatweDo || entry.sectionsData?.WhatweDo || {
                            title: "",
                            intro: "",
                            sections: [],
                            boxStyle: {},
                            education: "",
                            lifeSupport: { title: "", items: [] },
                            mentorship: { title: "", description: "", items: [] }
                        },
                        visionSection: entry.sectionsData?.aboutSection?.visionSection || entry.sectionsData?.visionSection || {
                            title: "",
                            description: "",
                            boxStyle: {}
                        },
                        sections: entry.sectionsData?.aboutSection?.sections || [],
                        boxStyle: entry.sectionsData?.aboutSection?.boxStyle || {}
                    }} customStyle={customStyles.about} />

                </section>
            )}

            {/* Render remaining sections except hero, impact, meetTheTeams, and girls (to avoid duplicate dashboard, teams/about and remove girls from front page) */}
            {sections.filter(s => s !== 'hero' && s !== 'impact' && s !== 'meetTheTeams' && s !== 'girls').map(section => (
                <React.Fragment key={section}>
                    {sectionComponents[section]}
                </React.Fragment>
            ))}
        </div>
    );
};


export default WebsiteComponent;