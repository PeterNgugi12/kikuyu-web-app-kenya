import { Link, useLocation } from 'react-router-dom';
import { Bell, MessageCircle, Cast } from 'lucide-react';
import doveLogo from '@/assets/dove-logo.png';

const Header = () => {
  const location = useLocation();

  return (
    <>
      {/* Status bar tint */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[env(safe-area-inset-top,0px)] thutha-gradient" />

      <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border md:pl-60">
        <div className="flex items-center h-14 px-4">
          {/* Logo + Brand */}
          <div className="flex items-center gap-2.5">
            <img src={doveLogo} alt="Thutha" className="w-8 h-8 bg-transparent" style={{ mixBlendMode: 'multiply' }} />
            <h1 className="font-heading font-bold text-xl text-foreground tracking-tight hidden sm:block">
              Thutha
            </h1>
          </div>

          <div className="flex-1" />

          {/* Action icons — subtle, editorial */}
          <div className="flex items-center gap-1">
            <Link
              to="/trending"
              className={`p-2.5 rounded-full transition-all ${
                location.pathname === '/trending'
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Cast className="w-5 h-5" />
            </Link>
            <Link
              to="/notifications"
              className={`p-2.5 rounded-full transition-all relative ${
                location.pathname === '/notifications'
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full ring-2 ring-card" />
            </Link>
            <Link
              to="/messages"
              className={`p-2.5 rounded-full transition-all ${
                location.pathname === '/messages'
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
            <Link to="/profile" className="ml-1.5">
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-accent/30 hover:ring-accent/60 transition-all"
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
