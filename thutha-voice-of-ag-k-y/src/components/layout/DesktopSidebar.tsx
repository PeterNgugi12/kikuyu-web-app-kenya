import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Flame, PlusCircle, Megaphone, User, Wallet, Settings, LogOut } from 'lucide-react';
import doveLogo from '@/assets/dove-logo.png';

const navItems = [
  { path: '/feed', icon: Home, label: 'Mũciĩ' },
  { path: '/trending', icon: Flame, label: 'Rũgano' },
  { path: '/create', icon: PlusCircle, label: 'Create' },
  { path: '/promote', icon: Megaphone, label: 'Promote' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/wallet', icon: Wallet, label: 'Wallet' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const DesktopSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 bg-card border-r border-border flex-col z-50">
      <div className="flex items-center gap-3 px-6 h-14 border-b border-border">
        <img src={doveLogo} alt="Thutha" className="w-9 h-9" />
        <span className="font-heading font-bold text-xl text-foreground">Thutha</span>
      </div>

      {/* Accent bar */}
      <div className="mx-4 mt-4 thutha-accent-bar" />

      <nav className="flex-1 py-3 px-3 space-y-0.5">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent/10 text-accent font-semibold border-l-[3px] border-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
