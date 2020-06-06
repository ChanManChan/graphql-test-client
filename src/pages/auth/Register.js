import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

const Register = () => {
  const [{ email, loading }, setLState] = React.useState({
    loading: false,
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLState((cs) => ({ ...cs, loading: true }));
    await auth.sendSignInLinkToEmail(email, {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    });
    toast.success(
      `Complete the registration process by following the instructions sent to ${email}`,
      {
        positiom: toast.POSITION.BOTTOM_LEFT,
      }
    );
    window.localStorage.setItem('emailForRegistration', email);
    setLState({ loading: false, email: '' });
  };

  return (
    <div className='container p-5'>
      <h4>Register</h4>
      {loading ? (
        <div className='spinner mt-5' />
      ) : (
        <AuthForm
          email={email}
          loading={loading}
          handleSubmit={handleSubmit}
          setField={setLState}
        />
      )}
    </div>
  );
};

export default Register;
