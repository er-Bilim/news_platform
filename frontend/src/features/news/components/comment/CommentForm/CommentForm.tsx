import { Box, Button, TextField, Typography } from '@mui/material';
import {
  useAppSelector,
} from '../../../../../app/hooks/reduxHooks';
import { selectLoading } from '../../../comment/comment.selectors';
import type { ICommentMutation } from '../../../../../types/news/news.types';
import { useForm, Controller } from 'react-hook-form';
import type { FC } from 'react';
import { grey } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';

interface ICommentFormProps {
  handleAddComment: (data: ICommentMutation) => Promise<void>;
}

const CommentForm: FC<ICommentFormProps> = ({ handleAddComment }) => {
  const { sendLoading } = useAppSelector(selectLoading);
  const defaultValues: ICommentMutation = {
    news_id: '',
    author: '',
    content: '',
  };
  const { control, handleSubmit, reset } = useForm<ICommentMutation>({
    defaultValues,
  });

  const onSubmit = async (data: ICommentMutation) => {
    await handleAddComment(data).then(() => reset());
  };

  return (
    <Box mt={5} border={2} padding={3} borderRadius={6} width={690}>
      <Typography
        sx={{
          fontSize: 18,
          textTransform: 'uppercase',
          letterSpacing: 4,
        }}
      >
        add comment
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} flexDirection={'column'} gap={3} mt={3}>
          <Box>
            <Controller
              name="author"
              control={control}
              rules={{
                required: false,
                minLength: {
                  value: 3,
                  message: 'Author is too short',
                },
                maxLength: {
                  value: 20,
                  message: 'Author is too long',
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    {...field}
                    sx={{
                      width: '100%',
                    }}
                    label="Name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    variant="standard"
                  />
                </>
              )}
            />
          </Box>

          <Box>
            <Controller
              name="content"
              control={control}
              rules={{
                required: 'Comment is required',
                minLength: {
                  value: 2,
                  message: 'Comment must be at least 2 characters',
                },
                maxLength: {
                  value: 500,
                  message: 'Comment must be at most 500 characters',
                },
                validate: (value) =>
                  value.trim() !== '' || 'Comment is required',
              }}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    sx={{
                      width: '100%',
                      maxHeight: '200px',
                      overflow: 'auto',

                      '&::-webkit-scrollbar': {
                        width: '0.4rem',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: grey[400],
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: grey[800],
                        borderRadius: '10px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                      },
                    }}
                    {...field}
                    required
                    label="Comment"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    variant="standard"
                    multiline
                  />
                </>
              )}
            />
          </Box>

          <Box>
            <Button
              type="submit"
              endIcon={<SendIcon />}
              loading={sendLoading}
              sx={{
                width: '100%',
                borderRadius: '16px',
                background: 'white',
                color: grey[900],
                textTransform: 'uppercase',
                letterSpacing: 2,
                fontSize: 14,
                padding: '15px 0',
                border: 1,
                '&:hover': {
                  background: grey[900],
                  color: 'white',
                  transition: 'all 0.2s ease-in-out',
                  border: 1,
                  borderColor: 'white',
                },
              }}
            >
              add
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CommentForm;
