import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className="p-12 bg-stone-900 w-[30%] mx-auto mt-16 border border-emerald-600">{children}</div>;
};

export default AuthLayout;
