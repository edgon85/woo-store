import { BsHeart, BsShare } from 'react-icons/bs';

export const BtnActions = () => {
  return (
    <div className="flex justify-evenly items-center gap-4 py-8">
      <button className="flex justify-center items-center gap-2">
        <BsHeart color="var(--primary)" size={24} /> <span>Me gusta</span>
      </button>
      <button className="flex justify-center items-center gap-2">
        <BsShare color="var(--primary)" size={24} /> <span> Compartir</span>
      </button>
    </div>
  );
};
