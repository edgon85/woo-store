'use client';
import { UserIcon } from '@/components/ui';
import { IComment } from '@/interfaces';
import { formatDateChat } from '@/utils';
import Image from 'next/image';
import { FormCommentItem } from './FormCommentItem';
import { useState } from 'react';
import { useAuthStore, useModalAuth } from '@/stores';

type Props = {
  comment: IComment;
  isReply?: boolean;
  productId: string;
};

export const CommentItem = ({ comment, isReply = false, productId }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const { isLoggedIn } = useAuthStore((state) => state);
  const { openModal } = useModalAuth();

  const onShowForm = () => {
    if (isLoggedIn) {
      setShowForm(!showForm);
    } else {
      openModal();
    }
  };

  return (
    <div className={`flex ${isReply ? 'ml-6 mt-2' : 'mt-4'}`}>
      <div className="flex-shrink-0 mr-3">
        {comment.user.profileImage ? (
          <Image
            src={comment.user.profileImage}
            alt={comment.user.username}
            className="w-6 h-6 rounded-full"
            width={24}
            height={24}
          />
        ) : (
          <UserIcon className="w-6 h-6 text-gray-400" />
        )}
      </div>
      <div className="flex-grow">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="font-semibold">{comment.user.username}</p>
          <p className="text-sm text-gray-600">{comment.content}</p>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {/* <span>{new Date(comment.createdAt).toLocaleString()}</span> */}
          <span>{formatDateChat(comment.createdAt.toString())}</span>
          {/* <span>{formatDateToLocalGT(comment.createdAt.toString())}</span> */}
          {!isReply && (
            <button onClick={onShowForm} className="ml-2 text-cerise-red-600">
              Responder
            </button>
          )}
          <button className="ml-2 text-gray-500">Denunciar comentario</button>
        </div>
        {comment.responses &&
          comment.responses.map((response) => (
            <CommentItem
              key={response.id}
              comment={response}
              productId={productId}
              isReply={true}
            />
          ))}
        {!isReply && (
          <FormCommentItem
            parentId={comment.id}
            productId={productId}
            showForm={showForm}
          />
        )}
      </div>
    </div>
  );
};
