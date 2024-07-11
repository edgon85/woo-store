import { getAuthInfo } from '@/libs';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const userInfo = await getAuthInfo();
  const { id: currentUserId } = userInfo!;
  redirect(`/settings/profile/${currentUserId}`);
}
