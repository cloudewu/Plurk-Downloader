import VDivider from '../widgets/VDivider';
import NavIcon from './NavIcon';
import NavItem from './NavItem';

type NavLinkType = {
  text: string;
  href: string;
}

type NavItemType = NavLinkType;

function Navbar() {
  const navItems: NavItemType[] = [
    { text: '首頁', href: '/' },
    { text: 'Markdown', href: '/markdown' },
  ];

  return (
    <nav className="sticky top-0 w-full p-1 z-40 bg-primary">
      <NavIcon />
      <VDivider className="text-white/25" />
      { navItems.map((e) => <NavItem text={e.text} href={e.href} key={`nav-${e.text}`} />) }
    </nav>
  );
}

export default Navbar;
