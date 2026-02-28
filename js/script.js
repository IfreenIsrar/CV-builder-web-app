
// TEMPLATE SELECTION
function selectTemplate(templateName) {
    // Save selected template and go to form
    localStorage.setItem('selectedTemplate', templateName);
    window.location.href = 'form.html';
}

// LOAD SAVED DATA INTO FORM 
function initializeForm() {
    const cvData = getCVData(); // Get data from localStorage

    if (cvData) {
        // Fill personal fields
        setValue('fullName', cvData.fullName);
        setValue('email', cvData.email);
        setValue('phone', cvData.phone);
        setValue('address', cvData.address);
        setValue('linkedin', cvData.linkedin);
        setValue('portfolio', cvData.portfolio);
        setValue('careerSummary', cvData.careerSummary);

        // Load dynamic sections (skills, education, etc.)
        loadArrayFields('skillsContainer', cvData.skills, addSkill, '');
        loadArrayFields('educationContainer', cvData.education, addEducation, {});
        loadArrayFields('experienceContainer', cvData.experience, addExperience, {});
        loadArrayFields('projectsContainer', cvData.projects, addProject, {});
        loadArrayFields('certificationsContainer', cvData.certifications, addCertification, {});
    } else {
        // No saved data: add one empty entry for each section
        addSkill();
        addEducation();
        addExperience();
        addProject();
        addCertification();
    }
}

// Helper: set value of an input/textarea by ID
function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value || '';
}

// Helper: load array data into dynamic sections
function loadArrayFields(containerId, items, addFunction, defaultItem) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; // Clear existing
    if (items && items.length > 0) {
        items.forEach(item => addFunction(item));
    } else {
        addFunction(defaultItem);
    }
}

// SKILLS 
function addSkill(skillValue = '') {
    const container = document.getElementById('skillsContainer');
    const skillId = 'skill_' + Date.now() + Math.random();
    const html = `
        <div class="mb-3 form-section" id="${skillId}">
            <div class="row">
                <div class="col-md-10">
                    <input type="text" class="form-control" placeholder="e.g., JavaScript" value="${escapeHtml(skillValue)}">
                </div>
                <div class="col-md-2">
                    <button type="button" class="btn btn-danger btn-sm w-100" onclick="removeElement('${skillId}')">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function getSkills() {
    const inputs = document.querySelectorAll('#skillsContainer input');
    return Array.from(inputs).map(i => i.value.trim()).filter(v => v !== '');
}

//  EDUCATION 
function addEducation(eduData = {}) {
    const container = document.getElementById('educationContainer');
    const eduId = 'edu_' + Date.now() + Math.random();
    const html = `
        <div class="mb-3 form-section" id="${eduId}">
            <div class="row mb-2">
                <div class="col-md-6"><input type="text" class="form-control" placeholder="School/University" value="${escapeHtml(eduData.school || '')}"></div>
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Degree" value="${escapeHtml(eduData.degree || '')}"></div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Field of Study" value="${escapeHtml(eduData.field || '')}"></div>
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Graduation Year" value="${escapeHtml(eduData.year || '')}"></div>
            </div>
            <div class="row">
                <div class="col-md-10"><textarea class="form-control" rows="2" placeholder="Additional details">${escapeHtml(eduData.details || '')}</textarea></div>
                <div class="col-md-2"><button type="button" class="btn btn-danger btn-sm w-100" onclick="removeElement('${eduId}')"><i class="fas fa-trash"></i> Remove</button></div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function getEducation() {
    const sections = document.querySelectorAll('#educationContainer .form-section');
    return Array.from(sections).map(s => {
        const inputs = s.querySelectorAll('input');
        const textarea = s.querySelector('textarea');
        return {
            school: inputs[0]?.value.trim() || '',
            degree: inputs[1]?.value.trim() || '',
            field: inputs[2]?.value.trim() || '',
            year: inputs[3]?.value.trim() || '',
            details: textarea?.value.trim() || ''
        };
    }).filter(e => e.school || e.degree);
}

// WORK EXPERIENCE 
function addExperience(expData = {}) {
    const container = document.getElementById('experienceContainer');
    const expId = 'exp_' + Date.now() + Math.random();
    const html = `
        <div class="mb-3 form-section" id="${expId}">
            <div class="row mb-2">
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Job Title" value="${escapeHtml(expData.jobTitle || '')}"></div>
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Company" value="${escapeHtml(expData.company || '')}"></div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Start Date" value="${escapeHtml(expData.startDate || '')}"></div>
                <div class="col-md-6"><input type="text" class="form-control" placeholder="End Date" value="${escapeHtml(expData.endDate || '')}"></div>
            </div>
            <div class="row mb-2">
                <div class="col-md-12"><input type="text" class="form-control" placeholder="Location" value="${escapeHtml(expData.location || '')}"></div>
            </div>
            <div class="row">
                <div class="col-md-10"><textarea class="form-control" rows="3" placeholder="Job description">${escapeHtml(expData.description || '')}</textarea></div>
                <div class="col-md-2"><button type="button" class="btn btn-danger btn-sm w-100" onclick="removeElement('${expId}')"><i class="fas fa-trash"></i> Remove</button></div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function getExperience() {
    const sections = document.querySelectorAll('#experienceContainer .form-section');
    return Array.from(sections).map(s => {
        const inputs = s.querySelectorAll('input');
        const textarea = s.querySelector('textarea');
        return {
            jobTitle: inputs[0]?.value.trim() || '',
            company: inputs[1]?.value.trim() || '',
            startDate: inputs[2]?.value.trim() || '',
            endDate: inputs[3]?.value.trim() || '',
            location: inputs[4]?.value.trim() || '',
            description: textarea?.value.trim() || ''
        };
    }).filter(e => e.jobTitle || e.company);
}

// PROJECTS 
function addProject(projData = {}) {
    const container = document.getElementById('projectsContainer');
    const projId = 'proj_' + Date.now() + Math.random();
    const html = `
        <div class="mb-3 form-section" id="${projId}">
            <div class="row mb-2">
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Project Title" value="${escapeHtml(projData.title || '')}"></div>
                <div class="col-md-6"><input type="url" class="form-control" placeholder="Project URL" value="${escapeHtml(projData.url || '')}"></div>
            </div>
            <div class="row">
                <div class="col-md-10"><textarea class="form-control" rows="2" placeholder="Project description">${escapeHtml(projData.description || '')}</textarea></div>
                <div class="col-md-2"><button type="button" class="btn btn-danger btn-sm w-100" onclick="removeElement('${projId}')"><i class="fas fa-trash"></i> Remove</button></div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function getProjects() {
    const sections = document.querySelectorAll('#projectsContainer .form-section');
    return Array.from(sections).map(s => {
        const inputs = s.querySelectorAll('input');
        const textarea = s.querySelector('textarea');
        return {
            title: inputs[0]?.value.trim() || '',
            url: inputs[1]?.value.trim() || '',
            description: textarea?.value.trim() || ''
        };
    }).filter(p => p.title);
}

//  CERTIFICATIONS
function addCertification(certData = {}) {
    const container = document.getElementById('certificationsContainer');
    const certId = 'cert_' + Date.now() + Math.random();
    const html = `
        <div class="mb-3 form-section" id="${certId}">
            <div class="row mb-2">
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Certification Name" value="${escapeHtml(certData.name || '')}"></div>
                <div class="col-md-6"><input type="text" class="form-control" placeholder="Issuing Organization" value="${escapeHtml(certData.organization || '')}"></div>
            </div>
            <div class="row">
                <div class="col-md-10"><input type="text" class="form-control" placeholder="Date Obtained" value="${escapeHtml(certData.date || '')}"></div>
                <div class="col-md-2"><button type="button" class="btn btn-danger btn-sm w-100" onclick="removeElement('${certId}')"><i class="fas fa-trash"></i> Remove</button></div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function getCertifications() {
    const sections = document.querySelectorAll('#certificationsContainer .form-section');
    return Array.from(sections).map(s => {
        const inputs = s.querySelectorAll('input');
        return {
            name: inputs[0]?.value.trim() || '',
            organization: inputs[1]?.value.trim() || '',
            date: inputs[2]?.value.trim() || ''
        };
    }).filter(c => c.name);
}

//  UTILITY: Remove element 
function removeElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.remove();
}

//  LOCALSTORAGE HELPERS 
function saveCVData(cvData) {
    localStorage.setItem('cvData', JSON.stringify(cvData));
}

function getCVData() {
    const data = localStorage.getItem('cvData');
    return data ? JSON.parse(data) : null;
}

function getSelectedTemplate() {
    return localStorage.getItem('selectedTemplate') || 'modern1';
}

// PROFILE PHOTO AS BASE64
function getProfilePhoto() {
    return new Promise(resolve => {
        const fileInput = document.getElementById('profilePhoto');
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            resolve('');
        }
    });
}

//  FORM SUBMISSION 
function handleFormSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('cvForm');

    // Basic validation (Bootstrap will style)
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    getProfilePhoto().then(photoData => {
        const cvData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            linkedin: document.getElementById('linkedin').value,
            portfolio: document.getElementById('portfolio').value,
            careerSummary: document.getElementById('careerSummary').value,
            profilePhoto: photoData,
            skills: getSkills(),
            education: getEducation(),
            experience: getExperience(),
            projects: getProjects(),
            certifications: getCertifications()
        };
        saveCVData(cvData);
        window.location.href = getSelectedTemplate() + '.html';
    });
}

// DISPLAY CV IN SELECTED TEMPLATE 
function displayCVData(templateName) {
    const cvData = getCVData();
    if (!cvData) {
        window.location.href = 'templates.html';
        return;
    }

    // Personal details
    setTextContent('nameDisplay', cvData.fullName || 'Your Name');

    // Email (handle both span and direct text)
    updateElement('emailDisplay', cvData.email, 'email@example.com');

    // Phone
    updateElement('phoneDisplay', cvData.phone, '+1 (555) 123-4567');

    // Address
    updateElement('addressDisplay', cvData.address, 'City, Country');

    // LinkedIn link
    if (document.getElementById('linkedinDisplay')) {
        const link = document.querySelector('#linkedinDisplay a');
        if (link) {
            link.href = cvData.linkedin || '#';
            link.textContent = 'LinkedIn';
        }
    }

    // Portfolio link
    if (document.getElementById('portfolioDisplay')) {
        const link = document.querySelector('#portfolioDisplay a');
        if (link) {
            link.href = cvData.portfolio || '#';
            link.textContent = 'Portfolio';
        }
    }

    // Profile photo
    if (cvData.profilePhoto && document.getElementById('profilePhotoDisplay')) {
        document.getElementById('profilePhotoDisplay').src = cvData.profilePhoto;
    }

    // Career summary (some templates have two IDs)
    setTextContent('careerSummaryDisplay', cvData.careerSummary || 'Add your professional summary here...');
    setTextContent('careerSummaryDisplay2', cvData.careerSummary || 'Add your professional summary here...');

    // Dynamic sections
    displayItems('skills', templateName, cvData.skills, renderSkill);
    displayItems('education', templateName, cvData.education, renderEducation);
    displayItems('experience', templateName, cvData.experience, renderExperience);
    displayItems('projects', templateName, cvData.projects, renderProject);
    displayItems('certifications', templateName, cvData.certifications, renderCertification);
}

// Helper: set text content of an element
function setTextContent(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// Helper: update element that might contain a span
function updateElement(id, value, defaultValue) {
    const el = document.getElementById(id);
    if (!el) return;
    const span = el.querySelector('span');
    if (span) span.textContent = value || defaultValue;
    else el.textContent = value || defaultValue;
}

// Helper: display array items in template container
function displayItems(section, templateName, items, renderFn) {
    const containerId = section + 'Display' + capitalize(templateName);
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    if (!items || items.length === 0) {
        container.innerHTML = '<p class="text-muted">No ' + section + ' added yet.</p>';
    } else {
        items.forEach(item => container.insertAdjacentHTML('beforeend', renderFn(item)));
    }
}

// Render functions for each section
function renderSkill(skill) {
    return '<span class="badge bg-primary me-2 mb-2">' + escapeHtml(skill) + '</span>';
}
function renderEducation(edu) {
    return `
        <div class="cv-entry">
            <div class="cv-entry-title">${escapeHtml(edu.degree)} in ${escapeHtml(edu.field)}</div>
            <div class="cv-entry-subtitle">${escapeHtml(edu.school)}</div>
            <div class="cv-entry-date">${escapeHtml(edu.year)}</div>
            ${edu.details ? '<div class="cv-entry-description">' + escapeHtml(edu.details) + '</div>' : ''}
        </div>
    `;
}
function renderExperience(exp) {
    return `
        <div class="cv-entry">
            <div class="cv-entry-title">${escapeHtml(exp.jobTitle)}</div>
            <div class="cv-entry-subtitle">${escapeHtml(exp.company)}</div>
            <div class="cv-entry-date">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate)}</div>
            ${exp.location ? '<div class="cv-entry-date">' + escapeHtml(exp.location) + '</div>' : ''}
            ${exp.description ? '<div class="cv-entry-description">' + escapeHtml(exp.description) + '</div>' : ''}
        </div>
    `;
}
function renderProject(proj) {
    return `
        <div class="cv-entry">
            <div class="cv-entry-title">${proj.url ? '<a href="' + escapeHtml(proj.url) + '" target="_blank">' + escapeHtml(proj.title) + '</a>' : escapeHtml(proj.title)}</div>
            ${proj.description ? '<div class="cv-entry-description">' + escapeHtml(proj.description) + '</div>' : ''}
        </div>
    `;
}
function renderCertification(cert) {
    return `
        <div class="cv-entry">
            <div class="cv-entry-title">${escapeHtml(cert.name)}</div>
            <div class="cv-entry-subtitle">${escapeHtml(cert.organization)}</div>
            <div class="cv-entry-date">${escapeHtml(cert.date)}</div>
        </div>
    `;
}

// Helper: capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Simple escape to prevent XSS
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// CV ACTIONS 
function editCV() {
    window.location.href = 'form.html';
}

function printCV() {
   // window.print();
}

function downloadPDF() {
    // Simple: use browser's print to PDF
    alert('Use "Print" and select "Save as PDF" to download.');
    window.print();
}

//  EVENT LISTENERS 
document.addEventListener('DOMContentLoaded', function() {
    // If on form page, initialize form and attach submit
    if (document.getElementById('cvForm')) {
        initializeForm();
        document.getElementById('cvForm').addEventListener('submit', handleFormSubmit);
    }

    // If on a template page (has displayCVData call), it's handled by inline script
    // But we also need to re-run display if needed? Already called from HTML.
});