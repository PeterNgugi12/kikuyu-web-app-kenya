import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import DesktopSidebar from './DesktopSidebar';
import RightSidebar from './RightSidebar';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DesktopSidebar />
      <div className="pt-14 md:pl-60">
        <div className="max-w-[1080px] mx-auto flex">
          <main className="flex-1 min-w-0 max-w-[680px] min-h-[calc(100vh-3.5rem)] pb-20 md:pb-4 px-0 md:px-4">
            <Outlet />
          </main>
          <RightSidebar />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
