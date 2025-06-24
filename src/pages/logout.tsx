import { ArrowRight, CheckCircle, LogOut } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button.tsx';
import { useAuth } from '@/hooks/useAuth.ts';

const LogoutPage: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const { login } = useAuth();
  const { t } = useTranslation(['logout', 'common']);

  useEffect(() => {
    // Trigger animations on mount
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    const checkTimer = setTimeout(() => {
      setShowCheck(true);
    }, 600);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(checkTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/20"></div>

      {/* Main content */}
      <div
        className={`relative z-10 max-w-md w-full transform transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-border">
          {/* Animated icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`relative transform transition-all duration-700 ${showCheck ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}
            >
              <div className="absolute inset-0 bg-chart-2/50 rounded-full blur-xl animate-pulse"></div>
              <CheckCircle className="relative w-20 h-20 text-chart-2" />
            </div>
          </div>

          {/* Text content */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{t('success')}</h1>
            <p className="text-muted-foreground">{t('thank.you')}</p>

            {/* Action buttons */}
            <div className="pt-6 space-y-3">
              <Button
                className="group relative inline-flex items-center justify-center w-full px-6 py-3 text-primary-foreground font-medium rounded-lg bg-primary transition-all duration-300 hover:opacity-90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                onClick={() => {
                  login();
                }}
              >
                <span className="flex items-center gap-2">
                  {t('login')}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>

          {/* Security note */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LogOut className="w-4 h-4" />
              <span>{t('logout.session.message')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
