import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Global Etiquette Guide</h3>
            <p className={styles.footerDescription}>
              Your comprehensive resource for understanding cultural etiquette and customs from around the world.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/projects">Cultural Guides</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Free Resources</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="#">Cultural Etiquette Quick Reference</Link></li>
              <li><Link href="#">International Business Protocol Guide</Link></li>
              <li><Link href="#">Dining Customs Worldwide</Link></li>
              <li><Link href="#">Language & Gestures Guide</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            &copy; {currentYear} Global Etiquette Guide. All rights reserved.
          </p>
          <div className={styles.footerSocialLinks}>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;