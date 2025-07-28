import { Request, Response } from 'express';
import User from '../models/User.model';
import UserRequest from '../models/UserRequest.model';

const profileController = {
    getUserProfile: async (req: Request, res: Response) => {
        try {
            const user = await User.findByPk(req.user!.id, {
                attributes: { exclude: ['password', 'verificationToken'] }
            });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération du profil.', error });
        }
    },

    updateUserProfile: async (req: Request, res: Response) => {
        const { firstName, lastName, phone } = req.body;

        try {
            const user = await User.findByPk(req.user!.id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.phone = phone === undefined ? user.phone : phone;

            await user.save();
            
            const userResponse = { ...user.get({ plain: true }) };
            delete (userResponse as any).password;
            delete (userResponse as any).verificationToken;

            res.status(200).json(userResponse);
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la mise à jour du profil.', error });
        }
    },

    getUserRequests: async (req: Request, res: Response) => {
        try {
            const requests = await UserRequest.findAll({ where: { userId: req.user!.id } });
            res.status(200).json(requests);
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération des demandes.', error });
        }
    },

    createUserRequest: async (req: Request, res: Response) => {
        const { type, title, description } = req.body;

        try {
            const newRequest = await UserRequest.create({
                userId: req.user!.id,
                type,
                title,
                description,
                status: 'pending',
                requestDate: new Date()
            });
            res.status(201).json(newRequest);
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la création de la demande.', error });
        }
    }
};

export default profileController;