export interface BaseComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  depth: number;
  user: UserComment;
}

export interface IComment extends BaseComment {
  responses?: IResponse[];
}

export interface IResponse extends BaseComment {}

export interface UserComment {
  id: string;
  username: string;
  fullName: string;
  profileImage: null | string;
}

export interface INewComment {
  content: string;
  productId: string;
  parentId?: string;
}
