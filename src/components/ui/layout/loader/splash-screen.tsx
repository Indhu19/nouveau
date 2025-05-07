import { AnimatePresence, motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/ui/layout/loader/loading-spinner.tsx';

export type LoadingStyle = 'spinner' | 'typing-dots' | 'dot-bounce';
export type LogoAnimation = 'none' | 'pulse' | 'bounce' | 'scaleIn' | 'float';

export interface SplashScreenProps {
  isLoading: boolean;
  logoSrc?: string;
  title?: string;
  subtitle?: string;
  logoAnimation?: LogoAnimation;
  loadingStyle?: LoadingStyle;
}

export function SplashScreen({
  isLoading,
  logoSrc,
  title,
  subtitle,
  logoAnimation = 'pulse',
  loadingStyle = 'dot-bounce',
}: SplashScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className="flex flex-col items-center justify-center space-y-8">
            {logoSrc && <Logo logoSrc={logoSrc} animationType={logoAnimation} />}
            {title && <TitleSection title={title} subtitle={subtitle} />}
            <LoaderSection loadingStyle={loadingStyle} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Logo({
  logoSrc,
  animationType = 'none',
}: {
  logoSrc: string;
  animationType?: LogoAnimation;
}) {
  const animationProps = getLogoAnimationProps(animationType);

  return (
    <motion.div className="relative" {...animationProps.container}>
      {animationProps.background && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/10"
          {...animationProps.background}
        />
      )}

      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-background shadow-lg">
        <img src={logoSrc} alt="App logo" className="h-16 w-16 object-contain" />
      </div>
    </motion.div>
  );
}

function getLogoAnimationProps(animationType: LogoAnimation) {
  switch (animationType) {
    case 'pulse':
      return {
        container: {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.5 },
        },
        background: {
          animate: { scale: [1, 1.2, 1], opacity: [0.7, 0.3, 0.7] },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
      };

    case 'bounce':
      return {
        container: {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1, y: [0, -15, 0] },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse' as const,
            ease: 'easeInOut',
          },
        },
      };

    case 'scaleIn':
      return {
        container: {
          initial: { scale: 0 },
          animate: { scale: 1 },
          transition: { duration: 0.6, ease: 'backOut' },
        },
      };

    case 'float':
      return {
        container: {
          animate: { y: [0, -10, 0] },
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse' as const,
            ease: 'easeInOut',
          },
        },
      };

    case 'none':
    default:
      return {
        container: {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.5 },
        },
      };
  }
}

function TitleSection({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: 'backOut' }}
      className="text-center"
    >
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

function LoaderSection({ loadingStyle }: { loadingStyle?: LoadingStyle }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex flex-col items-center text-muted-foreground"
    >
      {loadingStyle === 'spinner' && <LoadingSpinner />}
      {loadingStyle === 'typing-dots' && <TypingDots />}
      {loadingStyle === 'dot-bounce' && <BouncingDots />}
    </motion.div>
  );
}

function TypingDots() {
  return (
    <motion.div
      className="flex items-center text-muted-foreground mt-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <span className="text-base font-medium">Loading</span>
      <motion.span
        className="inline-flex w-6 justify-start ml-1"
        initial={{ width: 0 }}
        animate={{ width: 24 }}
        transition={{ duration: 0.2 }}
      >
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.span
            key={i}
            className="text-primary text-xl"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
              times: [0, 0.5, 1],
              delay,
            }}
          >
            .
          </motion.span>
        ))}
      </motion.span>
    </motion.div>
  );
}

function BouncingDots() {
  const dotsContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop' as const,
      },
    },
  };

  return (
    <motion.div
      className="flex mt-2 space-x-2"
      variants={dotsContainerVariants}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="h-3 w-3 rounded-full bg-primary"
          variants={dotVariants}
          style={{ originY: 0.7 }}
        />
      ))}
    </motion.div>
  );
}
