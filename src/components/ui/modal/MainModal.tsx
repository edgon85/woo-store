import { CloseIcon } from '../icons';

type Props = {
  modalId: string;
  title?: string;
  body: JSX.Element | JSX.Element[];
  footer?: JSX.Element | JSX.Element[];
};

export const MainModal = ({ modalId, title, body, footer }: Props) => {
  return (
    <>
      <div
        id={modalId}
        tabIndex={-1}
        aria-hidden="true"
        className="fixed flex justify-center items-center bg-black/50 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/*  <!-- Modal header --> */}
            <div
              className={`flex items-start justify-between px-4 pt-4 ${
                title && 'pb-4 border-b'
              }  rounded-t dark:border-gray-600`}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide={modalId}
              >
                <CloseIcon color="var(--primary)" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">{body}</div>
            {/* <!-- Modal footer --> */}
            {footer && (
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
