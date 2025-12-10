
import type { clientdata } from "../types";
import React, { useEffect, useState } from "react";

import HeroSection from "../pages/HeroSection";
import AboutSection from "../pages/AboutSection";
import ImpactSection from "../pages/ImpactSection";
import WhatWeDoSection from "./WhatWeDoSection";
import VisionSection from "./VisionSection";
import ContactSection from "./ContactSection";
import  SocialMediaSection from "./SocialMediaSection";
import Foundersection from "./FoundersSection";
import ImpactBoard from "./ImpactBoard";

type WebsiteSection = 'hero' | 'about' | 'services' | 'contact' | 'social'| 'founder';
interface WebsiteComponentProps {

    entry: clientdata;
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

const WebsiteComponent = ({ entry, sections = ['hero', 'founder', 'about', 'services', 'contact', 'social'], customStyles = {} }: WebsiteComponentProps) => {
    if (!entry) return <div>No entry found.</div>;
    return (
        <div style={{ maxWidth: "100%", margin: "0" }}>
            {entry.sectionsData.impactBoard && (
                <ImpactBoard id={entry.sectionsData.impactBoard.id} />
            )}
            {sections.includes('hero') && (
                <HeroSection data={entry} />
            )}
            {sections.includes('founder') && (
                <Foundersection
                    customStyle={customStyles.founder}
                    // Remove id prop since foundersSection does not have an id property
                />
            )}
                        {/* Combined info: Who We Are | What We Do | Our Vision */}
                        {(entry.sectionsData.aboutSection || entry.sectionsData.WhatweDo || entry.sectionsData.visionSection) && (
                                <section aria-label="combined-info" style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                        {/* About Section */}
                                        {entry.sectionsData.aboutSection && (
                                            <div style={{ borderRadius: 12, padding: '1rem', boxShadow: '0 6px 20px rgba(0,0,0,0.25)', flex: '1 1 0', minWidth: 240, boxSizing: 'border-box' }}>
                                                <h3 style={{ margin: '0 0 0.5rem 0', fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontSize: '28px', lineHeight: 1.15 }}>{entry.sectionsData.aboutSection.title || 'Who We Are'}</h3>
                                                <div style={{ lineHeight: 1.6, fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '21px', color: '#fff' }}>{entry.sectionsData.aboutSection.description}</div>
                                            </div>
                                        )}
                                        {/* What We Do Section */}
                                        {entry.sectionsData.WhatweDo && (
                                            <div style={{ borderRadius: 12, padding: '1rem', boxShadow: '0 6px 20px rgba(0,0,0,0.25)', flex: '1 1 0', minWidth: 240, boxSizing: 'border-box' }}>
                                                <h3 style={{ margin: '0 0 0.5rem 0', fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontSize: '28px', lineHeight: 1.15 }}>{entry.sectionsData.WhatweDo.title || 'What We Do'}</h3>
                                                <div style={{ lineHeight: 1.6, fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '21px', color: '#fff' }}>{entry.sectionsData.WhatweDo.intro}</div>
                                            </div>
                                        )}
                                        {/* Vision Section */}
                                        {entry.sectionsData.visionSection && (
                                            <div style={{ borderRadius: 12, padding: '1rem', boxShadow: '0 6px 20px rgba(0,0,0,0.25)', flex: '1 1 0', minWidth: 240, boxSizing: 'border-box' }}>
                                                <h3 style={{ margin: '0 0 0.5rem 0', fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontSize: '28px', lineHeight: 1.15 }}>{entry.sectionsData.visionSection.title || 'Our Vision'}</h3>
                                                <div style={{ lineHeight: 1.6, fontFamily: 'Georgia, "Times New Roman", serif', fontSize: '21px', color: '#fff' }}>{entry.sectionsData.visionSection.description}</div>
                                            </div>
                                        )}
                                    </div>
                                    <style>{`
                                        @media (max-width: 760px) {
                                            section[aria-label="combined-info"] > div { flex-direction: column; }
                                            section[aria-label="combined-info"] h3 { font-size: 22px !important; }
                                            section[aria-label="combined-info"] div { font-size: 18px !important; }
                                        }
                                    `}</style>
                                </section>
                        )}
            {sections.includes('contact') && (
                <ContactSection id={entry.id} customStyle={customStyles.contact} />
            )}
            {sections.includes('social') && (
                <SocialMediaSection id={entry.id} customStyle={customStyles.social} />
            )}
        </div>
    );
};


export default WebsiteComponent;