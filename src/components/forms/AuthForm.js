import React from 'react';
import { Link } from 'react-router-dom';

const AuthForm = ({
  email = '',
  password = '',
  loading,
  handleSubmit,
  setField = (f) => f,
  showPasswordInput = false,
  disable_email = false,
  reveal_fp = false,
}) => (
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label className='text-muted'>Email Address</label>
      <input
        className='form-control'
        placeholder='Enter your email address'
        type='email'
        value={email}
        onChange={(e) => {
          e.persist();
          setField((cs) => ({ ...cs, email: e.target.value }));
        }}
        disabled={loading || disable_email}
      />
    </div>
    {showPasswordInput && (
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          className='form-control'
          placeholder='Enter password'
          type='password'
          value={password}
          onChange={(e) => {
            e.persist();
            setField((cs) => ({ ...cs, password: e.target.value }));
          }}
          disabled={loading}
        />
      </div>
    )}
    <button
      type='submit'
      className='btn btn-raised btn-primary'
      disabled={loading || !email}
    >
      Submit
    </button>
    {reveal_fp && (
      <Link className='btn btn-danger ml-4' to='/password/forgot'>
        Forgot Password
      </Link>
    )}
  </form>
);

export default AuthForm;
