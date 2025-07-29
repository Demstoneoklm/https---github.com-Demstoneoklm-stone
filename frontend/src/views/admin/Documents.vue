<template>
    <div class="container">
        <header>
            <h1><i class="fas fa-baby"></i> Gestion des Actes de Naissance</h1>
            <nav>
                <ul>
                    <li><a href="#" class="active" id="nav-creer"><i class="fas fa-file-alt"></i> Créer</a></li>
                    <li><a href="#" id="nav-consulter"><i class="fas fa-search"></i> Consulter</a></li>
                    <li><a href="#" id="nav-statistiques"><i class="fas fa-chart-bar"></i> Statistiques</a></li>
                </ul>
            </nav>
        </header>

        <main>
            <section id="section-creer" class="active-section">
                <h2><i class="fas fa-plus-circle"></i> Créer un nouvel acte de naissance</h2>
                <form id="form-acte-naissance">
                    <!-- Informations sur l'enfant -->
                    <fieldset>
                        <legend><i class="fas fa-baby"></i> Informations sur l'enfant</legend>
                        <div class="form-group">
                            <label for="nom-enfant" class="required-field">Nom de l'enfant:</label>
                            <input type="text" id="nom-enfant" required>
                        </div>
                        <div class="form-group">
                            <label for="prenom-enfant" class="required-field">Prénom(s) de l'enfant:</label>
                            <input type="text" id="prenom-enfant" required>
                        </div>
                        <div class="form-group">
                            <label for="date-naissance" class="required-field">Date de naissance:</label>
                            <input type="date" id="date-naissance" required>
                        </div>
                        <div class="form-group">
                            <label for="heure-naissance" class="required-field">Heure de naissance:</label>
                            <input type="time" id="heure-naissance" required>
                        </div>
                        <div class="form-group">
                            <label for="lieu-naissance" class="required-field">Lieu de naissance:</label>
                            <input type="text" id="lieu-naissance" placeholder="Ville, hôpital ou domicile" required>
                        </div>
                        <div class="form-group">
                            <label for="sexe-enfant" class="required-field">Sexe de l'enfant:</label>
                            <select id="sexe-enfant" required>
                                <option value="">Sélectionner</option>
                                <option value="masculin">Masculin</option>
                                <option value="feminin">Féminin</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="id-enfant" class="required-field">Numéro d'enregistrement:</label>
                            <input type="text" id="id-enfant" required>
                        </div>
                    </fieldset>

                    <!-- Informations sur la mère -->
                    <fieldset>
                        <legend><i class="fas fa-female"></i> Informations sur la mère</legend>
                        <div class="form-group">
                            <label for="nom-mere" class="required-field">Nom de naissance:</label>
                            <input type="text" id="nom-mere" required>
                        </div>
                        <div class="form-group">
                            <label for="prenom-mere" class="required-field">Prénom(s):</label>
                            <input type="text" id="prenom-mere" required>
                        </div>
                        <div class="form-group">
                            <label for="date-naissance-mere" class="required-field">Date de naissance:</label>
                            <input type="date" id="date-naissance-mere" required>
                        </div>
                        <div class="form-group">
                            <label for="lieu-naissance-mere" class="required-field">Lieu de naissance:</label>
                            <input type="text" id="lieu-naissance-mere" required>
                        </div>
                        <div class="form-group">
                            <label for="adresse-mere" class="required-field">Adresse:</label>
                            <textarea id="adresse-mere" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="secu-mere">Numéro de sécurité sociale (facultatif):</label>
                            <input type="text" id="secu-mere">
                        </div>
                    </fieldset>

                    <!-- Informations sur le père -->
                    <fieldset>
                        <legend><i class="fas fa-male"></i> Informations sur le père</legend>
                        <div class="form-group">
                            <label for="nom-pere">Nom:</label>
                            <input type="text" id="nom-pere">
                        </div>
                        <div class="form-group">
                            <label for="prenom-pere">Prénom(s):</label>
                            <input type="text" id="prenom-pere">
                        </div>
                        <div class="form-group">
                            <label for="date-naissance-pere">Date de naissance:</label>
                            <input type="date" id="date-naissance-pere">
                        </div>
                        <div class="form-group">
                            <label for="lieu-naissance-pere">Lieu de naissance:</label>
                            <input type="text" id="lieu-naissance-pere">
                        </div>
                        <div class="form-group">
                            <label for="filiation">Lien de filiation:</label>
                            <select id="filiation">
                                <option value="">Non spécifié</option>
                                <option value="mariage">Mariage</option>
                                <option value="reconnaissance">Reconnaissance</option>
                            </select>
                        </div>
                    </fieldset>

                    <!-- Informations sur le déclarant -->
                    <fieldset>
                        <legend><i class="fas fa-user-edit"></i> Informations sur le déclarant</legend>
                        <div class="form-group">
                            <label for="nom-declarant" class="required-field">Nom du déclarant:</label>
                            <input type="text" id="nom-declarant" required>
                        </div>
                        <div class="form-group">
                            <label for="prenom-declarant" class="required-field">Prénom(s) du déclarant:</label>
                            <input type="text" id="prenom-declarant" required>
                        </div>
                        <div class="form-group">
                            <label for="qualite-declarant" class="required-field">Qualité du déclarant:</label>
                            <select id="qualite-declarant" required>
                                <option value="">Sélectionner</option>
                                <option value="pere">Père</option>
                                <option value="mere">Mère</option>
                                <option value="medecin">Médecin</option>
                                <option value="sage-femme">Sage-femme</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="signature-declarant" class="required-field">Signature du déclarant:</label>
                            <div class="signature-container">
                                <canvas id="signature-canvas" width="400" height="200"></canvas>
                                <button type="button" id="clear-signature" class="btn btn-secondary">Effacer</button>
                            </div>
                        </div>
                    </fieldset>

                    <!-- Informations de l'officier d'état civil -->
                    <fieldset>
                        <legend><i class="fas fa-user-tie"></i> Officier d'état civil</legend>
                        <div class="form-group">
                            <label for="nom-officier" class="required-field">Nom de l'officier:</label>
                            <input type="text" id="nom-officier" required>
                        </div>
                        <div class="form-group">
                            <label for="prenom-officier" class="required-field">Prénom(s) de l'officier:</label>
                            <input type="text" id="prenom-officier" required>
                        </div>
                        <div class="form-group">
                            <label for="signature-officier" class="required-field">Signature de l'officier:</label>
                            <input type="file" id="signature-officier" accept="image/*" required>
                        </div>
                        <div class="form-group">
                            <label for="numero-enregistrement" class="required-field">Numéro d'enregistrement:</label>
                            <input type="text" id="numero-enregistrement" required>
                        </div>
                        <div class="form-group">
                            <label for="date-etablissement" class="required-field">Date d'établissement:</label>
                            <input type="date" id="date-etablissement" required>
                        </div>
                        <div class="form-group">
                            <label for="cachet-mairie" class="required-field">Cachet de la mairie:</label>
                            <input type="file" id="cachet-mairie" accept="image/*" required>
                        </div>
                    </fieldset>

                    <!-- Documents justificatifs -->
                    <fieldset>
                        <legend><i class="fas fa-file-upload"></i> Documents justificatifs</legend>
                        <div class="form-group">
                            <label for="certificat-medical">Certificat de naissance médical:</label>
                            <input type="file" id="certificat-medical" accept=".pdf,.jpg,.jpeg,.png">
                        </div>
                        <div class="form-group">
                            <label for="piece-identite">Pièces d'identité des parents:</label>
                            <input type="file" id="piece-identite" accept=".pdf,.jpg,.jpeg,.png" multiple>
                        </div>
                        <div class="form-group">
                            <label for="certificat-mariage">Certificat de mariage (si applicable):</label>
                            <input type="file" id="certificat-mariage" accept=".pdf,.jpg,.jpeg,.png">
                        </div>
                    </fieldset>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Enregistrer</button>
                        <button type="reset" class="btn btn-secondary"><i class="fas fa-undo"></i>
                            Réinitialiser</button>
                        <button type="button" id="btn-generer-pdf" class="btn btn-success"><i
                                class="fas fa-file-pdf"></i> Générer PDF</button>
                    </div>
                </form>
            </section>
        </main>

        <footer>
            <p>Système de gestion des actes de naissance &copy; 2023</p>
            <p>Conforme aux exigences légales françaises</p>
        </footer>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import SignaturePad from 'signature_pad';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Importez jspdf-autotable pour l'utiliser

let signaturePad;
let canvas;

onMounted(() => {
    canvas = document.getElementById('signature-canvas');
    signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)'
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.getElementById('clear-signature').addEventListener('click', function () {
        signaturePad.clear();
    });

    document.getElementById('btn-generer-pdf').addEventListener('click', function () {
        generatePDF();
    });

    // Navigation entre les sections
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Retirer la classe active de tous les liens
            navLinks.forEach(l => l.classList.remove('active'));

            // Ajouter la classe active au lien cliqué
            this.classList.add('active');

            // Cacher toutes les sections
            sections.forEach(section => section.classList.remove('active-section'));

            // Afficher la section correspondante
            const targetSectionId = this.id.replace('nav-', 'section-');
            document.getElementById(targetSectionId).classList.add('active-section');
        });
    });
});

onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas);
});

function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear();
}

function generatePDF() {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    doc.setProperties({
        title: 'Acte de Naissance',
        subject: 'Document officiel',
        author: 'Mairie',
        keywords: 'naissance, acte, officiel',
        creator: 'Système de gestion des actes'
    });

    doc.setFontSize(18);
    doc.setTextColor(67, 97, 238);
    doc.setFont('helvetica', 'bold');
    doc.text('ACTE DE NAISSANCE', 105, 20, { align: 'center' });

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(14);
    doc.setTextColor(63, 55, 201);
    doc.text('INFORMATIONS SUR L\'ENFANT', 20, 35);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nom: ${document.getElementById('nom-enfant').value || 'Non renseigné'}`, 20, 45);
    doc.text(`Prénom(s): ${document.getElementById('prenom-enfant').value || 'Non renseigné'}`, 20, 55);
    doc.text(`Date de naissance: ${formatDateForPDF(document.getElementById('date-naissance').value)}`, 20, 65);
    doc.text(`Heure de naissance: ${document.getElementById('heure-naissance').value || 'Non renseigné'}`, 20, 75);
    doc.text(`Lieu de naissance: ${document.getElementById('lieu-naissance').value || 'Non renseigné'}`, 20, 85);
    doc.text(`Sexe: ${document.getElementById('sexe-enfant').value === 'masculin' ? 'Masculin' : 'Féminin'}`, 20, 95);
    doc.text(`Numéro d'enregistrement: ${document.getElementById('id-enfant').value || 'Non renseigné'}`, 20, 105);

    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(63, 55, 201);
    doc.text('INFORMATIONS SUR LES PARENTS', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Mère:', 20, 30);
    doc.text(`Nom: ${document.getElementById('nom-mere').value || 'Non renseigné'}`, 30, 40);
    doc.text(`Prénom(s): ${document.getElementById('prenom-mere').value || 'Non renseigné'}`, 30, 50);
    doc.text(`Date de naissance: ${formatDateForPDF(document.getElementById('date-naissance-mere').value)}`, 30, 60);
    doc.text(`Lieu de naissance: ${document.getElementById('lieu-naissance-mere').value || 'Non renseigné'}`, 30, 70);
    doc.text(`Adresse: ${document.getElementById('adresse-mere').value || 'Non renseigné'}`, 30, 80);
    if (document.getElementById('secu-mere').value) {
        doc.text(`Numéro de sécurité sociale: ${document.getElementById('secu-mere').value}`, 30, 90);
    }

    doc.text('Père:', 20, 110);
    doc.text(`Nom: ${document.getElementById('nom-pere').value || 'Non renseigné'}`, 30, 120);
    doc.text(`Prénom(s): ${document.getElementById('prenom-pere').value || 'Non renseigné'}`, 30, 130);
    if (document.getElementById('date-naissance-pere').value) {
        doc.text(`Date de naissance: ${formatDateForPDF(document.getElementById('date-naissance-pere').value)}`, 30, 140);
    }
    if (document.getElementById('lieu-naissance-pere').value) {
        doc.text(`Lieu de naissance: ${document.getElementById('lieu-naissance-pere').value}`, 30, 150);
    }
    if (document.getElementById('filiation').value) {
        doc.text(`Lien de filiation: ${document.getElementById('filiation').value === 'mariage' ? 'Mariage' : 'Reconnaissance'}`, 30, 160);
    }

    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(63, 55, 201);
    doc.text('INFORMATIONS SUR LE DÉCLARANT', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom: ${document.getElementById('nom-declarant').value || 'Non renseigné'}`, 20, 30);
    doc.text(`Prénom(s): ${document.getElementById('prenom-declarant').value || 'Non renseigné'}`, 20, 40);
    doc.text(`Qualité: ${document.getElementById('qualite-declarant').value || 'Non renseigné'}`, 20, 50);

    if (!signaturePad.isEmpty()) {
        const signatureData = signaturePad.toDataURL();
        doc.addImage(signatureData, 'PNG', 20, 60, 60, 30);
        doc.text('Signature du déclarant', 20, 100);
    }

    doc.setFontSize(14);
    doc.setTextColor(63, 55, 201);
    doc.text('OFFICIER D\'ÉTAT CIVIL', 20, 120);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nom: ${document.getElementById('nom-officier').value || 'Non renseigné'}`, 20, 130);
    doc.text(`Prénom(s): ${document.getElementById('prenom-officier').value || 'Non renseigné'}`, 20, 140);
    doc.text(`Numéro d'enregistrement: ${document.getElementById('numero-enregistrement').value || 'Non renseigné'}`, 20, 150);
    doc.text(`Date d'établissement: ${formatDateForPDF(document.getElementById('date-etablissement').value)}`, 20, 160);

    const signatureOfficier = document.getElementById('signature-officier').files[0];
    const cachetMairie = document.getElementById('cachet-mairie').files[0];

    const savePdf = () => {
        doc.save('acte_naissance.pdf');
    };

    let imagesToLoad = 0;
    let imagesLoaded = 0;

    const loadImage = (file, x, y, width, height, text) => {
        return new Promise((resolve) => {
            if (file) {
                imagesToLoad++;
                const reader = new FileReader();
                reader.onload = function (e) {
                    doc.addImage(e.target.result, 'JPEG', x, y, width, height);
                    doc.text(text, x, y + height + 5);
                    imagesLoaded++;
                    resolve();
                };
                reader.readAsDataURL(file);
            } else {
                resolve();
            }
        });
    };

    Promise.all([
        loadImage(signatureOfficier, 120, 130, 60, 30, 'Signature de l\'officier'),
        loadImage(cachetMairie, 120, 180, 60, 30, 'Cachet de la mairie')
    ]).then(() => {
        savePdf();
    });
}

function formatDateForPDF(dateString) {
    if (!dateString) return 'Non renseigné';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}
</script>

<style scoped>
:root {
    --primary-color: #4361ee;
    --secondary-color: #3f37c9;
    --accent-color: #4895ef;
    --light-color: #f8f9fa;
    --dark-color: #212529;
    --success-color: #4cc9f0;
    --warning-color: #f72585;
    --info-color: #7209b7;
    --danger-color: #ef233c;
    --gray-color: #6c757d;
    --white: #ffffff;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --border-radius: 8px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f5f7fb;
    color: var(--dark-color);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
header {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--white);
    padding: 1.5rem 0;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
}

header h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 2.2rem;
    font-weight: 600;
}

header h1 i {
    margin-right: 0.8rem;
    color: var(--white);
}

/* Navigation */
nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
    flex-wrap: wrap;
}

nav ul li {
    margin: 0.5rem;
}

nav ul li a {
    color: var(--white);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1.2rem;
    border-radius: 50px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(255, 255, 255, 0.1);
}

nav ul li a:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

nav ul li a.active {
    background-color: var(--white);
    color: var(--primary-color);
    box-shadow: var(--shadow);
}

/* Main Sections */
section {
    background-color: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
    display: none;
}

section.active-section {
    display: block;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

section h2 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    border-bottom: 2px solid var(--accent-color);
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

/* Form Styles */
form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

fieldset {
    border: 1px solid #e0e0e0;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    background-color: rgba(248, 249, 250, 0.5);
    transition: all 0.3s ease;
}

fieldset:hover {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 1px var(--accent-color);
}

legend {
    padding: 0 1rem;
    font-weight: 600;
    color: var(--secondary-color);
    font-size: 1.2rem;
    background-color: var(--white);
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.form-group {
    margin-bottom: 1.2rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--dark-color);
}

.required-field::after {
    content: " *";
    color: var(--warning-color);
}

.form-group input[type="text"],
.form-group input[type="date"],
.form-group input[type="time"],
.form-group input[type="file"],
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(72, 149, 239, 0.2);
    outline: none;
}

.form-group textarea {
    min-height: 100px;
    resize: vertical;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
}

/* Signature Styles */
.signature-container {
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: var(--white);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

#signature-canvas {
    border: 1px solid #eee;
    background-color: #f9f9f9;
    margin-bottom: 1rem;
    width: 100%;
    height: 150px;
    touch-action: none;
}

/* Button Styles */
.btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: var(--shadow);
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn:active {
    transform: translateY(0);
}

.btn-primary {
    background-color: var(--primary-color);
    color: var(--white);
}

.btn-primary:hover {
    background-color: #3a56d8;
}

.btn-secondary {
    background-color: var(--gray-color);
    color: var(--white);
}

.btn-secondary:hover {
    background-color: #5a6268;
}

.btn-success {
    background-color: var(--success-color);
    color: var(--white);
}

.btn-success:hover {
    background-color: #3db5d8;
}

.btn-danger {
    background-color: var(--danger-color);
    color: var(--white);
}

.btn-danger:hover {
    background-color: #d90429;
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
}

/* Footer */
footer {
    text-align: center;
    padding: 1.5rem 0;
    color: var(--gray-color);
    font-size: 0.9rem;
    margin-top: 3rem;
    border-top: 1px solid #eee;
}

/* Responsive Design */
@media (max-width: 768px) {
    header h1 {
        font-size: 1.8rem;
    }

    section {
        padding: 1.5rem;
    }

    fieldset {
        padding: 1.2rem;
    }

    .form-actions {
        justify-content: center;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }

    #signature-canvas {
        height: 120px;
    }
}

@media (max-width: 576px) {
    header h1 {
        font-size: 1.5rem;
    }

    section h2 {
        font-size: 1.4rem;
    }

    .container {
        padding: 0 15px;
    }

    legend {
        font-size: 1rem;
    }

    .form-group input[type="text"],
    .form-group input[type="date"],
    .form-group input[type="time"],
    .form-group input[type="file"],
    .form-group select,
    .form-group textarea {
        padding: 0.7rem;
    }
}

/* Animation for form elements */
.form-group {
    animation: slideUp 0.5s ease;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>