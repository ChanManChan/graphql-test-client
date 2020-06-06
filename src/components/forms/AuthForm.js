import React from 'react';

const AuthForm = ({
  email,
  password = '',
  loading,
  handleSubmit,
  setField,
  showPasswordInput = false,
  disable_email = false,
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
    <button className='btn btn-raised btn-primary' disabled={loading || !email}>
      Submit
    </button>
  </form>
);

export default AuthForm;
