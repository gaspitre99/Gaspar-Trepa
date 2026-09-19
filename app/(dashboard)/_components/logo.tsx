import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-full border border-neutral-800 shrink-0 overflow-hidden">
        <Image src="/logo.png" alt="logo hde" width={36} height={36} priority />
      </div>
      <div className="font-serif font-bold text-xl text-white tracking-tight">
        Hablemos de Economía
      </div>
    </Link>
  );
};

export default Logo;
