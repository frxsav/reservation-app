import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-4xl text-background">Homepage</h1>
      <Link
        href={'/admin'}
        className="bg-linear-to-br w-fit rounded-none flex justify-center font-semibold mx-auto from-emerald-700 to-emerald-600 text-stone-100 text-xl px-6 py-2 uppercase tracking-wide hover:from-emerald-600 hover:to-emerald-700 cursor-pointer transition-colors duration-600">
        Pannello Admin
      </Link>
    </div>
  );
}
