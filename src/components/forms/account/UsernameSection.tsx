export const UsernameSection = () => {
  return (
    <div className="bg-white p-4 w-full ">
      <div className=" flex justify-between items-center py-2">
        <div className="flex-1">
          <p className="block text-base font-medium text-gray-700">Usuario</p>
          <h2 className="text-base font-bold">isaacher</h2>
        </div>
        <div className="flex-1">
          <button className="border text-primary border-primary hover:bg-primary hover:text-white p-2 rounded-md ">
            Cambiar
          </button>
        </div>
      </div>
    </div>
  );
};
