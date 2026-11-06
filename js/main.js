'use strict';

// Read the previously saved language.
const savedLanguage = localStorage.getItem('preferredLanguage');

// Use the saved language, or Arabic as the default.
let currentLanguage = savedLanguage === 'en' ? 'en' : 'ar';
const languageButton = document.querySelector('#language');
const navigation = document.querySelector('#navigation');

function setLanguage(language) {
    const dictionary = translations[language];

    if(!dictionary) {
        console.error('Translation language not found:', language);
        return
    }

    // Save the selected language.
    localStorage.setItem('preferredLanguage', language);

    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    const translatbleElements = document.querySelectorAll('[data-t]');
    translatbleElements.forEach((element)=> {
        const translationKey = element.dataset.t;
        const translatedText = dictionary[translationKey];

        if (translatedText !== undefined) {
            element.textContent = translatedText;
        } else {
            console.warn('Missing translation:', translationKey);
        }
    });

    document.title = dictionary.pageTitle;
    // Update the page description.
    const descriptionMeta = document.querySelector(
    'meta[name="description"]');

    if (descriptionMeta && dictionary.pageDescription) {
    descriptionMeta.setAttribute(
        'content',
        dictionary.pageDescription
    );
     }
     
    if (navigation) {
        navigation.setAttribute('aria-label', dictionary.navigationLabel);
    }

    if (languageButton) {
        languageButton.textContent = language === 'ar' ? 'English' : 'العربية';
        languageButton.setAttribute('aria-label', dictionary.languageButtonLabel);
        languageButton.setAttribute('lang', language === 'ar' ? 'en' : 'ar');

    }

    // Update project filters and cards in the selected language.
    if (typeof renderFilters === 'function') {
    renderFilters(language);
        }

     if (typeof renderProjects === 'function') {
    renderProjects(language);
 }



 // Update the contact email link.
const contactEmailLink = document.querySelector('#contactEmail');

if (contactEmailLink && dictionary.contactEmailPlaceholder) {

    const email = dictionary.contactEmailPlaceholder.trim();

    contactEmailLink.href = `mailto:${email}`;
}

    
}

if (languageButton) {
    languageButton.addEventListener('click', () => 
    {
        currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        setLanguage(currentLanguage);
    });
}

setLanguage(currentLanguage);

/* Update footer year */

const yearElement = document.querySelector('#currentYear');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}