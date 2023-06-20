import { BtnSocial, FacebookIcon, GoogleIcon, RegisterForm } from '@/components';

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-4 rounded flex flex-col justify-center items-center gap-2 min-w-[90%] md:min-w-[50%] lg:min-w-[30%] shadow-md">
        <h2 className="text-lg mb-3">Regístrate a Woo</h2>
        <div className="flex flex-col w-full gap-2">
          <BtnSocial
            icon={<GoogleIcon />}
            title="registrarse con google"
            provider="google"
          />
          <BtnSocial
            icon={<FacebookIcon />}
            title="registrarse con facebook"
            provider="facebook"
          />
        </div>

        <div className="mt-4">
          <span>O Regístrate con</span>{' '}
          <button className="text-primary cursor-pointer">E-MAIL</button>
        </div>

      <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
