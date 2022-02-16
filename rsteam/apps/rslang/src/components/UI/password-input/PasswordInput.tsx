import React, { useState } from 'react';

const PasswordInput = ({setPswd}) => {
  const [isPswdShown, setIsPswdShown] = useState(false);
  const onClickShowPswd = () => {
    setIsPswdShown(!isPswdShown);
  }

  return (
    <div className={isPswdShown ? 'login-form__pswd-block login-form__pswd-block_is_pswd-shown' : 'login-form__pswd-block' }>
      <input className='login-form__input login-form__input_is_password' type={isPswdShown ? 'text' : 'password'} id='password' autoComplete='' required onChange={(e) => setPswd(e.target.value)} />
      <button
        className='login-form__pswd-block-btn'
        type='button'
        onClick={onClickShowPswd}
      >
      </button>
    </div>
  );
};

export default PasswordInput;