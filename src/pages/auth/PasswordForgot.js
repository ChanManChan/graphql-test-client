import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

const PasswordForgot = () => {
  const [{ email, loading }, setLState] = React.useState({
    email: '',
    loading: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLState((cs) => ({ ...cs, loading: true }));
    try {
      await auth.sendPasswordResetEmail(email, {
        url: process.env.REACT_APP_RESET_PASSWORD_REDIRECT,
        handleCodeInApp: true,
      });
      setLState({ email: '', loading: false });
      toast.success(`Reset password link is sent to ${email}`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (e) {
      setLState((cs) => ({ ...cs, loading: false }));
      console.log('> Error on reset password', e);
    }
  };
  return (
    <div className='container p-5'>
      {loading ? (
        <div className='spinner' />
      ) : (
        <>
          <h4>Forgot Password</h4>
          <AuthForm
            email={email}
            loading={loading}
            handleSubmit={handleSubmit}
            setField={setLState}
          />
        </>
      )}
    </div>
  );
};

export default PasswordForgot;
