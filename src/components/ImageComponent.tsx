import React from 'react';
import '../home.css';
import { getImagePath, getImageById } from '../imageRegistry';
import LazyImage from './LazyImage';

interface ImageComponentProps {
    id: number;
    src?: string; // Optional - will auto-generate from ID if not provided
    alt?: string;
    width?: string | number;
    height?: string | number;
    customStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    className?: string;
}

function ImageComponent(props: ImageComponentProps) {
    const { 
        id, 
        src, 
        alt = 'Image', 
        width = 'auto', 
        height = 'auto',
        customStyle = {},
        containerStyle = {},
        className = ''
    } = props;
    // Get image from registry by ID, or use provided src, or fallback
    const registryImage = getImageById(id);
    const imageSrc = src || getImagePath(id);
    const imageAlt = alt !== 'Image' ? alt : (registryImage?.alt || `Image ${id}`);
    
    const defaultStyle: React.CSSProperties = {
        width: width === 'auto' ? '100%' : width,
        height: height === 'auto' ? 'auto' : height,
        maxWidth: '100%',
        objectFit: 'cover',
        borderRadius: '8px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        display: 'block'
    };

    const mergedStyle = { ...defaultStyle, ...customStyle };

    return (
        <div 
            className={`image-container ${className}`}
            style={{ 
                display: 'block', 
                margin: '10px auto',
                maxWidth: '100%',
                width: 'fit-content',
                ...containerStyle 
            }}
            data-image-id={id}
        >
            <LazyImage 
                src={imageSrc} 
                alt={imageAlt}
                style={mergedStyle}
                width={width}
                height={height}
            />
        </div>
    );
};

export default ImageComponent;
