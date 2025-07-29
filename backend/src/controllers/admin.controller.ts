import { Request, Response } from 'express';
import { User } from '../models/User.model';
import { Document } from '../models/Document.model';
import { InventoryItem } from '../models/InventoryItem.model';
import { UserRequest } from '../models/UserRequest.model';
import bcrypt from 'bcrypt';

// Helper function to hash password
const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const adminController = {
    getUsers: async (req: Request, res: Response) => {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password', 'verificationToken'] }
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération des utilisateurs.', error });
        }
    },

    createUser: async (req: Request, res: Response) => {
        const { email, password, firstName, lastName, role, department, phone } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'Veuillez fournir au moins un email, un mot de passe, un prénom et un nom.' });
        }

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà.' });
            }

            const hashedPassword = await hashPassword(password);

            const newUser = await User.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: role || 'employee',
                department,
                phone,
                isVerified: true 
            });

            const userResponse = { ...newUser.get({ plain: true }) };
            delete (userResponse as any).password;
            delete (userResponse as any).verificationToken;

            res.status(201).json(userResponse);
        } catch (error) {
            res.status(500).json({ message: "Erreur du serveur lors de la création de l'utilisateur.", error });
        }
    },

    updateUser: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { email, firstName, lastName, role, department, phone, isVerified } = req.body;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            if (email && email !== user.email) {
                const existingUser = await User.findOne({ where: { email } });
                if (existingUser) {
                    return res.status(409).json({ message: 'Cet email est déjà utilisé par un autre utilisateur.' });
                }
            }

            user.email = email || user.email;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.role = role || user.role;
            user.department = department === undefined ? user.department : department;
            user.phone = phone === undefined ? user.phone : phone;
            if (isVerified !== undefined) {
                user.isVerified = isVerified;
            }

            await user.save();
            
            const userResponse = { ...user.get({ plain: true }) };
            delete (userResponse as any).password;
            delete (userResponse as any).verificationToken;

            res.status(200).json(userResponse);
        } catch (error) {
            res.status(500).json({ message: "Erreur du serveur lors de la mise à jour de l'utilisateur.", error });
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            await user.destroy();
            res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
        } catch (error) {
            res.status(500).json({ message: "Erreur du serveur lors de la suppression de l'utilisateur.", error });
        }
    },

    getDashboardStats: async (req: Request, res: Response) => {
        try {
            const totalUsers = await User.count();
            const totalDocuments = await Document.count();
            const totalInventoryItems = await InventoryItem.count();
            const pendingRequests = await UserRequest.count({ where: { status: 'pending' } });

            res.status(200).json({
                totalUsers,
                totalDocuments,
                totalInventoryItems,
                pendingRequests
            });
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération des statistiques.', error });
        }
    }
};

export default adminController;