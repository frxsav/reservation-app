import LogoButton from './buttons/LogoButton';
import NavbarButton from './NavbarButton';

export default async function Navbar() {
  return (
    <nav className="flex justify-between px-32 py-4 bg-stone-900 fixed top-0 w-full border-b border-background/50">
      <LogoButton />
      <NavbarButton />
    </nav>
  );
}
