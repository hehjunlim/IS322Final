import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import SimpleEtiquetteAIEmbed from '../components/SimpleEtiquetteAIEmbed';
import SpinningGlobe from '../components/SpinningGlobe';

export default function Home() {
  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation for elements
    setIsVisible(true);
    
    // Check if user has completed profile setup
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      try {
        const parsedProfile = JSON.parse(profile);
        setUserProfile(parsedProfile);
        setUserName(parsedProfile.name || 'Friend');
      } catch (error) {
        console.error('Error parsing user profile:', error);
      }
    }
  }, []);

  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Global Etiquette Guide | Master Cultural Customs Worldwide</title>
        <meta name="description" content="Learn cultural etiquette, customs, and social norms from around the world to navigate international interactions with confidence." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section with Spinning Globe */}
        <section className={styles.homeHero}>
          <div className={styles.globeBackdrop}></div>
          <div className={styles.globalContainer}>
            <div className={`${styles.homeHeroContent} ${isVisible ? styles.visible : ''}`}>
              <div className={styles.heroLayout}>
                <div className={styles.heroText}>
                  <h1 className={styles.homeHeroTitle}>
                    {userProfile ? `Welcome back, ${userName}!` : 'Master Global Etiquette'}
                  </h1>
                  <p className={styles.homeHeroDescription}>
                    Navigate cultural customs with confidence. Learn proper etiquette for business,
                    social, and travel situations across different cultures worldwide.
                  </p>
                  <div className={styles.heroButtons}>
                    {!userProfile ? (
                      <Link href="/profile-setup" className={styles.btnPrimary}>
                        Get Started - Set Up Profile
                      </Link>
                    ) : (
                      <Link href="/ai-assistant" className={styles.btnPrimary}>
                        Ask the AI Assistant
                      </Link>
                    )}
                  </div>
                </div>
                <div className={styles.heroGlobe}>
                  <SpinningGlobe />
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated arrow indicator */}
          <div className={styles.scrollIndicator}>
            <div className={styles.chevron}></div>
            <div className={styles.chevron}></div>
            <div className={styles.chevron}></div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className={styles.homeStatsSection}>
          <div className={styles.patternOverlay}></div>
          <div className={styles.globalContainer}>
            <h2 className={styles.homeSectionTitle}>
              Why Cultural Etiquette Matters
              <span className={styles.titleAccent}></span>
            </h2>
            <div className={styles.homeStatsGrid}>
              <div className={styles.homeStatCard}>
                <div className={styles.statIcon}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className={styles.homeStatNumber}>85%</h3>
                <p className={styles.homeStatText}>of business deals fail due to cultural misunderstandings</p>
              </div>
              <div className={styles.homeStatCard}>
                <div className={styles.statIcon}>
                  <i className="fas fa-plane-departure"></i>
                </div>
                <h3 className={styles.homeStatNumber}>1.4B</h3>
                <p className={styles.homeStatText}>international travelers annually need cultural guidance</p>
              </div>
              <div className={styles.homeStatCard}>
                <div className={styles.statIcon}>
                  <i className="fas fa-users"></i>
                </div>
                <h3 className={styles.homeStatNumber}>73%</h3>
                <p className={styles.homeStatText}>of professionals work with international colleagues</p>
              </div>
            </div>
            <p className={styles.homeAuthorityText}>
              Our comprehensive guides help you avoid cultural faux pas and build meaningful
              cross-cultural relationships in business and personal settings.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.homeFeaturesSection}>
          <div className={styles.globalContainer}>
            <h2 className={styles.homeSectionTitle}>
              How We Help You
              <span className={styles.titleAccent}></span>
            </h2>
            <div className={styles.homeFeaturesGrid}>
              <div className={styles.homeFeatureCard}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-comments"></i>
                </div>
                <h3>AI Etiquette Assistant</h3>
                <p>Get instant answers to your cultural etiquette questions with our AI-powered assistant.</p>
                <div className={styles.featureHighlight}></div>
              </div>

              <div className={styles.homeFeatureCard}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-book-open"></i>
                </div>
                <h3>Comprehensive Guides</h3>
                <p>In-depth cultural guides covering business, social, and dining etiquette worldwide.</p>
                <div className={styles.featureHighlight}></div>
              </div>

              <div className={styles.homeFeatureCard}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-user-cog"></i>
                </div>
                <h3>Personalized Learning</h3>
                <p>Customize your experience based on your travel plans and cultural interests.</p>
                <div className={styles.featureHighlight}></div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className={styles.aiAssistantSection}>
          <div className={styles.globalContainer}>
            <h2 className={styles.homeSectionTitle}>
              Try Our AI Assistant
              <span className={styles.titleAccent}></span>
            </h2>
            <p className={styles.assistantDescription}>
              Ask any cultural etiquette question and get instant guidance
            </p>
            <div className={styles.assistantWrapper}>
              <SimpleEtiquetteAIEmbed />
              {!userProfile && (
                <div className={styles.assistantCallout}>
                  <p>Want to save your conversations and get personalized advice?</p>
                  <Link href="/profile-setup" className={styles.btnPrimary}>
                    Create Your Profile
                  </Link>
                </div>
              )}
              {userProfile && (
                <div className={styles.assistantCallout}>
                  <p>View your conversation history and get more personalized guidance</p>
                  <Link href="/ai-assistant" className={styles.btnPrimary}>
                    Go to Full AI Chat
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Common Etiquette Scenarios */}
        <section className={styles.scenariosSection}>
          <div className={styles.globalContainer}>
            <h2 className={styles.homeSectionTitle}>
              Popular Etiquette Topics
              <span className={styles.titleAccent}></span>
            </h2>
            <div className={styles.topicsGrid}>
              <div className={styles.topicCard}>
                <i className="fas fa-handshake"></i>
                <h3>Business Meetings</h3>
                <p>Greetings, punctuality, and meeting protocols</p>
                <div className={styles.topicHighlight}></div>
              </div>
              <div className={styles.topicCard}>
                <i className="fas fa-utensils"></i>
                <h3>Dining Etiquette</h3>
                <p>Table manners and meal customs worldwide</p>
                <div className={styles.topicHighlight}></div>
              </div>
              <div className={styles.topicCard}>
                <i className="fas fa-gift"></i>
                <h3>Gift Giving</h3>
                <p>Appropriate gifts and presentation customs</p>
                <div className={styles.topicHighlight}></div>
              </div>
              <div className={styles.topicCard}>
                <i className="fas fa-comments"></i>
                <h3>Communication</h3>
                <p>Verbal and non-verbal communication norms</p>
                <div className={styles.topicHighlight}></div>
              </div>
              <div className={styles.topicCard}>
                <i className="fas fa-mosque"></i>
                <h3>Religious Sites</h3>
                <p>Respectful behavior at sacred places</p>
                <div className={styles.topicHighlight}></div>
              </div>
              <div className={styles.topicCard}>
                <i className="fas fa-users"></i>
                <h3>Social Gatherings</h3>
                <p>Party etiquette and social interactions</p>
                <div className={styles.topicHighlight}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <section className={styles.homeCtaSection}>
          <div className={styles.ctaPattern}></div>
          <div className={styles.globalContainer}>
            <h2 className={styles.homeCtaTitle}>
              Ready to Navigate the World with Confidence?
            </h2>
            <p className={styles.homeCtaText}>
              Start your journey to becoming culturally fluent today.
            </p>
            {!userProfile ? (
              <Link href="/profile-setup" className={styles.btnPrimary}>
                Create Your Profile
              </Link>
            ) : (
              <Link href="/ai-assistant" className={styles.btnPrimary}>
                Ask a Question
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}