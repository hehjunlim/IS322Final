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
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo}>
          Global Etiquette Guide
        </Link>
        
        <div className={styles.navbarMenuIcon} onClick={toggleMenu}>
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
              href="/etiquette-assistant" 
              className={`${styles.navbarLink} ${router.pathname === '/etiquette-assistant' ? styles.active : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Ask AI
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link 
              href="/projects/ai-assistant" 
              className={`${styles.navbarLink} ${router.pathname === '/projects/ai-assistant' ? styles.active : ''}`}
              onClick={() => setIsOpen(false)}
            >
              AI Assistant
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