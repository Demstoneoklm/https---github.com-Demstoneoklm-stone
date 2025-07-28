import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuration du transporteur email
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Vérification de la configuration email au démarrage
export const verifyEmailConfig = async (): Promise<boolean> => {
    try {
        await transporter.verify();
        console.log('✅ Configuration email vérifiée');
        return true;
    } catch (error) {
        console.warn('⚠️  Configuration email non disponible:', error);
        return false;
    }
};

export const sendConfirmationEmail = async (email: string, token: string): Promise<void> => {
    const confirmationUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmez votre compte Stone Admin',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Bienvenue sur Stone Admin !</h2>
                <p>Merci de vous être inscrit. Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${confirmationUrl}" 
                       style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Confirmer mon compte
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                    Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
                    <a href="${confirmationUrl}">${confirmationUrl}</a>
                </p>
                <p style="color: #666; font-size: 14px;">
                    Ce lien expire dans 24 heures.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email de confirmation envoyé à ${email}`);
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
        throw new Error('Erreur lors de l\'envoi de l\'email de confirmation');
    }
};

export const sendPasswordResetEmail = async (email: string, token: string): Promise<void> => {
    const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Réinitialisation de votre mot de passe - Stone Admin',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Réinitialisation de mot de passe</h2>
                <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour continuer :</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" 
                       style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Réinitialiser mon mot de passe
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                    Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
                    <a href="${resetUrl}">${resetUrl}</a>
                </p>
                <p style="color: #666; font-size: 14px;">
                    Ce lien expire dans 1 heure.
                </p>
                <p style="color: #666; font-size: 14px;">
                    Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email de réinitialisation envoyé à ${email}`);
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
        throw new Error('Erreur lors de l\'envoi de l\'email de réinitialisation');
    }
};

export const sendWelcomeEmail = async (email: string, firstName: string): Promise<void> => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Bienvenue sur Stone Admin !',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Bienvenue ${firstName} !</h2>
                <p>Votre compte Stone Admin a été activé avec succès.</p>
                <p>Vous pouvez maintenant vous connecter et profiter de toutes les fonctionnalités de la plateforme.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.BASE_URL}/login" 
                       style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Se connecter
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                    Merci de nous faire confiance !
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Email de bienvenue envoyé à ${email}`);
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
        // Ne pas faire échouer le processus si l'email de bienvenue ne peut pas être envoyé
    }
};