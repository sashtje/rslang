import React from 'react';
import Footer from '../../components/UI/footer/Footer';
import { Link } from 'react-router-dom';
import PasswordInput from '../../components/UI/password-input/PasswordInput';

const Login = () => {
  return (
    <div className='container-wrapper'>
      <main className='login main'>
        <div className='login__form-column'>
          <form className='login__form login-form' action="">
            <h1 className='login-form__title'>Уже с нами?</h1>
            <label className='login-form__label login-form__label_is_margin-top' htmlFor="email">Email</label>
            <input className='login-form__input' type="text" id='email' autoComplete='' />
            <label className='login-form__label' htmlFor="password">Пароль</label>
            <PasswordInput />
            <p className='login-form__error'></p>
            <button className='login-form__btn btn' type='button'>Войти в аккаунт</button>
            <p className='login-form__question'>Ещё не с нами? <Link className='login-form__link' to='/sign-up'>Создать аккаунт</Link></p>
          </form>
        </div>

        <div className='login__picture'></div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;