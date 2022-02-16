import React, { useContext, useState } from 'react';
import Footer from '../../components/UI/footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/UI/password-input/PasswordInput';
import { AuthContext } from '../../context';
import Loader from '../../components/UI/loader/Loader';
import axios from 'axios';

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    setIsLoaded(true);

    try {
      if (isError) {
        setIsError(false);
        setErrMessage('');
      }

      const response = await axios({
        url: 'https://react-learnwords-rs.herokuapp.com/signin',
        method: 'post',
        headers: { "Content-Type": "application/json",
        "accept" : "application/json"},
        data: {
          email,
          password: pswd
        }
      });

      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('name', data.name);

      if (isError) {
        setIsError(false);
        setErrMessage('');
      }

      setIsLoaded(false);
      setIsAuth(true);
      navigate('/');
    } catch (error) {
      setIsLoaded(false);
      setIsError(true);

      if (error.response.status === 403) {
        setErrMessage(`${error.response.statusText}: Incorrect password`);
      } else {
        setErrMessage(`${error.response.statusText}: Couldn't find a user with such an email`);
      }
    }
  };

  return (
    <div className='container-wrapper'>
      <main className='login main'>
        <div className='login__form-column'>
          <form className='login__form login-form' onSubmit={login}>
            <h1 className='login-form__title'>Уже с нами?</h1>
            <label className='login-form__label login-form__label_is_margin-top' htmlFor="email">Email</label>
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

            <button className={isLoaded? 'login-form__btn btn login-form__btn_is_disabled' : 'login-form__btn btn'}>Войти в аккаунт</button>
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