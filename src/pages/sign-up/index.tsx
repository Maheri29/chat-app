import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';



const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [signupError, setSignupError] = useState(false);
  

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setSignupError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/', data);
      if (response.status === 201) {
        const token = response.data.user.token;
        const idUser = response.data.user.id;
        Cookies.set('id', idUser);
        Cookies.set('token', token);
        router.push('/profile');
      } else {
        setSignupError(true);
      }
    } catch (error) {
      console.error(error);
      setSignupError(true);
    }
      useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById('root');
      // Faire quelque chose avec l'élément si nécessaire
    }
  }, []);
  };

  return (
    <div>
      <p>Sign Up</p>
      {signupError && <p>Erreur lors de l'inscription</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Mail</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <p>Adresse mail requis</p>}
        </div>
        <br />
        <div>
          <label>Nom</label>
          <input {...register('name', { required: true })} />
          {errors.name && <p>Nom requis</p>}
        </div>
        <br />
        <div>
          <label>Mot de passe</label>
          <input {...register('password', { required: true })} />
          {errors.password && <p>Veuillez saisir un mot de passe</p>}
        </div>
        <br />
        <div>
          <label>Confirmer votre mot de passe</label>
          <input {...register('confirmPassword', { required: true })} />
          {errors.confirmPassword && <p>Veuillez resaisir le mot de passe</p>}
          {signupError && <p>Passwords do not match</p>}
        </div>
        <br />
        <button type="submit">S'inscrire</button>
      </form>
      <br />
      <p>
        <a href="/login">Log In</a>
      </p>
    </div>
  );
};





export default RegistrationForm;

function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
