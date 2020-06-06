import React from 'react';
import { AuthContext } from '../../context/authContext';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../firebase';
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

const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const history = useHistory();
  const [{ email, password, loading }, setLState] = React.useState({
    loading: false,
    email: '',
    password: '',
  });
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLState((cs) => ({ ...cs, loading: true }));
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: { email: user.email, token: idTokenResult.token },
      });
      createUser();
      history.push('/');
      setLState((cs) => ({ ...cs, loading: false }));
    } catch (e) {
      console.log('> Login error', e);
      toast.error(e.message, { position: toast.POSITION.BOTTOM_LEFT });
      setLState((cs) => ({ ...cs, loading: false }));
    }
  };

  const googleLogin = async () => {
    setLState((cs) => ({ ...cs, loading: true }));
    const { user } = await auth.signInWithPopup(googleAuthProvider);
    const idTokenResult = await user.getIdTokenResult();
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: { email: user.email, token: idTokenResult.token },
    });
    createUser();
    history.push('/');
    setLState((cs) => ({ ...cs, loading: false }));
  };

  return (
    <div className='container p-5'>
      <h4>Login</h4>
      <button className='btn btn-raised btn-danger mt-5' onClick={googleLogin}>
        Login with Google
      </button>
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
        />
      )}
    </div>
  );
};

export default Login;
