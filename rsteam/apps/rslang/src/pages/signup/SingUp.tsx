import React, { useContext, useState } from 'react';
import Footer from '../../components/UI/footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/UI/password-input/PasswordInput';
import { AuthContext } from '../../context';
import Loader from '../../components/UI/loader/Loader';
import axios from 'axios';

const SingUp = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    setIsLoaded(true);

    try {
      if (isError) {
        setIsError(false);
        setErrMessage('');
      }

      const response = await axios({
        url: 'https://react-learnwords-rs.herokuapp.com/users',
        method: 'post',
        headers: { "Content-Type": "application/json"},
        data: {
          name,
          email,
          password: pswd
        }
      });

      setIsLoaded(false);

      if (isError) {
        setIsError(false);
        setErrMessage('');
      }

      navigate('/login');
    } catch (error) {
      setIsLoaded(false);
      setIsError(true);

      if (error.response?.data?.error?.errors[0]?.message) {
        setErrMessage(error.response.data.error.errors[0].message);
      } else {
        setErrMessage(error.message);
      }
    }
  };

  return (
    <div className='container-wrapper'>
      <main className='login main'>
        <div className='login__form-column'>
          <form className='login-form' onSubmit={createUser}>
            <h1 className='login-form__title'>Регистрация</h1>
            <p className='login-form__subtitle'>Заполни поля ниже, чтобы создать аккаунт RsLang</p>
            <label className='login-form__label login-form__label_is_margin-top' htmlFor="name" >Имя</label>
            <input className='login-form__input' type="text" id='name' autoComplete='' required value={name} onChange={(e) => setName(e.target.value)} />
            <label className='login-form__label' htmlFor="email">Email</label>
            <input className='login-form__input' type="text" id='email' autoComplete='' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className='login-form__label' htmlFor="password">Пароль</label>

            <PasswordInput setPswd={setPswd} />

            {
              isLoaded
              ? <div className='login-form__loader'>
                <Loader />
              </div>
              : <p className='login-form__error'>{isError ? errMessage : ''}</p>
            }

            <button className={isLoaded? 'login-form__btn btn login-form__btn_is_disabled' : 'login-form__btn btn'}>Создать аккаунт</button>
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