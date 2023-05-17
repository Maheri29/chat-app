import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css';

type FormData = {
  nom: string;
  prenom: string;
  motDePasse: string;
  email: string;
};

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form className={styles['registration-form']} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nom</label>
        <input
          type="text"
          {...register('nom', { required: true })}
        />
        {errors.nom && <span>Enter your last name here please</span>}
      </div>

      <div>
        <label>Prénom</label>
        <input
          type="text"
          {...register('prenom', { required: true })}
        />
        {errors.prenom && <span>Enter your first name here please </span>}
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

      <input type="submit" value="S'inscrire" />
    </form>
  );
}

export default RegistrationForm;