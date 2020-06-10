import React from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import FileUpload from '../../components/FileUpload';
import { POST_CREATE } from '../../graphql/mutations';
import { POSTS_BY_USER } from '../../graphql/queries';
import { useHistory } from 'react-router-dom';

const Post = () => {
  const history = useHistory();

  const [{ content, image, loading }, setLState] = React.useState({
    content: '',
    image: {
      url: 'https://via.placeholder.com/150.png?text=Post',
      public_id: new Date().getTime().toString(),
    },
    loading: false,
  });

  const [postCreate] = useMutation(POST_CREATE, {
    update: (cache, { data: { postCreate } }) => {
      const { postsByUser } = cache.readQuery({ query: POSTS_BY_USER });
      cache.writeQuery({
        query: POSTS_BY_USER,
        data: { postsByUser: [...postsByUser, postCreate] },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLState((cs) => ({ ...cs, loading: true }));
    await postCreate({ variables: { input: { content, image } } });
    setLState((cs) => ({ ...cs, loading: false }));
    toast.success('Post created', { position: toast.POSITION.BOTTOM_LEFT });
    history.push('/posts/this_user');
  };

  const handleChange = (e) => {
    e.persist();
    setLState((cs) => ({ ...cs, [e.target.name]: e.target.value }));
  };

  const postForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <textarea
          name='content'
          value={content}
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
        disabled={loading || !content}
      >
        Post
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      {loading ? (
        <div className='spinner' />
      ) : (
        <>
          <h4>Create Post</h4>
          <FileUpload setLState={setLState} image={image} singleUpload />
          <div className='row'>
            <div className='col'>{postForm()}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
