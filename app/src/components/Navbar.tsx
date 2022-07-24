import Image from 'next/image';
import Link from 'next/link';
import VDivider from './widgets/VDivider';

type NavItemProps = {
  text: string;
  href: string;
}

function NavLink({ text, href }: NavItemProps) {
  return (
    <div className="inline-block mx-1 text-white">
      <Link href={href}>
        { text }
      </Link>
    </div>
  );
}

type NavItemType = {
  type: 'link' | 'divider';
  text?: string;
  href?: string;
}

function Navbar() {
  const navItems: NavItemType[] = [
    { type: 'link', text: '噗文轉存器', href: '/' },
    { type: 'divider' },
    { type: 'link', text: '首頁', href: '/' },
    { type: 'link', text: '關於我們', href: '/about' },
  ];

  return (
    <nav className="bg-primary sticky top-0 w-full p-1">
      <Image
        src="/img/favicon_white.png"
        width="15px"
        height="15px"
        alt="The favicon of this app"
        className="inline-block"
      />
      { navItems.map(({ type, text, href }) => {
        if (type === 'divider') {
          return <VDivider />;
        }

        return <NavLink text={text} href={href} key={`nav-${text}`} />;
      })}
    </nav>
  );
}

export default Navbar;
