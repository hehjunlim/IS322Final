import React from 'react';
import styles from '../styles/ProfileButton.module.css';

const ProfileButton = ({ name, username }) => {
  // Get initials from the name
  const getInitials = () => {
    if (!name) return username ? username.charAt(0).toUpperCase() : '?';
    
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    } else {
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    }
  };

  return (
    <div className={styles.profileButton}>
      <div className={styles.avatarCircle}>
        {getInitials()}
      </div>
      {username && <span className={styles.username}>{username}</span>}
    </div>
  );
};

export default ProfileButton;