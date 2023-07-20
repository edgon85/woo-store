'use client';
import { useModal } from '@/hooks';
import { CloseIcon } from '../icons';

type Props = {
  modalId: string;
  title?: string;
  body: JSX.Element | JSX.Element[];
  footer?: JSX.Element | JSX.Element[];
};

export const MainModal = ({ modalId, title, body, footer }: Props) => {
  const { isOpen, onCloseModal, id } = useModal();

  return (
    <>
      <div
        id={modalId}
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed ${
          id === modalId ? 'flex' : 'hidden'
        }  justify-center items-center bg-black/50 top-0 left-0 right-0 z-50 w-full p-4 md:inset-0  h-full`}
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow ">
            {/*  <!-- Modal header --> */}
            <div
              className={`flex items-start justify-between px-4 pt-4 ${
                title && 'pb-4 border-b'
              }  rounded-t`}
            >
              <h3 className="text-xl font-semibold text-gray-900 ">
                {title}
              </h3>
              <button
                onClick={() => onCloseModal()}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                data-modal-hide={modalId}
              >
                <CloseIcon color="var(--primary)" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="relative p-6 space-y-6 max-h-[50vh] overflow-y-auto">{body}</div>
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
