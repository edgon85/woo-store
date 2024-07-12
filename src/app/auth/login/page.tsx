import { redirect } from 'next/navigation';

import { LoginComponent } from '@/components';

import { getAuthProviders } from '@/libs';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { providers, session } = await getAuthProviders();
  const query = searchParams['p'] as string | undefined;

  if (session) {
    redirect(query || '/');
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <LoginComponent providers={providers} />
    </div>
  );
}
