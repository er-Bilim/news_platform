import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../app/hooks/reduxHooks';
import {
  selectComments,
  selectIsError,
  selectLoading,
} from '../../../comment/comment.selectors';
import {
  createComment,
  deleteComment,
  getComments,
} from '../../../comment/comment.thunks';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CommentItem from '../CommentItem/CommentItem';
import { grey } from '@mui/material/colors';
import CommentForm from '../CommentForm/CommentForm';
import type { ICommentMutation } from '../../../../../types/news/news.types';
import Loader from '../../../../../UI/Loader/Loader';

const Comments = () => {
  const [idLoadingItem, setIdLoadingItem] = useState<string | null>(null);
  const { id: idNews } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const { fetchLoading } = useAppSelector(selectLoading);
  const isError = useAppSelector(selectIsError);

  const getCommentsById = useCallback(async () => {
    if (idNews) {
      dispatch(getComments({ idNews }));
    }
  }, [dispatch, idNews]);

  useEffect(() => {
    getCommentsById();
  }, [getCommentsById]);

  const onDeleteComment = async (idComment: string) => {
    setIdLoadingItem(idComment);
    await dispatch(deleteComment({ id: idComment }));
    getCommentsById();
  };

  const handleAddComment = async (data: ICommentMutation) => {
    if (idNews) {
      await dispatch(createComment({ idNews, comment: data }));
    }
  };

  const renderContent = () => {
    if (fetchLoading) {
      return (
        <>
          <Box
            sx={{
              height: comments.slice(0, 5).length * 220 + 220,
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

    if (!fetchLoading && comments.length === 0) {
      return (
        <Box
          padding={4}
          sx={{
            background: grey[900],
          }}
          color={grey[50]}
        >
          <Typography letterSpacing={3} fontSize={18} textAlign="center">
            No comments yet. Be the first to comment!
          </Typography>
        </Box>
      );
    }

    if (isError) {
      return (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <p className="posts-error">Error</p>
        </Box>
      );
    }

    return (
      <>
        {comments.map((comment) => {
          return (
            <>
              <CommentItem
                key={comment.id}
                comment={comment}
                onDeleteComment={onDeleteComment}
                idLoadingItem={idLoadingItem}
              />
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Box>
        <Typography
          sx={{
            background: grey[900],
            color: grey[50],
            fontSize: 16,
            textAlign: 'center',
            padding: '15px',
            textTransform: 'uppercase',
            letterSpacing: 3,
            borderRadius: 12,
          }}
        >
          comments
        </Typography>
        <Box>
          {idNews && <CommentForm handleAddComment={handleAddComment} />}
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={3}
          mt={5}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default Comments;
