'use strict';
/* categories & project data*/

const projectCategories = [
    {
        id: 'design',
        subcategories:[
            'ad',
            'identity',
            'social',
            'carousel',
            'ecommerce',
            'templates',
        ],
    },

    {
        id: 'motion',
        subcategories:[],
    },

    {
        id:'video',
        subcategories:[],
    },

    {
        id:'personal',
        subcategories: [],
    },
];

const projects = [
   
    {
        id: 'brand',
        category: 'design',
        subcategory:'identity',
        cover: 'VISUAL\nIDENTITY',
        color: '#34392a',
        label: 'DESIGN / IDENTITY',
        tools: 'Canva',
        title:{
            ar:'الهوية البصرية للمحتوى',
            en:'Visual identity studies',
        },
        description:{
            ar:'تجارب تصميم لهويات بصرية ومنشورات مترابطة، مع التركيز على اتساق الألوان والخطوط والتكوين',
            en:'Visual identity and coordinated social post studies with an emphasis on consistent color, typography and composition',
        },

        focus:{
            ar: 'التسلسل البصري واتساق مجموعة التصاميم',
            en:'Visual hierarchy and consistency across designs',
        },
    },

    {
        id:'story',
        category:'motion',
        subcategory: null,
        cover: 'DRAWN\nTO MOVE',
        color:'#3c2b37',
        label:'2D / STORYTELLING',
        tools: 'Krita . Adobe Animate',
        title:{
            ar:'الشخصيات والقصص المتحركة',
            en:'Characters & animated stories',
        },

        description:{
            ar:'رسم الشخصيات والتحريك ثنائي الأبعاد، ضمن تطوير محتوى قصصي لليوتيوب',
            en:'Character drawing and 2D animation explorations for developing story-led YouTube content',
        },

        focus:{
            ar:'تصاميم مشاهد انميشن',
            en: 'Animation scene design',
        },
    },

    {
        id:'edit',
        category:'video',
        subcategory: null,
        cover:'CUT\nCOLOR \nSTORY',
        color:'#302d40',
        label:'VIDEO /EDITING',
        tools:'DaVinci Resolve',
        title:{
            ar:'المونتاج',
            en:'Editing & visual storytelling',
        },

        description:{
            ar:'انتاج فيديوهات توصل فكرة بطريقة مشوقة',
            en:'Creating captivating videos that get an idea across',
        },

        focus:{
            ar:'الايقاع، معالجة الالوان, ترتيب المشاهد بما يناسبها, وتحسين الصوت',
            en:'Pacing, color grading and audio cleanup',
        },
    },

];




/* Project filter translations */

const filterTranslations = {
    ar: {
        all: 'كل الأعمال',
        allInCategory: 'كل أعمال {category}',
        empty: 'لا توجد مشاريع في هذا التصنيف حاليًا.',

        categories: {
            design: 'التصميم',
            motion: 'التحريك والأنيميشن',
            video: 'المونتاج',
            personal: 'مشاريع شخصية',
        },

        subcategories: {
            ad: 'الإعلانات',
            identity: 'الهوية البصرية',
            social: 'منشورات التواصل',
            carousel: 'الكاروسيل',
            ecommerce: 'تصاميم المتاجر',
            templates: 'القوالب',
        },
    },

    en: {
        all: 'All work',
        allInCategory: 'All {category}',
        empty: 'No projects in this category yet.',

        categories: {
            design: 'Design',
            motion: 'Motion & Animation',
            video: 'Video Editing',
            personal: 'Personal Projects',
        },

        subcategories: {
            ad: 'Advertisements',
            identity: 'Visual Identity',
            social: 'Social Media Posts',
            carousel: 'Carousels',
            ecommerce: 'E-commerce Designs',
            templates: 'Templates',
        },
    },
};


/* Current filter selection */

let activeCategory = 'all';
let activeSubcategory = 'all';




/* Render project cards */

function renderProjects(language) {

    // Find the projects container in the HTML.
    const projectsContainer = document.querySelector('#projects');

    // Stop if the container does not exist.
    if (!projectsContainer) {
        return;
    }

    // Remove the placeholder or previously rendered cards.
    projectsContainer.replaceChildren();


    
    // Get only projects matching the selected filters.
    const visibleProjects = projects.filter((project) => {

        const matchesCategory =
            activeCategory === 'all' ||
            project.category === activeCategory;

        const matchesSubcategory =
            activeSubcategory === 'all' ||
            project.subcategory === activeSubcategory;

        return matchesCategory && matchesSubcategory;
    });


    // Show a message if no projects match.
    if (visibleProjects.length === 0) {

        const emptyMessage = document.createElement('p');

        emptyMessage.className = 'projects-empty';

        emptyMessage.textContent = filterTranslations[language].empty;

        projectsContainer.append(emptyMessage);

        return;
    }



    // Create a card for every project.
    visibleProjects.forEach((project, index) => {

        // Create the main card.
        const card = document.createElement('article');
        card.className = 'project-card';

        // Store category information for future filtering.
        card.dataset.category = project.category;

        if (project.subcategory) {
            card.dataset.subcategory = project.subcategory;
        }


        // Create the cover area.
        const cover = document.createElement('div');
        cover.className = 'project-cover';
        cover.style.backgroundColor = project.color;

        // Add the cover title.
        const coverTitle = document.createElement('span');
        coverTitle.className = 'project-cover-title';
        coverTitle.textContent = project.cover;

        // Add the project number.
        const number = document.createElement('span');
        number.className = 'project-number';
        number.textContent = String(index + 1).padStart(2, '0');

        cover.append(coverTitle, number);


        // Create the information area.
        const info = document.createElement('div');
        info.className = 'project-info';

        // Project category label.
        const label = document.createElement('p');
        label.className = 'project-label';
        label.textContent = project.label;

        // Project title in the selected language.
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent =
            (project.title && project.title[language]) || project.id;

        // Project description in the selected language.
        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent =
            (project.description && project.description[language]) || '';

        // Project focus, if available.
        info.append(label, title, description);

        if (project.focus && project.focus[language]) {

            const focus = document.createElement('p');
            focus.className = 'project-focus';
            focus.textContent = project.focus[language];

            info.append(focus);
        }

        // Project tools.
        const meta = document.createElement('p');
        meta.className = 'project-meta';

        const tools = document.createElement('span');
        tools.className = 'project-tools';
        tools.textContent = project.tools;

        meta.append(tools);
        info.append(meta);


        
 // Create the project details button.
         const detailsButton = document.createElement('button');

        detailsButton.type = 'button';
        detailsButton.className = 'project-open-button';

       detailsButton.textContent =
       translations[language].projectDetailsButton;

// Open the project details when clicked.
      detailsButton.addEventListener('click', () => {
      showProjectDetails(project, language);
    });

      info.append(detailsButton);



        // Assemble the complete card.
        card.append(cover, info);

        // Add the card to the projects section.
        projectsContainer.append(card);
    });
}


/* Render category and subcategory filters */

function renderFilters(language) {

    const filtersContainer = document.querySelector('#filters');

    if (!filtersContainer) {
        return;
    }

    const dictionary = filterTranslations[language];

    if (!dictionary) {
        return;
    }

    // Clear old filter buttons.
    filtersContainer.replaceChildren();


    // Create a reusable filter button.
    function createFilterButton(label, category, subcategory, isActive) {

        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'filter-button';
        button.textContent = label;

        button.setAttribute('aria-pressed', String(isActive));

        if (isActive) {
            button.classList.add('is-active');
        }

        button.addEventListener('click', () => {

            activeCategory = category;
            activeSubcategory = subcategory;

            renderFilters(language);
            renderProjects(language);
        });

        return button;
    }


    


    // Create the main category buttons.
    const mainGroup = document.createElement('div');

    mainGroup.className = 'filter-group';


    // All projects button.
    mainGroup.append(
        createFilterButton(
            dictionary.all,
            'all',
            'all',
            activeCategory === 'all'
        )
    );


    // Show only categories that have at least one project.
    const availableCategories = projectCategories.filter((category) => {

        return projects.some((project) => {
            return project.category === category.id;
        });

    });


    // Create a button for every available category.
    availableCategories.forEach((category) => {

        mainGroup.append(
            createFilterButton(
                dictionary.categories[category.id],
                category.id,
                'all',
                activeCategory === category.id
            )
        );

    });


    filtersContainer.append(mainGroup);


    // Find the currently selected category.
    const selectedCategory = projectCategories.find((category) => {

        return category.id === activeCategory;

    });


    // Create subcategory buttons when available.
    if (selectedCategory && selectedCategory.subcategories.length > 0) {

        const subGroup = document.createElement('div');

        subGroup.className = 'filter-group filter-subcategories';


        // Button to show every project in the selected category.
        const allCategoryLabel = dictionary.allInCategory.replace(
            '{category}',
            dictionary.categories[activeCategory]
        );

        subGroup.append(
            createFilterButton(
                allCategoryLabel,
                activeCategory,
                'all',
                activeSubcategory === 'all'
            )
        );


        // Add the available subcategories.
        selectedCategory.subcategories.forEach((subcategory) => {

            subGroup.append(
                createFilterButton(
                    dictionary.subcategories[subcategory],
                    activeCategory,
                    subcategory,
                    activeSubcategory === subcategory
                )
            );

        });


        filtersContainer.append(subGroup);
    }
}


// Display project details in a dialog.

function showProjectDetails(project, language) {

    // Find the dialog and its content container.
    const dialog = document.querySelector('#projectDialog');

    const dialogContent = document.querySelector(
        '#projectDialogContent'
    );

    const closeButton = document.querySelector(
        '#projectDialogClose'
    );

    // Stop if the required elements are missing.
    if (!dialog || !dialogContent || !closeButton) {
        return;
    }

    // Get the translations for the current language.
    const dictionary = translations[language];


    // Clear the previous project details.
    dialogContent.replaceChildren();


    // Create the project cover.
    const cover = document.createElement('div');

    cover.className = 'project-dialog-cover';
    cover.style.backgroundColor = project.color;


    const coverTitle = document.createElement('span');

    coverTitle.className = 'project-cover-title';
    coverTitle.textContent = project.cover;

    cover.append(coverTitle);


    // Create the project information container.
    const body = document.createElement('div');

    body.className = 'project-dialog-body';


    // Create the project label.
    const label = document.createElement('p');

    label.className = 'project-label';
    label.textContent = project.label;


    // Create the project title.
    const title = document.createElement('h2');

    title.id = 'projectDialogTitle';
    title.className = 'project-dialog-title';

    title.textContent =
        project.title[language] || project.id;


    // Create the project description.
    const description = document.createElement('p');

    description.className = 'project-description';

    description.textContent =
        project.description[language] || '';


    // Add the main information.
    body.append(label, title, description);


    // Add the project focus when available.
    if (project.focus && project.focus[language]) {

        const focus = document.createElement('p');

        focus.className = 'project-focus';
        focus.textContent = project.focus[language];

        body.append(focus);
    }


    // Add the tools section.
    const toolsHeading = document.createElement('h3');

    toolsHeading.className = 'project-tools-heading';
    toolsHeading.textContent = dictionary.projectToolsLabel;


    const tools = document.createElement('p');

    tools.className = 'project-tools';
    tools.textContent = project.tools;


    body.append(toolsHeading, tools);


    // Put the cover and information inside the dialog.
    dialogContent.append(cover, body);


    // Update the close button accessibility label.
    closeButton.setAttribute(
        'aria-label',
        dictionary.closeProjectDetails
    );


    // Open the dialog.
    if (!dialog.open) {
        dialog.showModal();
    }
}


// Handle closing the project dialog.

const projectDialog = document.querySelector('#projectDialog');

const projectDialogClose = document.querySelector(
    '#projectDialogClose'
);

if (projectDialog && projectDialogClose) {

    // Close when the close button is clicked.
    projectDialogClose.addEventListener('click', () => {
        projectDialog.close();
    });


    // Close when the backdrop is clicked.
    projectDialog.addEventListener('click', (event) => {

        if (event.target === projectDialog) {
            projectDialog.close();
        }

    });
}





