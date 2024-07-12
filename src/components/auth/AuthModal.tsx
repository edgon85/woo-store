'use client';
import Modal from 'react-responsive-modal';
import { LoginComponent } from './LoginComponent';
import { RegisterComponent } from './RegisterComponent';
import { useState } from 'react';
import { useModalAuth } from '@/stores';
import { useAuth } from '@/hooks';

export const AuthModal = () => {
  const { providers } = useAuth();
  const [selectRegister, setSelectRegister] = useState<boolean>(false);

  const { isOpen, closeModal } = useModalAuth();

  return (
    <Modal open={isOpen} onClose={closeModal} center>
      <section className="md:w-96">
        {selectRegister ? (
          <RegisterComponent providers={providers} />
        ) : (
          <LoginComponent providers={providers} />
        )}
        <div className="mt-4 text-center">
          <span className="text-sm">
            {`${!selectRegister ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}`}{' '}
          </span>
          <button
            onClick={() => setSelectRegister((prev) => !prev)}
            className="text-primary underline text-sm"
          >
            {`${!selectRegister ? 'Registrarse' : 'Iniciar sesión'}`}
          </button>
        </div>
      </section>
    </Modal>
  );
};
