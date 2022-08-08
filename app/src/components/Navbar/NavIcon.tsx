import Image from 'next/image';
import Link from 'next/link';

function NavIcon() {
  return (
    <Link href="/">
      <button className="text-white" type="button">
        <Image
          className="inline-block"
          src="/img/favicon_white.png"
          height="15px"
          width="15px"
          alt="The favicon of this app"
        />
        <span className="px-1 hidden sm:inline-block">
          噗文轉存器
        </span>
      </button>
    </Link>
  );
}

export default NavIcon;
