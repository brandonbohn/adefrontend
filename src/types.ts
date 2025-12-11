export interface VisionSection {
    title: string;
    description: string;
}
export interface WhatWeDo {
    intro: ReactNode;
    title: string;
    education: string;
    lifeSupport: {
        title: string;
        items: string[];
    };
    mentorship: {
        title: string;
        description: string;
        items?: string[];
    };
}
export interface clientdata {
    id: number;
    image: string;
    imageUrl?: string;
    title: string;
    date?: string;
    sections: string[];
    about?: {
        title?: string;
        description?: string;
    };
    sectionsData: {
        heroSection?: {
            title?: string;
            subtitle?: string;
        };
        foundersSection?: {
            title?: string;
            founders: {
                name: string;
                role: string;
                image?: string | number;
                bio: string;
            }[];
            sections?: any[];
        };
        aboutSection?: {
            title?: string;
            description?: string;
            teamGallery?: { src: string; alt: string }[];
        };
        servicesSection?: {
            title?: string;
            items?: string[];
        };
        socialSection?: {
            title?: string;
            links?: { name: string; url: string }[];
        };
        ourMission?: {
            title?: string;
            description?: string;
        };
        ourImpact?: {
            title?: string;
            description?: string;
        };
        visionSection?: VisionSection;
        WhatweDo?: WhatWeDo;
        impactBoard?: any;
    };
}