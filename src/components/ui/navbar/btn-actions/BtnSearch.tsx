export const BtnSearch = () => {
  return (
    <>
      <button
        id="toggleSidebarMobileSearch"
        type="button"
        className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 "
      >
        <span className="sr-only">Search</span>
        {/* <!-- Search icon --> */}
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </>
  );
};
