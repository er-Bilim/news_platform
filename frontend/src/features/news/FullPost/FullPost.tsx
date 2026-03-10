import { Box, CardMedia, Typography } from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/reduxHooks';
import {
  selectIsError,
  selectLoading,
  selectPost,
} from '../posts/posts.selectors';
import { useEffect } from 'react';
import { getPostById } from '../posts/posts.thunks';
import { grey } from '@mui/material/colors';
import Loader from '../../../UI/Loader/Loader';
import { getImageURL } from '../helper/renderImage';
import { formatDate } from '../../../utils/formatDate';
import { clearPost } from '../posts/posts.slice';

const FullPost = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const isError = useAppSelector(selectIsError);
  const { fetchLoading } = useAppSelector(selectLoading);
  const formattedDate = post && formatDate(post.publication_date);

  useEffect(() => {
    if (id) {
      dispatch(getPostById({ id }));
    }

    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, id]);

  const renderContent = () => {
    if (fetchLoading) {
      return (
        <>
          <Box
            sx={{
              height: '550px',
              width: '100%',
              borderRadius: 13,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 0 30px',
              background: grey[200],
            }}
          >
            <Loader />
          </Box>
        </>
      );
    }

    if (isError) {
      return (
        <Box>
          <p className="posts-error">Error</p>
        </Box>
      );
    }

    if (post) {
      return (
        <>
          <Box mt={10}>
            <Box>
              <CardMedia
                component="img"
                image={getImageURL(post)}
                alt={post.title}
                sx={{
                  width: '650px',
                  height: '550px',
                  borderRadius: 5,
                  border: 3,
                  borderColor: grey[900],
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Box
              width={'950px'}
              bgcolor={grey[50]}
              padding={3}
              border={2}
              borderColor={grey[900]}
              borderRadius={4}
              position={'relative'}
              top={-60}
              left={150}
              display={'flex'}
              flexDirection={'column'}
              gap={1}
            >
              <Typography
                fontSize={'2.5rem'}
                fontWeight={600}
                letterSpacing={2}
              >
                {post.title}
              </Typography>
              <Typography color={grey[500]} letterSpacing={5} fontSize={'14px'}>
                {formattedDate}
              </Typography>
              <Typography fontSize={'16px'} letterSpacing={3}>
                {post.content}
              </Typography>
            </Box>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        {renderContent()}
      </Box>
      <Outlet />
    </>
  );
};

export default FullPost;
