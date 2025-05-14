import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { EtiquetteAssistantEmbed } from '../../components/EtiquetteAssistant';
import Benefits from '../../components/Benefits';
import Features from '../../components/Features';
import styles from '../../styles/Project.module.css';
import ProjectHeader from '../../components/ProjectHeader';
import Testimonials from '../../components/Testimonials';

export default function CulturalAssistant() {
    const projectData = {
        title: "Cultural Etiquette AI Assistant",
        subtitle: "Get instant answers about cultural appropriateness and customs worldwide",
        description: "Our AI-powered assistant helps you navigate cultural etiquette questions in real-time. Whether you're preparing for international travel, business meetings, or social interactions, get personalized guidance on what's appropriate in different cultural contexts.",
        regions: ["Asia Pacific", "Europe", "Middle East", "Americas", "Africa"],
        topics: ["Greetings & Introductions", "Dining Etiquette", "Business Protocol", "Gift Giving", "Social Customs"],
        lastUpdated: "December 2024"
    };

    const assistantFeatures = [
        {
            icon: "fas fa-comments",
            heading: "Real-Time Responses",
            description: "Get instant answers to your cultural etiquette questions with our AI-powered chat interface"
        },
        {
            icon: "fas fa-globe",
            heading: "Global Coverage",
            description: "Access etiquette information for over 50 countries and cultural regions worldwide"
        },
        {
            icon: "fas fa-user-cog",
            heading: "Personalized Guidance",
            description: "Receive customized advice based on your profile and specific cultural interests"
        },
        {
            icon: "fas fa-check-circle",
            heading: "Appropriate/Inappropriate",
            description: "Clear indicators showing what's culturally appropriate or inappropriate in each context"
        }
    ];

    const assistantBenefits = [
        {
            icon: "fas fa-shield-alt",
            heading: "Avoid Cultural Faux Pas",
            description: "Prevent embarrassing or offensive mistakes by understanding what's inappropriate in different cultures"
        },
        {
            icon: "fas fa-handshake",
            heading: "Build Better Relationships",
            description: "Show respect and build trust by demonstrating cultural awareness and sensitivity"
        },
        {
            icon: "fas fa-briefcase",
            heading: "Professional Success",
            description: "Excel in international business by understanding proper etiquette and cultural expectations"
        }
    ];

    return (
        <>
            <Head>
                <title>Cultural Etiquette AI Assistant | Global Etiquette Guide</title>
                <meta name="description" content="AI-powered assistant for instant cultural etiquette guidance worldwide" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
            </Head>

            <Navbar />

            <main>
                <ProjectHeader {...projectData} />

                <Features
                    title="How It Works"
                    features={assistantFeatures}
                />

                <section className={styles.assistantSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>Ask the AI Assistant</h2>
                        <p className={styles.sectionDescription}>
                            Have a question about cultural etiquette? Our AI assistant can help you understand 
                            what's appropriate or inappropriate in different cultural contexts.
                        </p>

                        <EtiquetteAssistantEmbed />
                    </div>
                </section>

                <Benefits
                    title="Key Benefits"
                    benefits={assistantBenefits}
                />

                <Testimonials
                    testimonialIds={[2, 4]}
                    customTitle="What Our Users Say"
                />

                <section className={styles.ctaSection}>
                    <div className={styles.container}>
                        <h2>Ready to Navigate the World with Confidence?</h2>
                        <p>Set up your profile for personalized guidance or explore our comprehensive cultural guides.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/profile-setup" className={styles.btnPrimary}>
                                Create Your Profile
                            </Link>
                            <Link href="/projects" className={styles.btnSecondary}>
                                Browse All Guides
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}