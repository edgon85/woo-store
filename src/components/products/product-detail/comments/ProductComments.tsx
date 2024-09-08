'use client';
import { MessagesIcon } from '@/components/ui';
import { IComment } from '@/interfaces';
import React, { useState } from 'react';
import { CommentItem } from './CommentItem';
import { FormComment } from './FormComment';

type Props = {
  comments: IComment[];
  productId: string;
};

export const ProductComments = ({ comments, productId }: Props) => {
  // const [comments, setComments] = useState([1, 2, 3, 4, 5]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Add new comment logic here
    console.log('New comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-2 md:p-0">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <MessagesIcon className="mr-2 h-5 w-5 text-cerise-red-600" />
        Preguntas a la vendedora
        <span className="ml-2 bg-gray-200 rounded-full px-2 py-1 text-sm">
          {comments.length}
        </span>
      </h2>

      {comments.map((comment: IComment) => (
        <CommentItem key={comment.id} comment={comment} productId={productId} />
      ))}

      <div className="mt-6">
        <FormComment productId={productId} />
      </div>
    </div>
  );
};
