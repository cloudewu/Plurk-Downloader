import Link from 'next/link';
import { useRouter } from 'next/router';

type NavItemProps = {
  text: string;
  href: string;
}

function NavItem({ text, href }: NavItemProps) {
  const { pathname } = useRouter();
  const highlight = pathname === href;

  return (
    <div
      className={'inline-block mx-1.5 text-white hover:opacity-90'
                 + `${highlight ? ' font-bold' : ''}`}
    >
      <Link href={href}>
        { text }
      </Link>
    </div>
  );
}

export default NavItem;
