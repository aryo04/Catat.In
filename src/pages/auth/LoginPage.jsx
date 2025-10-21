import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { login, putAccessToken } from '../../utils/network-data';
import HeaderAuth from '../../components/HeaderAuth';
import { LocaleContext } from '../../contexts/LocaleContext';

function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error, data } = await login({ email, password });
    if (!error) {
      putAccessToken(data.accessToken);
      navigate('/');
    } else {
      alert(locale === 'id' ? 'Login gagal!' : 'Login failed!');
    }
  };

  return (
    <>
      <HeaderAuth />
      <div className="auth-container">
        <h2>
          {locale === 'id' 
            ? 'Yuk, login untuk menggunakan aplikasi' 
            : 'Let\'s login to use the app'}
        </h2>
        <form onSubmit={onSubmit}>
          <input 
            type="email" 
            value={email} 
            onChange={onEmailChange} 
            placeholder={locale === 'id' ? 'Email' : 'Email'} 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={onPasswordChange} 
            placeholder={locale === 'id' ? 'Password' : 'Password'} 
            required 
          />
          <button type="submit">
            {locale === 'id' ? 'Masuk' : 'Login'}
          </button>
        </form>
        <p>
          {locale === 'id' ? 'Belum punya akun?' : 'Don\'t have an account?'}{' '}
          <Link to="/register">
            {locale === 'id' ? 'Daftar' : 'Register'}
          </Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
