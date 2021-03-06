import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';
import { AuthContext } from '../../context/authContext';

const PasswordUpdate = () => {
  const {
    state: { user },
  } = React.useContext(AuthContext);

  const [{ password, loading }, setLState] = React.useState({
    password: '',
    loading: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLState((cs) => ({ ...cs, loading: true }));
    try {
      await auth.currentUser.updatePassword(password);
      setLState((cs) => ({ ...cs, loading: false }));
      toast.success('Password updated', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (e) {
      setLState((cs) => ({ ...cs, loading: false }));
      toast.error(e.message, { position: toast.POSITION.BOTTOM_LEFT });
    }
  };

  return (
    <div className='container p-5'>
      {loading ? (
        <div className='spinner'></div>
      ) : (
        <>
          <h4>Update Password</h4>
          <AuthForm
            email={user.email}
            password={password}
            loading={loading}
            handleSubmit={handleSubmit}
            setField={setLState}
            showPasswordInput
            disable_email
          />
        </>
      )}
    </div>
  );
};

export default PasswordUpdate;
