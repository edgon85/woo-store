import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const userId = cookies().get('userId')?.value;
  redirect(`/settings/profile/${userId}`);
}
