import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { register } from '../../utils/network-data';
import HeaderAuth from '../../components/HeaderAuth';
import { LocaleContext } from '../../contexts/LocaleContext';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(
        locale === 'id' 
          ? 'Password dan konfirmasi password tidak cocok!' 
          : 'Password and confirm password do not match!'
      );
      return;
    }

    const { error } = await register({ name, email, password });
    if (!error) {
      alert(
        locale === 'id' 
          ? 'Registrasi berhasil, silakan login' 
          : 'Registration successful, please login'
      );
      navigate('/login');
    } else {
      alert(locale === 'id' ? 'Registrasi gagal!' : 'Registration failed!');
    }
  };

  return (
    <>
      <HeaderAuth />
      <div className="auth-container">
        <h2>{locale === 'id' ? 'Daftar Akun Baru' : 'Register New Account'}</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            placeholder={locale === 'id' ? 'Nama Lengkap' : 'Full Name'}
            required
          />
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder={locale === 'id' ? 'Password' : 'Password'}
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder={locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}
            required
          />
          <button type="submit">{locale === 'id' ? 'Daftar' : 'Register'}</button>
        </form>
        <p>
          {locale === 'id' ? 'Sudah punya akun?' : "Already have an account?"}{' '}
          <Link to="/login">{locale === 'id' ? 'Masuk' : 'Login'}</Link>
        </p>
      </div>
    </>
  );
}

export default RegisterPage;
