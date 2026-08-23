import { NavLink, useLocation } from 'react-router-dom';
import { Home, Flame, PlusCircle, Megaphone, User, X, Menu } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

const tabs = [
  { path: '/feed', icon: Home, label: 'Mũciĩ' },
  { path: '/trending', icon: Flame, label: 'Rũgano' },
  { path: '/create', icon: PlusCircle, label: 'Create' },
  { path: '/promote', icon: Megaphone, label: 'Promote' },
  { path: '/profile', icon: User, label: 'Njũgĩ' },
];

const ICON_COUNT = tabs.length;
const ANGLE_PER_ICON = 360 / ICON_COUNT; // 72° each
const RADIUS = 90;

const BottomNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startAngleRef = useRef(0);
  const startRotationRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const lastAngleRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameRef = useRef<number>();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getCenterPoint = useCallback(() => {
    if (!containerRef.current) return { cx: 0, cy: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
  }, []);

  const getAngleFromEvent = useCallback((clientX: number, clientY: number) => {
    const { cx, cy } = getCenterPoint();
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  }, [getCenterPoint]);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    if (!isOpen) return;
    setIsDragging(true);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    startAngleRef.current = getAngleFromEvent(clientX, clientY);
    startRotationRef.current = rotation;
    velocityRef.current = 0;
    lastAngleRef.current = startAngleRef.current;
    lastTimeRef.current = Date.now();
  }, [isOpen, getAngleFromEvent, rotation]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    const currentAngle = getAngleFromEvent(clientX, clientY);
    const delta = currentAngle - startAngleRef.current;
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (currentAngle - lastAngleRef.current) / dt;
    }
    lastAngleRef.current = currentAngle;
    lastTimeRef.current = now;
    setRotation(startRotationRef.current + delta);
  }, [isDragging, getAngleFromEvent]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    // Momentum
    let vel = velocityRef.current * 8;
    const decelerate = () => {
      vel *= 0.94;
      if (Math.abs(vel) < 0.05) return;
      setRotation(prev => prev + vel);
      animFrameRef.current = requestAnimationFrame(decelerate);
    };
    decelerate();
  }, [isDragging]);

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  }, [handleStart]);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  }, [handleMove]);
  const onTouchEnd = useCallback(() => handleEnd(), [handleEnd]);

  // Mouse handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  }, [handleStart]);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);
  const onMouseUp = useCallback(() => handleEnd(), [handleEnd]);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalUp = () => handleEnd();
      window.addEventListener('mouseup', handleGlobalUp);
      window.addEventListener('touchend', handleGlobalUp);
      return () => {
        window.removeEventListener('mouseup', handleGlobalUp);
        window.removeEventListener('touchend', handleGlobalUp);
      };
    }
  }, [isDragging, handleEnd]);

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Rotating wheel */}
      <div
        ref={containerRef}
        className="relative z-50 w-[220px] h-[220px] flex items-center justify-center"
        style={{
          position: 'absolute',
          bottom: '-83px',
          right: '-83px',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* Orbit ring */}
        {isOpen && (
          <div
            className="absolute inset-0 rounded-full border-2 border-accent/20 transition-all duration-500"
            style={{
              transform: `scale(${isOpen ? 1 : 0})`,
              opacity: isOpen ? 1 : 0,
            }}
          />
        )}

        {/* Icons on the wheel */}
        {tabs.map(({ path, icon: Icon, label }, index) => {
          const isActive = location.pathname === path;
          const baseAngle = index * ANGLE_PER_ICON;
          const totalAngle = baseAngle + rotation;
          const radians = (totalAngle * Math.PI) / 180;
          const x = Math.cos(radians) * RADIUS;
          const y = Math.sin(radians) * RADIUS;

          return (
            <NavLink
              key={path}
              to={path}
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault();
                  return;
                }
                setIsOpen(false);
              }}
              className="absolute flex flex-col items-center gap-0.5 transition-all duration-300 ease-out"
              style={{
                left: '50%',
                top: '50%',
                transform: isOpen
                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
                  : 'translate(-50%, -50%) scale(0)',
                opacity: isOpen ? 1 : 0,
                transitionDelay: isOpen ? `${index * 60}ms` : '0ms',
                pointerEvents: isOpen ? 'auto' : 'none',
              }}
            >
              <div
                className={`flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-colors ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card text-foreground border border-border'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[9px] font-semibold whitespace-nowrap ${
                  isActive ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => {
          if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
          setIsOpen(!isOpen);
          if (isOpen) setRotation(0);
        }}
        className="relative z-[60] w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-xl flex items-center justify-center transition-transform duration-300 active:scale-90"
        style={{
          boxShadow: '0 4px 20px hsla(16, 80%, 55%, 0.4)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default BottomNav;
