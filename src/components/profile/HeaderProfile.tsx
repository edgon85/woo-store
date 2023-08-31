import { Button, EditIcon, ShareIcon, UserIcon } from '../ui';

export const HeaderProfile = () => {
  return (
    <header className="border flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center">
      <div className="profile flex flex-row  gap-4 pt-2 pb-2">
        <div className="image-profile w-[100px] h-[100px] flex justify-center items-center border rounded-[100%]">
          <div className=" text-red-700">
            <UserIcon />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">isaacher8820</h2>
          <p>★★★☆☆</p>
          <Button
            type="button"
            label="Editar"
            outlined={true}
            icon={EditIcon}
            small
          />
        </div>
      </div>
      <div className="min-w-[200px]">
        <Button
          type="button"
          label="Compartir"
          outlined={true}
          icon={ShareIcon}
        />
      </div>
    </header>
  );
};
