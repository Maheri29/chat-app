import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css';

type FormData = {
  nom: string;
  prenom: string;
  motDePasse: string;
  confirmMotDePasse: string;
  email: string;
};

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch // Utilisez la fonction watch pour surveiller les valeurs des champs
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const password = watch('motDePasse'); // Récupère la valeur du champ "motDePasse"

  return (
    <form className={styles['registration-form']} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Pseudo</label>
        <input
          type="text"
          {...register('nom', { required: true })}
        />
        {errors.nom && <span>Enter your last name here please</span>}
      </div>



      <div>
        <label>Email</label>
        <input
          type="email"
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i
          })}
        />
        {errors.email && <span>Invalid mail adress</span>}
      </div>

      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          {...register('motDePasse', { required: true })}
        />
        {errors.motDePasse && <span>Enter a password here please</span>}
      </div>
 
      <div>
        <label>Confirmer le mot de passe</label>
        <input
          type="password"
          {...register('confirmMotDePasse', {
            required: true,
            validate: (value) => value === password // Vérifie si la valeur correspond à celle du champ "motDePasse"
          })}
        />
        {errors.confirmMotDePasse && <span>Les mots de passe ne correspondent pas</span>}
      </div>

      <input type="submit" value="S'inscrire" />
    </form>
  );
}

export default RegistrationForm;