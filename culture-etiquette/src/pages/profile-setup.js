import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/ProfileSetup.module.css';

export default function ProfileSetup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    interestedCultures: [],
    travelFrequency: '',
    primaryConcern: '',
    experienceLevel: '',
    preferredLearning: '',
    emailUpdates: false
  });

  const [errors, setErrors] = useState({});

  const purposes = [
    'Business Travel',
    'Personal Travel/Tourism',
    'International Relocation',
    'Academic/Educational',
    'Dating/Relationships',
    'General Cultural Interest'
  ];

  const cultures = [
    'Japanese',
    'Chinese',
    'Korean',
    'Indian',
    'Middle Eastern',
    'French',
    'Italian',
    'German',
    'British',
    'American',
    'Mexican',
    'Brazilian',
    'Russian',
    'African Cultures',
    'Southeast Asian'
  ];

  const travelFrequencies = [
    'Never traveled internationally',
    'Once a year',
    '2-5 times per year',
    'More than 5 times per year',
    'Living abroad'
  ];

  const concerns = [
    'Business etiquette',
    'Dining customs',
    'Social interactions',
    'Religious/cultural sensitivity',
    'Gift giving',
    'Language barriers'
  ];

  const experienceLevels = [
    'Complete beginner',
    'Some international experience',
    'Moderate experience',
    'Very experienced',
    'Cultural expert'
  ];

  const learningStyles = [
    'Quick tips and summaries',
    'Detailed guides',
    'Interactive Q&A',
    'Real-world scenarios',
    'Video demonstrations'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCultureToggle = (culture) => {
    const currentCultures = formData.interestedCultures;
    if (currentCultures.includes(culture)) {
      handleInputChange('interestedCultures', currentCultures.filter(c => c !== culture));
    } else {
      handleInputChange('interestedCultures', [...currentCultures, culture]);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Please enter your name';
        }
        if (!formData.purpose) {
          newErrors.purpose = 'Please select your primary purpose';
        }
        break;
      case 2:
        if (formData.interestedCultures.length === 0) {
          newErrors.interestedCultures = 'Please select at least one culture';
        }
        if (!formData.travelFrequency) {
          newErrors.travelFrequency = 'Please select your travel frequency';
        }
        break;
      case 3:
        if (!formData.primaryConcern) {
          newErrors.primaryConcern = 'Please select your primary concern';
        }
        if (!formData.experienceLevel) {
          newErrors.experienceLevel = 'Please select your experience level';
        }
        if (!formData.preferredLearning) {
          newErrors.preferredLearning = 'Please select your preferred learning style';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('profileCreatedAt', new Date().toISOString());
    
    // Redirect to home or assistant
    router.push('/etiquette-assistant');
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <h2>Welcome! Let's personalize your experience</h2>
            <div className={styles.formGroup}>
              <label>What's your name?</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your name"
                className={errors.name ? styles.errorInput : ''}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>What's your primary purpose for learning cultural etiquette?</label>
              <div className={styles.radioGroup}>
                {purposes.map(purpose => (
                  <label key={purpose} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="purpose"
                      value={purpose}
                      checked={formData.purpose === purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                    />
                    <span>{purpose}</span>
                  </label>
                ))}
              </div>
              {errors.purpose && <span className={styles.errorText}>{errors.purpose}</span>}
            </div>
          </>
        );
      
      case 2:
        return (
          <>
            <h2>Tell us about your cultural interests</h2>
            <div className={styles.formGroup}>
              <label>Which cultures are you most interested in learning about?</label>
              <div className={styles.checkboxGrid}>
                {cultures.map(culture => (
                  <label key={culture} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.interestedCultures.includes(culture)}
                      onChange={() => handleCultureToggle(culture)}
                    />
                    <span>{culture}</span>
                  </label>
                ))}
              </div>
              {errors.interestedCultures && (
                <span className={styles.errorText}>{errors.interestedCultures}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>How often do you travel internationally?</label>
              <select
                value={formData.travelFrequency}
                onChange={(e) => handleInputChange('travelFrequency', e.target.value)}
                className={errors.travelFrequency ? styles.errorInput : ''}
              >
                <option value="">Select frequency</option>
                {travelFrequencies.map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
              {errors.travelFrequency && (
                <span className={styles.errorText}>{errors.travelFrequency}</span>
              )}
            </div>
          </>
        );
      
      case 3:
        return (
          <>
            <h2>Let's customize your learning experience</h2>
            <div className={styles.formGroup}>
              <label>What's your primary concern when interacting with other cultures?</label>
              <select
                value={formData.primaryConcern}
                onChange={(e) => handleInputChange('primaryConcern', e.target.value)}
                className={errors.primaryConcern ? styles.errorInput : ''}
              >
                <option value="">Select concern</option>
                {concerns.map(concern => (
                  <option key={concern} value={concern}>{concern}</option>
                ))}
              </select>
              {errors.primaryConcern && (
                <span className={styles.errorText}>{errors.primaryConcern}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>How would you rate your cultural awareness experience?</label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                className={errors.experienceLevel ? styles.errorInput : ''}
              >
                <option value="">Select level</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              {errors.experienceLevel && (
                <span className={styles.errorText}>{errors.experienceLevel}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>What's your preferred learning style?</label>
              <select
                value={formData.preferredLearning}
                onChange={(e) => handleInputChange('preferredLearning', e.target.value)}
                className={errors.preferredLearning ? styles.errorInput : ''}
              >
                <option value="">Select style</option>
                {learningStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              {errors.preferredLearning && (
                <span className={styles.errorText}>{errors.preferredLearning}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.emailUpdates}
                  onChange={(e) => handleInputChange('emailUpdates', e.target.checked)}
                />
                <span>Send me weekly cultural etiquette tips</span>
              </label>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Profile Setup | Global Etiquette Guide</title>
        <meta name="description" content="Personalize your cultural etiquette learning experience" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>

      <Navbar />
      
      <main className={styles.profileSetupMain}>
        <div className={styles.container}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          
          <div className={styles.stepIndicator}>
            Step {currentStep} of 3
          </div>

          <form className={styles.profileForm} onSubmit={(e) => e.preventDefault()}>
            {renderStep()}
            
            <div className={styles.buttonGroup}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className={styles.backButton}
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className={styles.nextButton}
              >
                {currentStep === 3 ? 'Complete Setup' : 'Next'}
              </button>
            </div>
          </form>

          {currentStep === 1 && (
            <div className={styles.skipOption}>
              <button
                onClick={() => router.push('/')}
                className={styles.skipButton}
              >
                Skip for now
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}