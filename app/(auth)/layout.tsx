import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className="p-12 bg-stone-900 w-[50%] mx-auto rounded-xl mt-16">{children}</div>;
};

export default AuthLayout;
