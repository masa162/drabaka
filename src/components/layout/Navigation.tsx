'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems: Array<{ href: string; label: string; exact?: boolean }> = [
    { href: '/', label: '🏠 HOME', exact: true },
    { href: '/dramas', label: '📺 ドラマ一覧' },
    { href: '/search', label: '🔍 検索' },
  ];

  return (
    <nav className="retro-nav">
      <ul className="nav-list">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          
          return (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}