import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className="p-12 bg-stone/80 backdrop-blur-xs w-[30%] mx-auto mt-16 border-2 border-green">{children}</div>;
};

export default AuthLayout;
