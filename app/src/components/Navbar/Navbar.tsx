import VDivider from '../widgets/VDivider';
import NavIcon from './NavIcon';
import NavItem, { type Props as NavItemProps } from './NavItem';

function Navbar() {
  const navItems: NavItemProps[] = [
    { text: '首頁', href: '/' },
    { text: '什麼是 Markdown', href: '/markdown' },
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
