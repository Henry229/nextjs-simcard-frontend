import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div
        className='p-6 rounded-lg shadow-xl dark:shadow-dark-xl max-w-md w-full 
                      bg-white dark:bg-gray-800 
                      text-gray-900 dark:text-gray-100
                      border border-gray-200 dark:border-gray-700'
      >
        <button
          onClick={onClose}
          className='float-right text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-2xl transform transition-transform duration-200 hover:scale-125'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
