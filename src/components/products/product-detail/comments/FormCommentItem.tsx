import { createComment } from '@/actions';
import { SendIcon, SpinnerIcon } from '@/components/ui';
import { INewComment } from '@/interfaces';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  productId: string;
  parentId: string;
  showForm: boolean;
};

type CommentFormData = {
  content: string;
};

export const FormCommentItem = ({ parentId, productId, showForm }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<CommentFormData>({
    defaultValues: {
      content: '',
    },
  });

  const OnSubmitData = async ({ content }: CommentFormData) => {
    if (content === '') return;

    setIsLoading(true);
    const newComment: INewComment = {
      content,
      productId,
      parentId,
    };

    const { ok, message } = await createComment(newComment);

    !ok ? toast.error(message) : toast.success('Has respondido correctamente');

    setIsLoading(false);
    resetField('content');
  };

  return (
    <>
      <div className={`${!showForm ? 'hidden' : 'inline-block'} w-full`}>
        <form onSubmit={handleSubmit(OnSubmitData)}>
          <label htmlFor="chat" className="sr-only">
            ty mensaje
          </label>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50">
            <textarea
              id="chat"
              rows={2}
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-0"
              placeholder="responder..."
              {...register('content', {
                required: '*Este campo es requerido',
              })}
            ></textarea>

            <button
              type="submit"
              className="inline-flex justify-center p-2 text-cerise-red-600 rounded-full cursor-pointer hover:bg-cerise-red-100"
            >
              {isLoading ? (
                <SpinnerIcon className="w-4 h-4 animate-spin" />
              ) : (
                <SendIcon className="w-5 h-5 rotate-90 rtl:-rotate-90" />
              )}
              <span className="sr-only">Send message</span>
            </button>
          </div>
          {errors.content && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-500">
              {errors.content?.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
};
