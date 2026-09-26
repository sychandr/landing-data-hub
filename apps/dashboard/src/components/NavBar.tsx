import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:text-foreground',
    isActive
      ? 'border-primary text-foreground'
      : 'text-muted-foreground',
  );

export function NavBar() {
  return (
    <nav className="flex items-center gap-2 border-b border-border px-4">
      <NavLink to="/" className={linkClass} end>
        Submit
      </NavLink>
      <NavLink to="/inquiries" className={linkClass}>
        Inquiries
      </NavLink>
    </nav>
  );
}
