import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from '../styles/Home.module.css';

type FormData = {
  nom: string;
  prenom: string;
  motDePasse: string;
  confirmMotDePasse: string;
  email: string;
};

const schema = yup.object().shape({
  nom: yup.string().required('Le nom est requis'),
  prenom: yup.string().required('Le prénom est requis'),
  motDePasse: yup.string().required('Le mot de passe est requis'),
  confirmMotDePasse: yup
    .string()
    .oneOf([yup.ref('motDePasse')], 'Les mots de passe ne correspondent pas')
    .required('La confirmation du mot de passe est requise'),
  email: yup.string().required("L'email est requis").email("L'email n'est pas valide"),
});

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const password = watch('motDePasse');

  const validatePasswordMatch = (value: string) => {
    return value === password || 'Les mots de passe ne correspondent pas';
  };

  return (
    <form className={styles['registration-form']} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Pseudo</label>
        <input type="text" {...register('nom')} />
        {errors.nom && <span>{errors.nom.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Mot de passe</label>
        <input type="password" {...register('motDePasse')} />
        {errors.motDePasse && <span>{errors.motDePasse.message}</span>}
      </div>

      <div>
        <label>Confirmer le mot de passe</label>
        <input type="password" {...register('confirmMotDePasse', { validate: validatePasswordMatch })} />
        {errors.confirmMotDePasse && <span>{errors.confirmMotDePasse.message}</span>}
      </div>

      <input type="submit" value="S'inscrire" />
    </form>
  );
}

export default RegistrationForm;