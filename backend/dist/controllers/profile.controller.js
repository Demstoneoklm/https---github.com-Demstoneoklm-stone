"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = require("../models/User.model");
const UserRequest_model_1 = require("../models/UserRequest.model");
const profileController = {
    getUserProfile: async (req, res) => {
        try {
            const user = await User_model_1.User.findByPk(req.user.id, {
                attributes: { exclude: ['password', 'verificationToken'] }
            });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération du profil.', error });
        }
    },
    updateUserProfile: async (req, res) => {
        const { firstName, lastName, phone } = req.body;
        try {
            const user = await User_model_1.User.findByPk(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.phone = phone === undefined ? user.phone : phone;
            await user.save();
            const userResponse = { ...user.get({ plain: true }) };
            delete userResponse.password;
            delete userResponse.verificationToken;
            res.status(200).json(userResponse);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la mise à jour du profil.', error });
        }
    },
    getUserRequests: async (req, res) => {
        try {
            const requests = await UserRequest_model_1.UserRequest.findAll({ where: { userId: req.user.id } });
            res.status(200).json(requests);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération des demandes.', error });
        }
    },
    createUserRequest: async (req, res) => {
        const { type, title, description } = req.body;
        try {
            const newRequest = await UserRequest_model_1.UserRequest.create({
                userId: req.user.id,
                type,
                title,
                description,
                status: 'pending',
                requestDate: new Date()
            });
            res.status(201).json(newRequest);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la création de la demande.', error });
        }
    }
};
exports.default = profileController;
