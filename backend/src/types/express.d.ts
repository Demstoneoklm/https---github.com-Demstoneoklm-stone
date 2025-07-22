import { User } from '../models/user.model'; // Adaptez au chemin réel de votre modèle User

declare global {
    namespace Express {
        interface Request {
            user?: User; // Ou un type plus simple si vous n'avez pas de modèle User complet
        }
    }
}