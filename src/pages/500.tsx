import { Link } from '@tanstack/react-router';
import { Bug, Home, RefreshCw } from 'lucide-react';
import * as m from 'motion/react-m';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Server Error Illustration
export const ServerErrorIllustration = () => (
  <svg
    className="w-full max-w-lg lg:mx-auto"
    fill="none"
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
  >
    <m.g animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
      {/* Server rack */}
      <rect
        className="text-muted-foreground/20"
        fill="currentColor"
        height="250"
        rx="10"
        stroke="currentColor"
        strokeWidth="2"
        width="200"
        x="150"
        y="100"
      />

      {/* Server slots */}
      {[120, 170, 220, 270].map((y, i) => (
        <m.g key={i}>
          <rect
            className="text-muted-foreground/10"
            fill="currentColor"
            height="35"
            rx="5"
            width="160"
            x="170"
            y={y}
          />

          {/* Status LEDs */}
          <m.circle
            animate={i === 2 ? { opacity: [0.3, 1, 0.3] } : {}}
            className={i === 2 ? 'text-destructive' : 'text-chart-2/50'}
            cx="190"
            cy={y + 17.5}
            fill="currentColor"
            r="4"
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <circle
            className="text-muted-foreground/30"
            cx="205"
            cy={y + 17.5}
            fill="currentColor"
            r="4"
          />

          {/* Server vents */}
          <line
            className="text-muted-foreground/20"
            stroke="currentColor"
            strokeWidth="1"
            x1="230"
            x2="310"
            y1={y + 10}
            y2={y + 10}
          />
          <line
            className="text-muted-foreground/20"
            stroke="currentColor"
            strokeWidth="1"
            x1="230"
            x2="310"
            y1={y + 17.5}
            y2={y + 17.5}
          />
          <line
            className="text-muted-foreground/20"
            stroke="currentColor"
            strokeWidth="1"
            x1="230"
            x2="310"
            y1={y + 25}
            y2={y + 25}
          />
        </m.g>
      ))}

      {/* Smoke/heat effect */}
      <m.g>
        {[0, 1, 2].map(i => (
          <m.circle
            animate={{
              opacity: [0.6, 0.3, 0],
              scale: [1, 1.5, 2],
              y: [220, 180, 160]
            }}
            className="text-muted-foreground/30"
            cx={240 + i * 10}
            cy={220}
            fill="currentColor"
            key={i}
            r="3"
            transition={{
              delay: i * 0.3,
              duration: 2,
              ease: 'easeOut',
              repeat: Infinity
            }}
          />
        ))}
      </m.g>
    </m.g>

    {/* 500 text */}
    <text className="fill-foreground text-5xl font-bold" textAnchor="middle" x="250" y="420">
      500
    </text>
    {/* eslint-disable-next-line i18next/no-literal-string */}
    <text className="fill-muted-foreground text-lg" textAnchor="middle" x="250" y="450">
      Server Error
    </text>
  </svg>
);

interface ServerErrorProps {
  error: Error;
}

export function ServerErrorPage({ error }: ServerErrorProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('go-home-button')?.focus();
    }, 100);

    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 30_000); // 30 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(refreshInterval);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <section className="bg-background">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <m.div
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-destructive">{t('500.error')}</p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
            {t('internal.error')}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {error.message || 'Something went wrong on our servers. Please try again later.'}.
          </p>
          {process.env.NODE_ENV === 'development' && error.stack && (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
                <Bug className="mr-1 inline-block h-3 w-3" />
                {t('stack.trace')}
              </summary>
              <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
                {error.stack}
              </pre>
            </details>
          )}

          <div className="flex items-center mt-6 gap-x-3">
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-foreground transition-colors duration-200 bg-background border border-border rounded-lg gap-x-2 sm:w-auto hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                window.location.reload();
              }}
            >
              <RefreshCw className="w-5 h-5 rtl:rotate-180" />
              <span>{t('refresh')}</span>
            </button>
            <Link to="/">
              <button
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-primary-foreground transition-colors duration-200 bg-primary rounded-lg shrink-0 sm:w-auto hover:bg-primary/90"
                id="go-home-button"
              >
                <Home className="mr-2 h-4 w-4 inline" />
                {t('take.me.home')}
              </button>
            </Link>
          </div>
        </m.div>

        <m.div
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full mt-12 lg:w-1/2 lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ServerErrorIllustration />
        </m.div>
      </div>
    </section>
  );
}

export default ServerErrorPage;
