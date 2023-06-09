import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:8080/users/login', data);
      if (response.status === 200) {
        const token = response.data.user.token;
        //id
        const idUser = response.data.user.id;
        Cookies.set('id', idUser);

        // Stocker le jeton dans un cookie
        Cookies.set('token', token);

        // Authentifié, redirection vers la page de profil
        router.push('/profile');
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error(error);
      setLoginError(true);
    }
  };

  return (
    <div>
      <p>Login</p>
      {loginError && <p>Erreur lors de la connection(verifiez votre mail et votre mot de passe)</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Mail</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <p>Adresse mail requis</p>}
        </div>
        <br />
        <div>
          <label>Mot de passe</label>
          <input {...register('password', { required: true })} />
          {errors.password && <p>Mot de passe requis</p>}
        </div>
        <br />
        <button type="submit">Se connecter</button>
      </form>
      <br />
      <a href="/sign-up">Sign up</a>
    </div>
  );
};

export default LoginForm;