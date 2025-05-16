import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileAvatar from '../components/ProfileAvatar';
import styles from '../styles/Profile.module.css';

export default function Profile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [profileCreated, setProfileCreated] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    // Load user profile
    const profile = localStorage.getItem('userProfile');
    const createdAt = localStorage.getItem('profileCreatedAt');
    
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setUserProfile(parsedProfile);
      setEditedName(parsedProfile.name || '');
      
      if (createdAt) {
        const date = new Date(createdAt);
        setProfileCreated(date.toLocaleDateString());
      }
    } else {
      // Redirect if no profile exists
      router.push('/profile-setup');
    }
  }, [router]);

  const handleSaveEdit = () => {
    if (editedName.trim()) {
      const updatedProfile = { ...userProfile, name: editedName.trim() };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!userProfile) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Your Profile | Global Etiquette Guide</title>
        <meta name="description" content="Manage your Global Etiquette Guide profile" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>

      <Navbar />
      
      <main className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <ProfileAvatar name={userProfile.name} size="large" className={styles.profileAvatar} />
            
            <div className={styles.profileNameSection}>
              {isEditing ? (
                <div className={styles.editNameForm}>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className={styles.nameInput}
                    placeholder="Your name"
                    autoFocus
                  />
                  <div className={styles.editButtons}>
                    <button 
                      onClick={handleSaveEdit}
                      className={styles.saveButton}
                      disabled={!editedName.trim()}
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        setEditedName(userProfile.name);
                      }}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className={styles.profileName}>
                    {userProfile.name}
                    <button 
                      onClick={() => setIsEditing(true)}
                      className={styles.editButton}
                      aria-label="Edit name"
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </h1>
                  {profileCreated && (
                    <p className={styles.profileDate}>
                      Profile created: {profileCreated}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className={styles.profileActions}>
            <button 
              onClick={() => router.push('/etiquette-assistant')}
              className={styles.actionButton}
            >
              <i className="fas fa-comments"></i>
              Ask AI Assistant
            </button>
            <button 
              onClick={() => router.push('/profile-setup')}
              className={styles.actionButton}
            >
              <i className="fas fa-user-edit"></i>
              Edit Full Profile
            </button>
          </div>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <h2><i className="fas fa-user"></i> Profile Details</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.profileDetail}>
                <span className={styles.detailLabel}>Name:</span>
                <span className={styles.detailValue}>{userProfile.name}</span>
              </div>
              <div className={styles.profileDetail}>
                <span className={styles.detailLabel}>Primary Purpose:</span>
                <span className={styles.detailValue}>{userProfile.purpose || 'Not specified'}</span>
              </div>
              <div className={styles.profileDetail}>
                <span className={styles.detailLabel}>Travel Frequency:</span>
                <span className={styles.detailValue}>{userProfile.travelFrequency || 'Not specified'}</span>
              </div>
              <div className={styles.profileDetail}>
                <span className={styles.detailLabel}>Primary Concern:</span>
                <span className={styles.detailValue}>{userProfile.primaryConcern || 'Not specified'}</span>
              </div>
              <div className={styles.profileDetail}>
                <span className={styles.detailLabel}>Experience Level:</span>
                <span className={styles.detailValue}>{userProfile.experienceLevel || 'Not specified'}</span>
              </div>
              <div className={styles.profileDetail}>
                <span className={styles.detailLabel}>Learning Style:</span>
                <span className={styles.detailValue}>{userProfile.preferredLearning || 'Not specified'}</span>
              </div>
            </div>
          </div>

          <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <h2><i className="fas fa-globe"></i> Cultural Interests</h2>
            </div>
            <div className={styles.cardContent}>
              {userProfile.interestedCultures?.length > 0 ? (
                <div className={styles.cultureTagsContainer}>
                  {userProfile.interestedCultures.map((culture, index) => (
                    <span key={index} className={styles.cultureTag}>
                      {culture}
                    </span>
                  ))}
                </div>
              ) : (
                <p className={styles.noDataMessage}>No cultural interests specified</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.profileSuccessMessage}>
          <div className={styles.successIcon}>
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>Profile Successfully Created!</h2>
          <p>
            Your personalized cultural etiquette experience is ready.
            Use the AI assistant to get customized advice tailored to your interests.
          </p>
          <button 
            onClick={() => router.push('/ai-assistant')}
            className={styles.successButton}
          >
            Try the AI Assistant Now
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}