import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link
      href={'/login'}
      className="text-center items-center bg-linear-to-br rounded-none flex justify-center font-semibold from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-2 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
      Accedi
    </Link>
  );
}
