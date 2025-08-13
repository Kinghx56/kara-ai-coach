import { useState, useEffect } from 'react';
import { Menu, X, User, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavigationProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Navigation({ isAuthenticated = false, user }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
              KARA AI
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </a>
                <a href="/start-session" className="text-foreground hover:text-primary transition-colors">
                  Start Session
                </a>
                <a href="/history" className="text-foreground hover:text-primary transition-colors">
                  History
                </a>
              </>
            ) : (
              <>
                <a href="#features" className="text-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="/pricing" className="text-foreground hover:text-primary transition-colors">
                  Pricing
                </a>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Upgrade to Premium</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Login
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Sign Up Free
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-card/80 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <a
                    href="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/start-session"
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                  >
                    Start Session
                  </a>
                  <a
                    href="/history"
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                  >
                    History
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#features"
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                  >
                    Features
                  </a>
                  <a
                    href="/pricing"
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                  >
                    Pricing
                  </a>
                </>
              )}
              <div className="pt-4 pb-2 border-t border-border/50">
                {!isAuthenticated && (
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Sign Up Free
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}