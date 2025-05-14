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

export default Benefits;