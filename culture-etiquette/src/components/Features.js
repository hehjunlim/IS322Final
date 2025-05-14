import React from 'react';
import styles from '../styles/Benefits.module.css';

const Benefits = ({ title, benefits }) => {
  return (
    <section className={styles.benefitsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <i className={benefit.icon}></i>
              </div>
              <h3>{benefit.heading}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Example benefits data for cultural etiquette site
const culturalBenefits = [
  {
    icon: "fas fa-globe",
    heading: "Global Understanding",
    description: "Develop deeper cultural awareness and respect for diverse traditions worldwide"
  },
  {
    icon: "fas fa-handshake",
    heading: "Better Communication",
    description: "Navigate international relationships with confidence and cultural sensitivity"
  },
  {
    icon: "fas fa-briefcase",
    heading: "Professional Success",
    description: "Excel in global business environments by understanding cultural protocols"
  },
  {
    icon: "fas fa-users",
    heading: "Build Connections",
    description: "Create meaningful relationships across cultures through respectful interactions"
  },
  {
    icon: "fas fa-graduation-cap",
    heading: "Continuous Learning",
    description: "Expand your worldview through understanding different cultural perspectives"
  },
  {
    icon: "fas fa-heart",
    heading: "Show Respect",
    description: "Demonstrate genuine respect for cultural differences in all interactions"
  }
];

export default Benefits;
export { culturalBenefits };