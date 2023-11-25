import { Divider } from '@/components/ui';
import { NameSection } from './NameSection';
import { UsernameSection } from './UsernameSection';
import { EmailSection } from './EmailSection';
import { ResetPasswordSection } from './ResetPasswordSection';
import { VacationModeSection } from './VacationModeSection';
import { DeleteAccountSection } from './DeleteAccountSection';
import { IUser } from '@/interfaces';

type Props = {
  user: IUser;
};
export const AccountForm = ({ user }: Props) => {
  return (
    <>
      <NameSection fullName={user.fullName} userId={user.id} />
      <hr />
      <UsernameSection username={user.username} userId={user.id} />
      <hr />
      <EmailSection
        email={user.email}
        userId={user.id}
        authType={user.authType}
      />
      <Divider />
      {user.authType === 'credentials' ? (
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
