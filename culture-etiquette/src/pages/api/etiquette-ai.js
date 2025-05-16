import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SimpleEtiquetteAI from '../../components/SimpleEtiquetteAIEmbed';
import styles from '../../styles/EtiquettePage.module.css';

export default function AIChatPage() {
  return (
    <>
      <Head>
        <title>Cultural Etiquette AI Chat | Global Etiquette Guide</title>
        <meta name="description" content="Get instant answers to your cultural etiquette questions with our AI assistant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>

      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <h1 className={styles.styleTitle}>
              <span className={styles.bracketLeft}>{'{ '}</span>
              CULTURAL ETIQUETTE AI CHAT
              <span className={styles.bracketRight}>{' }'}</span>
            </h1>
            <p>Ask questions about customs and etiquette from around the world</p>
          </div>
          
          <div className={styles.assistantContainer} id="chatContainer">
            <SimpleEtiquetteAI />
          </div>
          
          <div className={styles.featuresList}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <i className="fas fa-globe"></i>
              </div>
              <div className={styles.featureContent}>
                <h3>Global Coverage</h3>
                <p>Get etiquette advice for over 50 countries and cultural regions</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <i className="fas fa-check-circle"></i>
              </div>
              <div className={styles.featureContent}>
                <h3>Appropriateness Check</h3>
                <p>Instantly see if your planned actions are appropriate in a specific culture</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className={styles.featureContent}>
                <h3>Personalized Advice</h3>
                <p>Receive tailored guidance based on your interests and needs</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}