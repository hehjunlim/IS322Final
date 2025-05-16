import React from 'react';
import styles from '../styles/ProfileAvatar.module.css';

const ProfileAvatar = ({ name, size = 'medium', className = '' }) => {
  // Generate initials from the name
  const getInitials = (name) => {
    if (!name) return '?';
    
    const names = name.trim().split(' ');
    if (names.length === 1) {
      // If only one name, return the first letter
      return names[0].charAt(0).toUpperCase();
    } else {
      // If multiple names, return first letter of first and last name
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
  };

  // Generate a consistent color based on the name
  const getAvatarColor = (name) => {
    if (!name) return '#6E57E0'; // Default color
    
    // Simple hash function to get a consistent color for each name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // List of pleasant, accessible colors
    const colors = [
      '#4F46E5', // Indigo
      '#0EA5E9', // Sky Blue
      '#10B981', // Emerald
      '#F59E0B', // Amber
      '#EF4444', // Red
      '#8B5CF6', // Violet
      '#EC4899', // Pink
      '#6366F1', // Indigo
      '#14B8A6', // Teal
      '#F97316'  // Orange
    ];
    
    // Use the hash to pick a color
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };

  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(name);
  
  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large
  };

  return (
    <div 
      className={`${styles.avatar} ${sizeClasses[size] || styles.medium} ${className}`}
      style={{ backgroundColor }}
      title={name || 'User'}
    >
      {initials}
    </div>
  );
};

export default ProfileAvatar;