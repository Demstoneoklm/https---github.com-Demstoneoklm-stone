import nodemailer from 'nodemailer';

// 🔄 Création du transporteur une seule fois à l'import
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// 📧 Fonction d'envoi d'email de confirmation
export const sendConfirmationEmail = async (email: string, token: string): Promise<void> => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmation Email',
        html: `<p>Your confirmation token: ${token}</p>`
    });
};
