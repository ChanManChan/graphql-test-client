import React from 'react';
import { toast } from 'react-toastify';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { SINGLE_POST } from '../../graphql/queries';
import { POST_UPDATE } from '../../graphql/mutations';
import omitDeep from 'omit-deep';
import { useParams } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';

const PostUpdate = () => {
  const { postId } = useParams();

  const [
    getSinglePost,
    {
      data: {
        singlePost: { _id = '', content = '', image: c_image = {} } = {},
      } = {},
    },
  ] = useLazyQuery(SINGLE_POST);

  const [postUpdate] = useMutation(POST_UPDATE);

  const [{ loading, ls_content, ls_id, image }, setLState] = React.useState({
    loading: false,
    ls_content: '',
    ls_id: '',
    image: {
      url: 'https://via.placeholder.com/150.png?text=Post',
      public_id: new Date().getTime().toString(),
    },
  });

  React.useMemo(() => {
    if (_id)
      setLState((cs) => ({
        ...cs,
        ls_id: _id,
        ls_content: content,
        image: omitDeep(c_image, ['__typename']),
      }));
  }, [_id]);

  React.useEffect(() => {
    getSinglePost({ variables: { _id: postId } });
  }, []);

  const handleChange = (e) => {
    e.persist();
    setLState((cs) => ({ ...cs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLState((cs) => ({ ...cs, loading: true }));
    await postUpdate({
      variables: { input: { _id: ls_id, content: ls_content, image } },
    });
    setLState((cs) => ({ ...cs, loading: false }));
    toast.success('Post updated', { position: toast.POSITION.BOTTOM_LEFT });
  };

  const updateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <textarea
          name='ls_content'
          value={ls_content}
          onChange={handleChange}
          rows='5'
          className='md-textarea form-control'
          placeholder='Post content'
          maxLength='150'
          disabled={loading}
        />
      </div>
      <button
        className='btn btn-primary'
        type='submit'
        disabled={loading || !ls_content}
      >
        Update
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      <FileUpload setLState={setLState} image={image} singleUpload />
      {updateForm()}
    </div>
  );
};

export default PostUpdate;
