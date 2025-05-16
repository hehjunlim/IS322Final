import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import ProfileAvatar from './ProfileAvatar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Load user profile from localStorage
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
    
    // Clean up function to ensure menu is closed and body scroll is enabled when component unmounts
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  // Add/remove 'menu-open' class on body when menu state changes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo}>
          <span className={styles.navbarLogoSymbol}>{ }</span>
          <span className={styles.navbarLogoText}>Global Etiquette</span>
        </Link>
        
        <div className={styles.navbarMenuIcon} onClick={toggleMenu} aria-label="Toggle menu">
          <div className={`${styles.navbarBar} ${isOpen ? styles.change : ''}`}></div>
          <div className={`${styles.navbarBar} ${isOpen ? styles.change : ''}`}></div>
          <div className={`${styles.navbarBar} ${isOpen ? styles.change : ''}`}></div>
        </div>
        
        <ul className={`${styles.navbarMenu} ${isOpen ? styles.active : ''}`}>
          <li className={styles.navbarItem}>
            <Link 
              href="/" 
              className={`${styles.navbarLink} ${router.pathname === '/' ? styles.active : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link 
              href="/ai-assistant" 
              className={`${styles.navbarLink} ${router.pathname === '/ai-assistant' ? styles.active : ''}`}
              onClick={() => setIsOpen(false)}
            >
              AI Chat
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link 
              href="/profile-setup" 
              className={`${styles.navbarLink} ${router.pathname === '/profile-setup' ? styles.active : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Setup Profile
            </Link>
          </li>
          
          {userProfile && (
            <li className={`${styles.navbarItem} ${styles.profileItem}`}>
              <Link 
                href="/profile" 
                className={`${styles.profileLink} ${router.pathname === '/profile' ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <ProfileAvatar name={userProfile.name} size="small" />
                <span className={styles.profileName}>{userProfile.name}</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;