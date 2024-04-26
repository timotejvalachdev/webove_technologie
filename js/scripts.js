<!-- Galéria-->
document.querySelectorAll('.gallery-image').forEach(item => {
    item.addEventListener('click', event => {
        const src = item.getAttribute('src');
        document.getElementById('modalImage').setAttribute('src', src);
        new bootstrap.Modal(document.getElementById('imageModal')).show();
    });
});



<!-- Kontrola vyplnenia formulára-->
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contactForm');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    const submitButton = document.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(event) {
        let formIsValid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const namePattern = /^[a-zA-ZáéíóúýčďěňřšťžůÁÉÍÓÚÝČĎĚŇŘŠŤŽŮ '-]+$/; // Includes support for accented characters and some special characters

        [name, email, phone, message].forEach(input => {
            input.classList.remove('is-invalid');
        });

        if (!name.value.trim() || !namePattern.test(name.value)) {
            name.classList.add('is-invalid');
            formIsValid = false;
        }

        if (!email.value.trim() || !emailPattern.test(email.value)) {
            email.classList.add('is-invalid');
            formIsValid = false;
        }

        if (!phone.value.trim() || !phonePattern.test(phone.value)) {
            phone.classList.add('is-invalid');
            formIsValid = false;
        }

        if (!message.value.trim()) {
            message.classList.add('is-invalid');
            formIsValid = false;
        }

        if (!formIsValid) {
            event.preventDefault();
            alert('Please correct the errors in the form before submitting.');
        }
    });
});

//implemntacia AJAX pre zobrazenie dát z XML tabulky

window.onload = function() {
    loadProjects();
};

function loadProjects() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayProjects(this);
        }
    };
    xhttp.open("GET", "portfolio.xml", true);
    xhttp.send();
}

function displayProjects(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table="<tr><th>Súčasne projekty   </th><th>Popis</th><th>Technológie</th></tr>";
    var projects = xmlDoc.getElementsByTagName("project");
    for (i = 0; i < projects.length; i++) {
        table += "<tr><td>" +
            projects[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +
            "</td><td>" +
            projects[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
            "</td><td>";
        var techs = projects[i].getElementsByTagName("technology");
        for(var j = 0; j < techs.length; j++) {
            table += techs[j].childNodes[0].nodeValue + " ";
        }
        table += "</td></tr>";
    }
    document.getElementById("projectsTable").innerHTML = table;
}