// import html2pdf from 'html2pdf.js';

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if (username) {
    // Load and display the resume for the given username
    console.log(`Displaying resume for ${username}`);
}

// Get form and resume display elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLElement;

const displayName = document.getElementById('display-name') as HTMLElement;
const displayEmail = document.getElementById('display-email') as HTMLElement;
const displayPhone = document.getElementById('display-phone') as HTMLElement;
const displayEducation = document.getElementById('display-education') as HTMLElement;
const displaySkills = document.getElementById('display-skills') as HTMLElement;
const displayWorkExperience = document.getElementById('display-work-experience') as HTMLElement;

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');
    const workExperience = (document.getElementById('work-experience') as HTMLInputElement).value;

    // Update resume display
    displayName.textContent = name;
    displayEmail.textContent = email;
    displayPhone.textContent = phone;
    displayEducation.textContent = education;

    // Clear previous skills and add new ones
    displaySkills.innerHTML = '';
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill.trim();
        displaySkills.appendChild(li);
    });

    displayWorkExperience.textContent = workExperience;

    // Show the resume display section
    resumeDisplay.style.display = 'block';
});

// Select all editable fields
const editableFields = document.querySelectorAll('[contenteditable="true"]');

// Function to update resume content immediately when an edit is made
editableFields.forEach(field => {
    field.addEventListener('input', (event) => {
        const target = event.target as HTMLElement;

        // Update the data model based on the element's ID
        switch (target.id) {
            case 'display-name':
                updateName(target.textContent || '');
                break;
            case 'display-email':
                updateEmail(target.textContent || '');
                break;
            case 'display-phone':
                updatePhone(target.textContent || '');
                break;
            case 'display-education':
                updateEducation(target.textContent || '');
                break;
            case 'display-work-experience':
                updateWorkExperience(target.textContent || '');
                break;
            default:
                // Handle skills (li elements)
                if (target.parentElement?.id === 'display-skills') {
                    updateSkills();
                }
                break;
        }
    });
});

// Example functions to update data (implement these according to your app's data structure)
function updateName(newName: string) {
    console.log(`Name updated: ${newName}`);
    // Update the data model and optionally save to localStorage, server, etc.
}

function updateEmail(newEmail: string) {
    console.log(`Email updated: ${newEmail}`);
}

function updatePhone(newPhone: string) {
    console.log(`Phone updated: ${newPhone}`);
}

function updateEducation(newEducation: string) {
    console.log(`Education updated: ${newEducation}`);
}

function updateWorkExperience(newWorkExperience: string) {
    console.log(`Work Experience updated: ${newWorkExperience}`);
}

function updateSkills() {
    const skillElements = document.querySelectorAll('#display-skills li');
    const skills: string[] = [];
    skillElements.forEach((li) => {
        skills.push(li.textContent?.trim() || '');
    });
    console.log(`Skills updated: ${skills.join(', ')}`);
}

const shareButton = document.getElementById('share-link');

shareButton?.addEventListener('click', () => {
    const shareableLink = window.location.href; // The current URL
    navigator.clipboard.writeText(shareableLink).then(() => {
        alert('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
});

const downloadButton = document.getElementById('download-pdf');

downloadButton?.addEventListener('click', () => {
    const element = document.getElementById('resume-display');
    if (element) {
        html2pdf().from(element).save('resume-builder.pdf');
    }
});
