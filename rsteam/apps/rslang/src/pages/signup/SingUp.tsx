import React, {useState} from 'react';
import Footer from '../../components/UI/footer/Footer';
import { Link } from 'react-router-dom';
import PasswordInput from '../../components/UI/password-input/PasswordInput';

const SingUp = () => {
  return (
    <div className='container-wrapper'>
      <main className='login main'>
        <div className='login__form-column'>
          <form className='login-form' action="">
            <h1 className='login-form__title'>Регистрация</h1>
            <p className='login-form__subtitle'>Заполни поля ниже, чтобы создать аккаунт RsLang</p>
            <label className='login-form__label login-form__label_is_margin-top' htmlFor="name" >Имя</label>
            <input className='login-form__input' type="text" id='name' autoComplete='' />
            <label className='login-form__label' htmlFor="email">Email</label>
            <input className='login-form__input' type="text" id='email' autoComplete='' />
            <label className='login-form__label' htmlFor="password">Пароль</label>
            <PasswordInput />
            <p className='login-form__error'></p>
            <button className='login-form__btn btn'  type='button'>Создать аккаунт</button>
            <p className='login-form__question'>Уже с нами? <Link className='login-form__link' to='/login'>Войти в аккаунт</Link></p>
          </form>
        </div>

        <div className='login__picture'></div>
      </main>
      <Footer />
    </div>
  );
};

export default SingUp;