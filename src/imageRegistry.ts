// Image Registry - Map IDs to actual filenames in your public folder
export interface ImageRegistryItem {
    id: number;
    filename: string;
    alt?: string;
    description?: string;
}

export const imageRegistry: ImageRegistryItem[] = [
    {
        id: 1,
        filename: "teamphoto.jpeg",
        alt: "Team Photo",
        description: "Main hero background"
    },
    {
        id: 2,
        filename: "ADEFCbackground.jpg",
        alt: "Background",
        description: "Site background image"
    },
    {
        id: 3,
        filename: "playingtime.jpeg",
        alt: "Soccer Photo",
        description: "Soccer game in progress"
    },
    {
        id: 4,
        filename: "onthefield.jpeg",
        alt: "On the Field",
        description: "Players on the field"
    },
    {
        id: 5,
        filename: "playingtime.jpeg",
        alt: "Playing Time",
        description: "Game in progress"
    },
    {
        id: 6,
        filename: "Teamfun (1).jpeg",
        alt: "Team Fun",
        description: "Team having fun"
    },
    {
        id: 7,
        filename: "thechampions.jpeg",
        alt: "Champions",
        description: "Champions photo"
    },
    {
        id: 8,
        filename: "theplayers.jpeg",
        alt: "Players",
        description: "Players group photo"
    },
    { id: 9, filename: "ade2018.jpeg", alt: "ADE 2018", description: "ADE 2018 event photo" },
    { id: 10, filename: "blueteam.jpeg", alt: "Blue Team", description: "Blue team group photo" },
    { id: 11, filename: "donations.jpeg", alt: "Donations", description: "Donations event photo" },
    { id: 12, filename: "donationsandreality.jpeg", alt: "Donations and Reality", description: "Donations and reality photo" },
    { id: 13, filename: "grassphono.jpeg", alt: "Grass Phono", description: "Grass phono photo" },
    { id: 14, filename: "greenteam.jpeg", alt: "Green Team", description: "Green team group photo" },
    { id: 15, filename: "kidsandyellowhouse.jpeg", alt: "Kids and Yellow House", description: "Kids and yellow house photo" },
    { id: 16, filename: "onthedirt.jpeg", alt: "On the Dirt", description: "Players on the dirt field" },
    { id: 17, filename: "successtory.jpeg", alt: "Success Story", description: "Success story photo" },
    { id: 18, filename: "teamandcoaches.jpeg", alt: "Team and Coaches", description: "Team and coaches group photo" },
    { id: 19, filename: "teamhuddle.jpeg", alt: "Team Huddle", description: "Team huddle photo" },
    { id: 20, filename: "teammix.jpeg", alt: "Team Mix", description: "Team mix group photo" },
    { id: 21, filename: "teamphotoonthefield.jpeg", alt: "Team Photo on Field", description: "Team photo on the field" },
    { id: 22, filename: "trophyceremony.jpeg", alt: "Trophy Ceremony", description: "Trophy ceremony photo" },
    { id: 23, filename: "twogirls.jpeg", alt: "Two Girls", description: "Two girls photo" },
    { id: 24, filename: "whiteteam.jpeg", alt: "White Team", description: "White team group photo" },
    { id: 31, filename: "placeholder.jpg", alt: "Founder Placeholder", description: "Placeholder for founder image" },
    { id: 32, filename: "placeholder.jpg", alt: "Founder Placeholder", description: "Placeholder for founder image" },

    
    // Add more images here as needed
    // {
    //     id: 10,
    //     filename: "your-image-name.jpg",
    //     alt: "Description",
    //     description: "Optional description"
    // }
];


export const getImageById = (id: number): ImageRegistryItem | undefined => {
    return imageRegistry.find(image => image.id === id);
};


export const getImagePath = (id: number): string => {
    const image = getImageById(id);
    return image ? `/${image.filename}` : `/placeholder.jpg`;
};
