import React from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/react-hooks';
import omitDeep from 'omit-deep';
import { PROFILE } from '../../graphql/queries';
import { USER_UPDATE } from '../../graphql/mutations';
import UserProfile from '../../components/forms/UserProfile';
import FileUpload from '../../components/FileUpload';

const Profile = () => {
  const [
    { ls_username, ls_name, ls_email, ls_about, ls_images, loading },
    setLState,
  ] = React.useState({
    ls_username: '',
    ls_name: '',
    ls_email: '',
    ls_about: '',
    ls_images: [],
    loading: false,
  });

  const {
    data: {
      profile: {
        username = '',
        name = '',
        email = '',
        about = '',
        images = [],
      } = {},
    } = {},
  } = useQuery(PROFILE);

  React.useMemo(() => {
    if (username)
      setLState({
        ls_username: username,
        ls_name: name,
        ls_email: email,
        ls_about: about,
        ls_images: omitDeep(images, ['__typename']),
        loading: false,
      });
  }, [username]);

  const [userUpdate] = useMutation(USER_UPDATE, {
    onCompleted: () =>
      toast.success('Profile updated', {
        position: toast.POSITION.BOTTOM_LEFT,
      }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLState((cs) => ({ ...cs, loading: true }));
    userUpdate({
      variables: {
        input: {
          name: ls_name,
          username: ls_username,
          images: ls_images,
          about: ls_about,
        },
      },
    });
    setLState((cs) => ({ ...cs, loading: false }));
  };

  const handleChange = (e) => {
    e.persist();
    setLState((cs) => ({ ...cs, [e.target.name]: e.target.value }));
  };

  return (
    <div className='container p-5'>
      {loading ? (
        <div className='spinner' />
      ) : (
        <FileUpload setLState={setLState} ls_images={ls_images} />
      )}
      <UserProfile
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        ls_username={ls_username}
        ls_name={ls_name}
        ls_email={ls_email}
        ls_about={ls_about}
        loading={loading}
      />
    </div>
  );
};

export default Profile;
