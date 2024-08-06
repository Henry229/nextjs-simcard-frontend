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
      <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full'>
        <button
          onClick={onClose}
          className='float-right text-gray-700 hover:text-gray-900'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
