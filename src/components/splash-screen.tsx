import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import { useIcon } from '@/hooks/useLogo.ts';

export type LoadingStyle = 'dot-bounce' | 'spinner' | 'typing-dots';
export type LogoAnimation = 'bounce' | 'float' | 'none' | 'pulse' | 'scaleIn';

export interface SplashScreenProps {
  isLoading: boolean;
  loadingStyle: LoadingStyle;
  logoAnimation?: LogoAnimation;
  logoSrc?: string;
  subtitle?: string;
  title?: string;
}

export function Logo({
  animationType = 'none',
  logoSrc
}: {
  animationType?: LogoAnimation;
  logoSrc: string;
}) {
  const animationProps = getLogoAnimationProps(animationType);

  return (
    <m.div className="relative" {...animationProps.container}>
      {animationProps.background && (
        <m.div
          className="absolute inset-0 rounded-full bg-primary/10"
          {...animationProps.background}
        />
      )}

      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-background shadow-lg">
        <img alt="App logo" className="h-16 w-16 object-contain" src={logoSrc} />
      </div>
    </m.div>
  );
}

export function SplashScreen({
  isLoading,
  loadingStyle,
  logoAnimation,
  logoSrc,
  subtitle,
  title
}: SplashScreenProps) {
  const icon = useIcon();
  logoSrc ??= icon;
  return (
    <AnimatePresence>
      {isLoading && (
        <m.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          initial={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center justify-center space-y-8">
            {logoSrc && <Logo animationType={logoAnimation} logoSrc={logoSrc} />}
            {title && <TitleSection subtitle={subtitle} title={title} />}
            <LoaderSection loadingStyle={loadingStyle} />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function BouncingDots() {
  const dotsContainerVariants = {
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
    initial: { opacity: 0 }
  };

  const dotVariants = {
    animate: {
      transition: {
        duration: 0.6,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop' as const
      },
      y: [0, -10, 0]
    },
    initial: { y: 0 }
  };

  return (
    <m.div
      animate="animate"
      className="flex mt-2 space-x-2"
      initial="initial"
      variants={dotsContainerVariants}
    >
      {[0, 1, 2].map(i => (
        <m.div
          className="h-3 w-3 rounded-full bg-primary"
          key={i}
          style={{ originY: 0.7 }}
          variants={dotVariants}
        />
      ))}
    </m.div>
  );
}

function getLogoAnimationProps(animationType: LogoAnimation) {
  switch (animationType) {
    case 'bounce':
      return {
        container: {
          animate: { opacity: 1, scale: 1, y: [0, -15, 0] },
          initial: { opacity: 0, scale: 0.8 },
          transition: {
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse' as const
          }
        }
      };

    case 'float':
      return {
        container: {
          animate: { y: [0, -10, 0] },
          transition: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse' as const
          }
        }
      };

    case 'pulse':
      return {
        background: {
          animate: { opacity: [0.7, 0.3, 0.7], scale: [1, 1.2, 1] },
          transition: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity
          }
        },
        container: {
          animate: { opacity: 1, scale: 1 },
          initial: { opacity: 0, scale: 0.8 },
          transition: { duration: 0.5 }
        }
      };

    case 'scaleIn':
      return {
        container: {
          animate: { scale: 1 },
          initial: { scale: 0 },
          transition: { duration: 0.6, ease: 'backOut' }
        }
      };

    case 'none':
    default:
      return {
        container: {
          animate: { opacity: 1, scale: 1 },
          initial: { opacity: 0, scale: 0.8 },
          transition: { duration: 0.5 }
        }
      };
  }
}

function LoaderSection({ loadingStyle }: { loadingStyle?: LoadingStyle }) {
  return (
    <m.div
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-muted-foreground"
      initial={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {loadingStyle === 'typing-dots' && <TypingDots />}
      {loadingStyle === 'dot-bounce' && <BouncingDots />}
    </m.div>
  );
}

function TitleSection({ subtitle, title }: { subtitle?: string; title: string }) {
  return (
    <m.div
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: 0.3, duration: 0.5, ease: 'backOut' }}
    >
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </m.div>
  );
}

function TypingDots() {
  const { t } = useTranslation();
  return (
    <m.div
      animate={{ opacity: 1 }}
      className="flex items-center text-muted-foreground mt-1"
      initial={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <span className="text-base font-medium">{t('loading')}</span>
      <m.span
        animate={{ width: 24 }}
        className="inline-flex w-6 justify-start ml-1"
        initial={{ width: 0 }}
        transition={{ duration: 0.2 }}
      >
        {[0, 0.2, 0.4].map((delay, i) => (
          <m.span
            animate={{ opacity: [0, 1, 0] }}
            className="text-primary text-xl"
            key={i}
            transition={{
              delay,
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
              times: [0, 0.5, 1]
            }}
          >
            .
          </m.span>
        ))}
      </m.span>
    </m.div>
  );
}
