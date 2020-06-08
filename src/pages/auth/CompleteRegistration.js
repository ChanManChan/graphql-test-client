import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import AuthForm from '../../components/forms/AuthForm';

const CREATE_USER = gql`
  mutation CreateUser {
    createUser {
      username
      email
    }
  }
`;

const CompleteRegistration = () => {
  const { dispatch } = React.useContext(AuthContext);
  const [{ email, password, loading }, setLState] = React.useState({
    email: '',
    password: '',
    loading: false,
  });

  let history = useHistory();

  React.useEffect(() => {
    setLState((cs) => ({
      ...cs,
      email: window.localStorage.getItem('emailForRegistration'),
    }));
  }, [history]);

  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLState((cs) => ({ ...cs, loading: true }));
    if (!email || !password) {
      toast.error('Email and password is required', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: { email: user.email, token: idTokenResult.token },
        });
        createUser();
        history.push('/profile');
      }
    } catch (e) {
      toast.error(e.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      console.log('> Complete Register Error: ', e.message);
      setLState((cs) => ({ ...cs, loading: false }));
    }
  };

  return (
    <div className='container p-5'>
      <h4>Complete Registration</h4>
      {loading ? (
        <div className='spinner mt-5' />
      ) : (
        <AuthForm
          email={email}
          password={password}
          loading={loading}
          handleSubmit={handleSubmit}
          setField={setLState}
          showPasswordInput
          disable_email
        />
      )}
    </div>
  );
};
export default CompleteRegistration;
