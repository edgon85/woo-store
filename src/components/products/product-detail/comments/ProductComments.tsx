'use client';
import { MessagesIcon } from '@/components/ui';
import { IComment } from '@/interfaces';
import React, { useState } from 'react';
import { CommentItem } from './CommentItem';
import { FormComment } from './FormComment';

type Props = {
  comments: IComment[];
  productId: string;
  productTitle: string;
  focusMessage: boolean;
};

export const ProductComments = ({
  comments,
  productId,
  focusMessage,
  productTitle,
}: Props) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-2 md:p-0">
      <div>
        <p className="text-2xl font-bold mb-4 flex items-center">
          <MessagesIcon className="mr-2 h-6 w-6 text-cerise-red-600" />
          Preguntas al vendedor
          <span className="ml-2 bg-gray-200 rounded-full px-2 py-1 text-sm">
            {comments.length}
          </span>
        </p>
        <p className="text-gray-500 text-sm pl-0 md:pl-4">
          Si tienes cualquier duda acerca de mi artículo{' '}
          <span className="font-bold">{productTitle}</span>, no dudes en
          escribirme aquí para que yo pueda ayudarte.
        </p>
      </div>

      {comments.map((comment: IComment) => (
        <CommentItem key={comment.id} comment={comment} productId={productId} />
      ))}

      <div className="mt-6">
        <FormComment productId={productId} focusMessage={focusMessage} />
      </div>
    </div>
  );
};
