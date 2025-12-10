import React from 'react';
import type { clientdata } from '../types';
import ImageComponent from '../components/ImageComponent';
import '../home.css'

interface HeroSectionProps {
    data: clientdata;
    defaultStyle?: React.CSSProperties;
    
}

function HeroSection({ data,  }: HeroSectionProps) {
    return (
        <div className='' style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            margin: '20px auto',
            maxWidth: '90vw',
            width: '60vw',
            minHeight: '70vh',
            boxSizing: 'border-box',
            gap: '20px'
        }}>
         <h1 className='red-box' style={{ 
             color: '#f9f7f7ff', 
             margin: '0', 
             fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
             textAlign: 'center',
             width: '100%'
         }}>
            {data.sectionsData?.heroSection?.title}
         </h1>
         <p style={{ 
             color: '#666', 
             fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', 
             textAlign: 'center',
             marginBottom: '1rem',
             width: '100%'
         }}>
            {data.sectionsData?.heroSection?.subtitle}
         </p>

         {/* Three images in a row, centered */}
         <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            width: '100%',
            maxWidth: '1600px',
            margin: '0 auto',
         }}>
            <ImageComponent 
                id={4} // left image
                alt="On the Field"
                width={300}
                height={300}
                customStyle={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 12 }}
                className='img-fluid'  
            />
            <ImageComponent 
                id={3} // center image
                alt="Hero Background" 
                width={300}
                height={300}
                customStyle={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 12, border: '3px solid #a31515' }}
                className='img-fluid'  
            />
            <ImageComponent 
                id={6} // right image
                alt="Team Fun"
                width={300}
                height={300}
                customStyle={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 12 }}
                className='img-fluid'  
            />
         </div>
                </div>
    );
}



export default HeroSection;
