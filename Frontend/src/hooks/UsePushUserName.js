import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fillProfil } from "../redux/redux";

export default function usePushUserName(userName) {
  const [loading, setLoading] = useState(false); // Initialisation de l'état local 'loading' à false
  const token = useSelector((state) => state.user.token); // Récupère le token utilisateur du store
  const profil = useSelector((state) => state.profil);
  const dispatch = useDispatch();

  // Fonction de connexion asynchrone
  const userNamePushProfile = async () => {
    if (token) {
      // Vérifie si le token existe
      try {
        setLoading(true); // Mise à jour de l'état 'loading' à true pour indiquer le début du chargement
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Ajoute le token d'autorisation dans les en-têtes
            },
            body: JSON.stringify({ userName: userName }), // Structure correcte du corps JSON
          }
        );
        if (!response.ok) {
          // Vérifie si la réponse de l'API est correcte
          const errorMessage = await response.text(); // Récupère le message d'erreur de la réponse
          throw new Error(`Failed to fetch profile: ${errorMessage}`); // Lance une erreur avec le message récupéré
        } else {
          const data = await response.json(); // Réponse JSON avec les données du profil
          const { email, firstName, lastName, userName, createdAt, id } =
          data.body; // Déstructure les données du profil
          
          dispatch(
            fillProfil({ email, firstName, lastName, userName, createdAt, id })
          ); // Met à jour le profil utilisateur dans le store Redux

          alert("le username a été modifié dans la base de données");
        }
      } catch (error) {
        alert(error.message + " \nTry Again Later"); // Affiche un message d'erreur combiné
      } finally {
        setLoading(false); // Réinitialise l'état 'loading' à false
        console.log("profil.state from userNamePush=", profil);
        
      }
    } else {
      alert("Token expired"); // Alerte si le token est expiré ou manquant
      setLoading(false); // Réinitialise l'état 'loading' à false
    }
  };

  return { loading, userNamePushProfile }; // Retourne l'état 'loading' et la fonction 'userNamePushProfile'
}
