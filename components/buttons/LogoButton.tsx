import Link from 'next/link';
import Image from 'next/image';

export default function LogoButton() {
  return (
    <Link href={'/'}>
      <Image src={'vercel.svg'} width={50} height={50} alt="Logo" />
    </Link>
  );
}
