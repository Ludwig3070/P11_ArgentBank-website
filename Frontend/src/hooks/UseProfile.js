import { useDispatch, useSelector } from "react-redux";
import { fillProfil } from "../redux/redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useProfile() {
  const [loading, setLoading] = useState(false); // Initialisation de l'état local 'loading' à false
  const dispatch = useDispatch(); // Initialisation de la fonction dispatch de Redux
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.user);

  // Fonction de connexion asynchrone
  // eslint-disable-next-line
  const userProfile = async () => {
    setLoading(true); // Mise à jour de l'état 'loading' à true pour indiquer le début du chargement
    if (loginState.token) {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginState.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json(); // attend la résolution de la promesse JSON
        if (data?.body) {
          const { email, firstName, lastName, userName, createdAt, id } =
            data.body;
          dispatch(
            fillProfil({ email, firstName, lastName, userName, createdAt, id })
          );
        } else {
          throw new Error("Profile data is invalid");
        }
      } catch (error) {
        alert(error.message + "\nTry Again Later");
        setLoading(false);
        navigate("/");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      navigate("/");
    }
  };
  return { loading, userProfile };
}
