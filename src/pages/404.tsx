import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import * as m from 'motion/react-m';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card.tsx';
import { router } from '@/routes/router.ts';

const NotFoundIllustration = () => (
  <svg className="w-full" fill="none" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <m.g animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
      {/* Compass body */}
      <circle
        className="text-muted-foreground/20"
        cx="250"
        cy="200"
        fill="currentColor"
        r="100"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle className="text-background" cx="250" cy="200" fill="currentColor" r="90" />

      {/* Compass marks */}
      {[0, 90, 180, 270].map(angle => (
        <line
          className="text-muted-foreground/40"
          key={angle}
          stroke="currentColor"
          strokeWidth="2"
          x1={250 + 80 * Math.cos(((angle - 90) * Math.PI) / 180)}
          x2={250 + 90 * Math.cos(((angle - 90) * Math.PI) / 180)}
          y1={200 + 80 * Math.sin(((angle - 90) * Math.PI) / 180)}
          y2={200 + 90 * Math.sin(((angle - 90) * Math.PI) / 180)}
        />
      ))}

      {/* Spinning confused needle */}
      <m.g
        animate={{ rotate: [0, 720, 360, 450, 405] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.6, 0.8, 1] }}
      >
        <path
          className="text-destructive"
          d="M250,200 L255,180 L250,140 L245,180 Z"
          fill="currentColor"
        />
        <path
          className="text-muted-foreground"
          d="M250,200 L255,220 L250,260 L245,220 Z"
          fill="currentColor"
        />
      </m.g>

      {/* Center dot */}
      <circle className="text-foreground" cx="250" cy="200" fill="currentColor" r="5" />
    </m.g>

    {/* 404 text */}
    <text className="fill-foreground text-5xl font-bold" textAnchor="middle" x="250" y="350">
      404
    </text>
    {/* eslint-disable-next-line i18next/no-literal-string */}
    <text className="fill-muted-foreground text-lg" textAnchor="middle" x="250" y="380">
      Direction Not Found
    </text>
  </svg>
);

export function NotFoundPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('go-home-button')?.focus();
    }, 100);
    return () => {
      clearTimeout(timer);
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
          <p className="text-sm font-medium text-primary">{t('404.text', '404 error')}</p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
            {t('page.not.found')}
          </h1>
          <p className="mt-4 text-muted-foreground">{t('sorry.text')}</p>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-foreground transition-colors duration-200 bg-background border border-border rounded-lg gap-x-2 sm:w-auto hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                router.history.back();
              }}
            >
              <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
              <span>{t('back', { ns: 'common' })}</span>
            </button>
            <Link to="/">
              <button
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-primary-foreground transition-colors duration-200 bg-primary rounded-lg shrink-0 sm:w-auto hover:bg-primary/90"
                id="go-home-button"
              >
                <Home className="mr-2 h-4 w-4 inline" />
                {t('home', { ns: 'common' })}
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
          <NotFoundIllustration />
        </m.div>
      </div>
    </section>
  );
}

export function PageNotFoundModal() {
  const navigate = useNavigate();
  const router = useRouter();
  const { t } = useTranslation();

  // Auto-focus the "Go Home" button for accessibility
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('go-home-button')?.focus();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <m.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <m.div
              animate={{ scale: 1 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted"
              initial={{ scale: 0.8 }}
              transition={{ delay: 0.2, stiffness: 100, type: 'spring' }}
            >
              <AlertCircle className="h-10 w-10 text-muted-foreground" />
            </m.div>
            <CardTitle className="text-center text-2xl">{t('page.not.found')}</CardTitle>
            <CardDescription className="text-center">{t('page.moved.text')}</CardDescription>
          </CardHeader>
          <CardContent>
            <m.div
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p>{t('broken.link')}</p>
            </m.div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="w-full cursor-pointer"
              id="go-home-button"
              onClick={() => void navigate({ to: '/' })}
              variant="default"
            >
              <Home className="mr-2 h-4 w-4" />
              {t('home', { ns: 'common' })}
            </Button>
            <Button
              className="w-full cursor-pointer"
              onClick={() => {
                (router.history as History).back();
              }}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('back', { ns: 'common' })}
            </Button>
          </CardFooter>
        </Card>
      </m.div>
    </div>
  );
}

export default NotFoundPage;
