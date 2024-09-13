'use client';
import { useRatingStore } from '@/stores/rating.store';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

type FormData = {
  comment: string;
};

export const FormRating = () => {
  const comment = useRatingStore((state) => state.comment);
  const setComment = useRatingStore((state) => state.setComment);

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      comment: comment || '',
    },
  });

  /* const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('comment', event.target.value);
    setComment(event.target.value);

    const { comment } = getValues();
    console.log(comment);
  }; */

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const debouncedSetValue = useDebouncedCallback((value: string) => {
    setValue('comment', value);
  }, 500);

  useEffect(() => {
    debouncedSetValue(comment);
  }, [comment, debouncedSetValue]);

  return (
    <form>
      <div className="flex flex-col w-full">
        <label className="text-gray-500">Añade un comentario:</label>
      </div>
      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
        value={comment}
        {...register('comment', {
          required: 'Este campo es requerido',
          minLength: {
            value: 10,
            message: 'El comentario debe tener al menos 10 caracteres',
          },
        })}
        onChange={handleChange}
      />
      {errors.comment && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errors.comment.message}
        </p>
      )}
    </form>
  );
};
