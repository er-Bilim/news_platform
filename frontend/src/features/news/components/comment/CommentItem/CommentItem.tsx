import { type FC } from 'react';
import type { IComment } from '../../../../../types/news/news.types';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import AvatarPlaceholder from '../../../../../assets/images/placeholder/avatar_placeholder.png';
import { grey, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../../../../app/hooks/reduxHooks';
import {
  selectLoading,
} from '../../../comment/comment.selectors';
import Loader from '../../../../../UI/Loader/Loader';
import { getLoadingStateItem } from '../../../helper/getLoadingStateItem';

interface ICommentProps {
  comment: IComment;
  onDeleteComment: (idComment: string) => void;
  idLoadingItem: string | null;
}

const CommentItem: FC<ICommentProps> = ({
  comment,
  onDeleteComment,
  idLoadingItem,
}) => {
  const { deleteLoading, fetchLoading } = useAppSelector(selectLoading);
  const stateLoading: boolean = getLoadingStateItem<IComment>(
    deleteLoading,
    idLoadingItem,
    comment,
  );
  const renderContent = () => {
    if (stateLoading) {
      return (
        <>
          <Box
            sx={{
              height: '220px',
              width: '100%',
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: grey[200],
            }}
          >
            <Loader />
          </Box>
        </>
      );
    }

    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={3}
        padding={3}
        borderRadius={10}
        sx={{
          cursor: stateLoading ? 'not-allowed' : 'none',
          backgroundColor: stateLoading ? grey[200] : 'white',
          border: 2,
          borderColor: stateLoading ? grey[200] : grey[900],
          display: fetchLoading ? 'none' : 'block',
        }}
      >
        <Box
          width={'300px'}
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          gap={3}
          padding={1}
          sx={{
            background: grey[900],
          }}
          color={grey[50]}
          borderRadius={12}
        >
          <CardMedia
            component="img"
            image={AvatarPlaceholder}
            alt={comment.author}
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: 5,
              background: grey[50],
            }}
          />
          <Typography
            sx={{
              fontWeight: 600,
              letterSpacing: 3,
              fontSize: 12,
            }}
          >
            {comment.author}
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '25px',
          }}
        >
          <Typography>{comment.content}</Typography>
        </Box>
        <Button
          component={'a'}
          sx={{
            width: '250px',
            color: red[50],
            background: red[500],
            borderRadius: 5,
            border: 1,
            borderColor: red[50],
            '&:hover': {
              background: red[50],
              color: red[500],
              border: 1,
              borderColor: red[500],
            },
          }}
          endIcon={<DeleteIcon />}
          onClick={() => onDeleteComment(comment.id)}
        >
          <Typography>delete comment ok ?</Typography>
        </Button>
      </Box>
    );
  };

  return (
    <>
      <Box>{renderContent()}</Box>
    </>
  );
};

export default CommentItem;
