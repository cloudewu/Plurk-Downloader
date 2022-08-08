import Image from 'next/image';
import Link from 'next/link';

function NavIcon() {
  return (
    <Link href="/">
      <button className="text-white" type="button">
        <Image
          src="/img/favicon_white.png"
          height="15px"
          width="15px"
          alt="The favicon of this app"
        />
        <span className="hidden sm:inline-block px-1 text-sm font-semibold">
          噗文轉存器
        </span>
      </button>
    </Link>
  );
}

export default NavIcon;
