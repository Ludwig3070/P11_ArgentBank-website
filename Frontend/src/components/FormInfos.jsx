import { useSelector,useDispatch  } from "react-redux";
import usePushUserName from "../hooks/UsePushUserName";
import { validateUserInfos } from "../redux/redux";
import { useState,useEffect } from "react";



export default function FormInfos() {
  
  const dispatch = useDispatch();
  const storedUserName = useSelector((state)=>state.profil.userName) ?? ""; // Fournit une valeur par défaut
  const [localUserName, setLocalUserName] = useState(storedUserName);// État local pour gérer le userName
  const firstName = useSelector((state)=>state.profil.firstName)?? ""; // Fournit une valeur par défaut
  const lastName = useSelector((state)=>state.profil.lastName)?? ""; // Fournit une valeur par défaut 
  const { loading, userNamePushProfile } = usePushUserName(localUserName); // Utilisation du hook personnalisé
  
  useEffect(() => {
    setLocalUserName(storedUserName);
  }, [storedUserName]); // Synchronisation de l'état local avec le store

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localUserName.trim() === "") {
      alert("UserName cannot be empty");
      return;
    }
    userNamePushProfile(); // Appel de la fonction pour envoyer le nom d'utilisateur au serveur
  };
  const handleChange = (e) => {
    setLocalUserName(e.target.value); // Mise à jour de l'état local du userName
    console.log("///////////localUserName:", localUserName)
  };
 
  return (
    <form onSubmit={handleSubmit} className="form-infos">
      <div className="form-infos-div">
        <label htmlFor="username">UserName:</label>
        <input
          type="text"
          id="username"
          value={localUserName}
          onChange={handleChange} // Ajout de la gestion de changement         
        />
      </div>
      <div className="form-infos-div">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          disabled="disabled"
        />
      </div>
      <div className="form-infos-div">
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} disabled="disabled" />
      </div>
      <div>
        <button 
        type="submit" 
        className="edit-button edit-button2" 
        disabled={loading} // Désactivation du bouton pendant le chargement      
        >
          {loading ? "Loading..." : "Save"}
        </button>
        <button
          type="button"
          className="edit-button edit-button2"
          onClick={(e) => dispatch(validateUserInfos())}// toggle le flag dans le store
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
