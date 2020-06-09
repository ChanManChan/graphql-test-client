import React from 'react';

const UserProfile = ({
  handleSubmit,
  handleChange,
  ls_username,
  ls_name,
  ls_email,
  ls_about,
  loading,
}) => (
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label className='text-muted'>Username</label>
      <input
        type='text'
        name='ls_username'
        value={ls_username}
        onChange={handleChange}
        className='form-control'
        placeholder='Username'
        disabled={loading}
      />
    </div>
    <div className='form-group'>
      <label className='text-muted'>Name</label>
      <input
        type='text'
        name='ls_name'
        value={ls_name}
        onChange={handleChange}
        className='form-control'
        placeholder='Name'
        disabled={loading}
      />
    </div>
    <div className='form-group'>
      <label className='text-muted'>Email</label>
      <input
        type='email'
        name='ls_email'
        value={ls_email}
        onChange={handleChange}
        className='form-control'
        placeholder='Email'
        disabled
      />
    </div>

    <div className='form-group'>
      <label className='text-muted'>About</label>
      <textarea
        type='text'
        name='ls_about'
        value={ls_about}
        onChange={handleChange}
        className='form-control'
        placeholder='About'
        disabled={loading}
      />
    </div>
    <button className='btn btn-primary' type='submit' disabled={loading}>
      Update
    </button>
  </form>
);

export default UserProfile;
