import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link
      href={'/login'}
      className="text-center items-center bg-green border-t-3 border-light-green rounded-none flex justify-center font-semibold text-stone-100 text-xl px-6 py-2 uppercase tracking-wide hover:bg-dark-green cursor-pointer transition-colors duration-600">
      Accedi
    </Link>
  );
}
