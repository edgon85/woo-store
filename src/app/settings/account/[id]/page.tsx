// 'use client';
import { AccountForm } from '@/components';
import { getUserProfile } from '@/helpers';
import { useAuth } from '@/hooks';
import { IUser, LocalDataUser } from '@/interfaces';
import { fetchUserProfile } from '@/lib';
import { useEffect, useState } from 'react';

export default async function AccountPage({
  params,
}: {
  params: { id: string };
}) {
  const userProfile = await fetchUserProfile(params.id);

  return <AccountForm user={userProfile} />;
}
