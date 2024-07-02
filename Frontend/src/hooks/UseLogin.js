import { useState } from "react"; // Importation du hook useState de React
import { useDispatch } from "react-redux"; // Importation du hook useDispatch de Redux
import { loginRequest, loginFailure, loginSuccess } from "../redux/redux.js"; // Importation des actions Redux pour la gestion de la connexion


// Fonction personnalisée de hook pour gérer la connexion
export default function useLogin(username, password) {
  const [loading, setLoading] = useState(false); // Initialisation de l'état local 'loading' à false
  const dispatch = useDispatch(); // Initialisation de la fonction dispatch de Redux

  // Fonction de connexion asynchrone
  const login = async () => {
    setLoading(true); // Mise à jour de l'état 'loading' à true pour indiquer le début du chargement
    dispatch(
      loginRequest({ username, password }) // Dispatch de l'action de requête de connexion avec le username et le password
    );
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login/", {
        method: "POST", // Méthode HTTP POST
        headers: {
          "Content-Type": "application/json", // Définition du type de contenu à JSON
        },
        body: JSON.stringify({
          email: username, // Conversion du username en email pour l'API
          password: password, // Mot de passe
        }),
      });

      const data = await response.json(); // Conversion de la réponse en JSON

      if (data?.body?.token) {
        // Vérification de la présence du token dans la réponse
        dispatch(
          loginSuccess({ token: data.body.token, response: data.message }) // Dispatch de l'action de succès de connexion avec le token et le message de réponse
        );
      } else {
        data ? alert(data.message) : alert("server not reachable"); // Affichage d'une alerte si le serveur n'est pas joignable ou si un message est présent
        dispatch(
          loginFailure({
            error: "Token not found", // Erreur de token non trouvé
            response: data?.message || "server not reachable", // Message d'erreur
          })
        );
      }
    } catch {
      alert("server not reachable\ntry again later");
    } finally {
      setLoading(false); // Mise à jour de l'état 'loading' à false pour indiquer la fin du chargement
    }
  };

  // Retourner l'état 'loading' et la fonction 'login'
  return { loading, login };
}
