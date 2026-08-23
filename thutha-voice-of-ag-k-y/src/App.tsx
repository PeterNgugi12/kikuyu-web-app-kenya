// src/App.tsx - Fixed provider order
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Trending from "./pages/Trending";
import Create from "./pages/Create";
import Promote from "./pages/Promote";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import PrivacySettings from "./pages/PrivacySettings";
import VerifiedBadge from "./pages/VerifiedBadge";
import PaymentSettings from "./pages/PaymentSettings";
import CreatorDashboard from "./pages/CreatorDashboard";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import PostDetail from "./pages/PostDetail";
import Onboarding from "./pages/Onboarding";
import VideoReels from "./pages/VideoReels";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";
import { SocketProvider } from "./contexts/SocketContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter> {/* BrowserRouter MUST be before AuthProvider */}
        <AuthProvider> {/* AuthProvider MUST be inside BrowserRouter */}
          <SocketProvider>
            <Toaster />
            <Sonner position="top-center" richColors closeButton />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Splash />} />
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              
              {/* Protected Routes without Layout */}
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reels" 
                element={
                  <ProtectedRoute>
                    <VideoReels />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Routes with AppLayout */}
              <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/feed" element={<Feed />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/create" element={<Create />} />
                <Route path="/promote" element={<Promote />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/edit-profile" element={<EditProfile />} />
                <Route path="/settings/privacy" element={<PrivacySettings />} />
                <Route path="/settings/verified" element={<VerifiedBadge />} />
                <Route path="/settings/payment" element={<PaymentSettings />} />
                <Route path="/dashboard" element={<CreatorDashboard />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/post/:id" element={<PostDetail />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;