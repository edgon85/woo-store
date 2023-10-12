'use client';

import { Divider } from '@/components/ui';
import { NameSection } from './NameSection';
import { UsernameSection } from './UsernameSection';
import { EmailSection } from './EmailSection';
import { ResetPasswordSection } from './ResetPasswordSection';
import { VacationModeSection } from './VacationModeSection';
import { DeleteAccountSection } from './DeleteAccountSection';
import { LocalDataUser } from '@/interfaces';

type Props = {
  dataUser: LocalDataUser;
};
export const AccountForm = ({ dataUser }: Props) => {
  return (
    <>
      <NameSection
        fullName={dataUser.fullName}
        token={dataUser.token}
        userId={dataUser.id}
      />
      <hr />
      <UsernameSection
        username={dataUser.username}
        token={dataUser.token}
        userId={dataUser.id}
      />
      <hr />
      <EmailSection
        email={dataUser.email}
        token={dataUser.token}
        userId={dataUser.id}
        authType={dataUser.authType}
      />
      <Divider />
      {dataUser.authType === 'credentials' ? (
        <>
          <ResetPasswordSection />
          <Divider />
        </>
      ) : null}
      <VacationModeSection />
      <Divider />
      <DeleteAccountSection />
    </>
  );
};
