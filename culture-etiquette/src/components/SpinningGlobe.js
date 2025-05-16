// components/SpinningGlobe.js

import React from 'react';
import styles from '../styles/SpinningGlobe.module.css';

const SpinningGlobe = ({ className }) => {
  return (
    <div className={`${styles.globeContainer} ${className || ''}`}>
      <div className={styles.globe}>
        <div className={styles.globeOverlay}></div>
        <div className={styles.globeMap}>
          {/* World map outlines - simplified SVG */}
          <svg 
            viewBox="0 0 500 500" 
            xmlns="http://www.w3.org/2000/svg"
            className={styles.worldMap}
          >
            {/* North America */}
            <path d="M110,120 Q140,100 170,110 Q190,120 195,140 Q210,160 180,170 Q150,180 140,200 Q120,210 100,190 Q90,160 110,120" 
                  fill="currentColor" opacity="0.8" />
            
            {/* South America */}
            <path d="M150,210 Q170,200 185,210 Q200,230 190,260 Q180,280 170,300 Q160,290 150,270 Q140,240 150,210" 
                  fill="currentColor" opacity="0.8" />
            
            {/* Europe */}
            <path d="M240,120 Q270,110 290,120 Q300,140 290,160 Q270,170 250,160 Q240,140 240,120" 
                  fill="currentColor" opacity="0.8" />
            
            {/* Africa */}
            <path d="M240,170 Q270,180 290,190 Q300,220 290,250 Q270,270 250,260 Q230,240 240,210 Q230,190 240,170" 
                  fill="currentColor" opacity="0.9" />
            
            {/* Asia */}
            <path d="M300,120 Q330,100 360,110 Q380,140 370,170 Q350,200 320,190 Q300,170 290,150 Q300,130 300,120" 
                  fill="currentColor" opacity="0.8" />
            
            {/* Australia */}
            <path d="M370,240 Q390,230 410,240 Q420,260 410,280 Q390,290 370,280 Q360,260 370,240" 
                  fill="currentColor" opacity="0.8" />
          </svg>
        </div>
        
        {/* Meridian lines for 3D effect */}
        <div className={`${styles.meridian} ${styles.meridian1}`}></div>
        <div className={`${styles.meridian} ${styles.meridian2}`}></div>
        <div className={`${styles.meridian} ${styles.meridian3}`}></div>
        <div className={`${styles.parallel} ${styles.parallel1}`}></div>
        <div className={`${styles.parallel} ${styles.parallel2}`}></div>
        <div className={`${styles.parallel} ${styles.parallel3}`}></div>
      </div>
      
      {/* Optional glow effect */}
      <div className={styles.glow}></div>
    </div>
  );
};

export default SpinningGlobe;