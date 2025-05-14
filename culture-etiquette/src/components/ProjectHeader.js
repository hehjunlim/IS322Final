import React from 'react';
import styles from '../styles/ProjectHeader.module.css';

const ProjectHeader = ({ 
  title, 
  subtitle, 
  description, 
  regions, 
  topics, 
  lastUpdated 
}) => {
  return (
    <section className={styles.projectHeader}>
      <div className={styles.projectHeaderBackground}>
        <div className={styles.projectHeaderContainer}>
          <div className={styles.projectHeaderContent}>
            <h1 className={styles.projectTitle}>{title}</h1>
            <p className={styles.projectSubtitle}>{subtitle}</p>
          </div>
        </div>
      </div>
      
      <div className={styles.projectHeaderContainer}>
        <div className={styles.projectInfoSection}>
          <div className={styles.projectOverview}>
            <h2 className={styles.projectSectionTitle}>Guide Overview</h2>
            <p className={styles.projectDescription}>{description}</p>
          </div>
          
          <div className={styles.projectMetaGrid}>
            <div className={styles.projectMetaCard}>
              <div className={styles.projectMetaIcon}>
                <i className="fas fa-globe-americas"></i>
              </div>
              <h3>Regions Covered</h3>
              <ul className={styles.projectMetaList}>
                {regions.map((region, index) => (
                  <li key={index}>{region}</li>
                ))}
              </ul>
            </div>
            
            <div className={styles.projectMetaCard}>
              <div className={styles.projectMetaIcon}>
                <i className="fas fa-list-ul"></i>
              </div>
              <h3>Topics Included</h3>
              <ul className={styles.projectMetaList}>
                {topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
            
            <div className={styles.projectMetaCard}>
              <div className={styles.projectMetaIcon}>
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3>Last Updated</h3>
              <p className={styles.projectTimeline}>{lastUpdated}</p>
              <p className={styles.projectNote}>Regularly updated with latest cultural insights</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHeader;