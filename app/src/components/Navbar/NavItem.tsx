import Link from 'next/link';
import { useRouter } from 'next/router';

export type Props = {
  text: string;
  href: string;
}

function NavItem({ text, href }: Props) {
  const { pathname } = useRouter();
  const highlight = pathname === href;

  return (
    <div
      className={'inline-block mx-1.5 text-white hover:opacity-90'
                 + `${highlight ? ' font-semibold' : ''}`}
    >
      <Link href={href}>
        { text }
      </Link>
    </div>
  );
}

export default NavItem;
