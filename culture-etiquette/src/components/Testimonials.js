import React from 'react';
import styles from '../styles/Testimonials.module.css';

const allTestimonials = [
  {
    id: 1,
    text: "The Asian cultural etiquette guide helped me navigate a business trip to Japan perfectly. Understanding bowing protocols and business card exchange rituals made a huge difference in building relationships.",
    name: "Sarah Johnson",
    title: "International Business Consultant"
  },
  {
    id: 2,
    text: "As a study abroad student, these guides were invaluable. The dining etiquette section helped me avoid embarrassing mistakes when eating with my host family in France.",
    name: "Michael Chen",
    title: "University Student"
  },
  {
    id: 3,
    text: "The business etiquette guides transformed how I approach international meetings. I now feel confident working with clients from diverse cultural backgrounds.",
    name: "Jessica Rivera",
    title: "Global Sales Director"
  },
  {
    id: 4,
    text: "These guides helped me prepare for my honeymoon in Morocco. Understanding local customs and dress codes made our trip so much more meaningful and respectful.",
    name: "David Thompson",
    title: "Travel Enthusiast"
  },
  {
    id: 5,
    text: "As an ESL teacher working with international students, these cultural insights help me create a more inclusive classroom environment.",
    name: "Emily Park",
    title: "ESL Instructor"
  }
];

const Testimonials = ({ testimonialIds, customTitle }) => {
  // If specific IDs are provided, filter testimonials. Otherwise, show first 3
  const testimonialsToShow = testimonialIds 
    ? allTestimonials.filter(t => testimonialIds.includes(t.id))
    : allTestimonials.slice(0, 3);

  return (
    <section className={styles.testimonialsSection}>
      <div className="global-container">
        <h2 className={styles.testimonialsSectionTitle}>
          {customTitle || "What People Are Saying"}
        </h2>
        <div className={styles.testimonialsGrid}>
          {testimonialsToShow.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.testimonialQuoteIcon}>
                <i className="fas fa-quote-left"></i>
              </div>
              <p className={styles.testimonialText}>{testimonial.text}</p>
              <div className={styles.testimonialAuthor}>
                <p className={styles.testimonialAuthorName}>{testimonial.name}</p>
                <p className={styles.testimonialAuthorTitle}>{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;