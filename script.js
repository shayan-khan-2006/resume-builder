// import html2pdf from 'html2pdf.js';
var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
if (username) {
    // Load and display the resume for the given username
    console.log("Displaying resume for ".concat(username));
}
// Get form and resume display elements
var form = document.getElementById('resume-form');
var resumeDisplay = document.getElementById('resume-display');
var displayName = document.getElementById('display-name');
var displayEmail = document.getElementById('display-email');
var displayPhone = document.getElementById('display-phone');
var displayEducation = document.getElementById('display-education');
var displaySkills = document.getElementById('display-skills');
var displayWorkExperience = document.getElementById('display-work-experience');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    // Get input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var skills = document.getElementById('skills').value.split(',');
    var workExperience = document.getElementById('work-experience').value;
    // Update resume display
    displayName.textContent = name;
    displayEmail.textContent = email;
    displayPhone.textContent = phone;
    displayEducation.textContent = education;
    // Clear previous skills and add new ones
    displaySkills.innerHTML = '';
    skills.forEach(function (skill) {
        var li = document.createElement('li');
        li.textContent = skill.trim();
        displaySkills.appendChild(li);
    });
    displayWorkExperience.textContent = workExperience;
    // Show the resume display section
    resumeDisplay.style.display = 'block';
});
// Select all editable fields
var editableFields = document.querySelectorAll('[contenteditable="true"]');
// Function to update resume content immediately when an edit is made
editableFields.forEach(function (field) {
    field.addEventListener('input', function (event) {
        var _a;
        var target = event.target;
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
                if (((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id) === 'display-skills') {
                    updateSkills();
                }
                break;
        }
    });
});
// Example functions to update data (implement these according to your app's data structure)
function updateName(newName) {
    console.log("Name updated: ".concat(newName));
    // Update the data model and optionally save to localStorage, server, etc.
}
function updateEmail(newEmail) {
    console.log("Email updated: ".concat(newEmail));
}
function updatePhone(newPhone) {
    console.log("Phone updated: ".concat(newPhone));
}
function updateEducation(newEducation) {
    console.log("Education updated: ".concat(newEducation));
}
function updateWorkExperience(newWorkExperience) {
    console.log("Work Experience updated: ".concat(newWorkExperience));
}
function updateSkills() {
    var skillElements = document.querySelectorAll('#display-skills li');
    var skills = [];
    skillElements.forEach(function (li) {
        var _a;
        skills.push(((_a = li.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '');
    });
    console.log("Skills updated: ".concat(skills.join(', ')));
}
var shareButton = document.getElementById('share-link');
shareButton === null || shareButton === void 0 ? void 0 : shareButton.addEventListener('click', function () {
    var shareableLink = window.location.href; // The current URL
    navigator.clipboard.writeText(shareableLink).then(function () {
        alert('Link copied to clipboard!');
    }).catch(function (err) {
        console.error('Failed to copy link: ', err);
    });
});
var downloadButton = document.getElementById('download-pdf');
downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.addEventListener('click', function () {
    var element = document.getElementById('resume-display');
    if (element) {
        html2pdf().from(element).save('resume.pdf');
    }
});
