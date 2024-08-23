document.addEventListener("DOMContentLoaded", () => {
    // replace template stuff here
    const age = calculateAge("2005-08-19");
    const country = "the United Kingdom"
    // Select the paragraph element and replace placeholder with actual age
    document.body.innerHTML = document.body.innerHTML.replace("{{age}}", age).replace("{{country}}", country);

    // handle main GUI stuff here!
    // JavaScript to handle section visibility
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('selected'));
            item.classList.add('selected');

            document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
            document.getElementById(item.getAttribute('data-section')).style.display = 'block';
        });
    });
    // Trigger click on the first item to show the default section
    document.querySelector('.nav-item').click();
});

function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
}