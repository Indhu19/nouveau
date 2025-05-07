'use client';

import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ErrorCard } from '@/modules/errors/ErrorCard.tsx';

interface ErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export function ErrorPage({ error, resetErrorBoundary }: ErrorPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('try-again-button')?.focus();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleReset = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <ErrorCard
      message={error?.message}
      stack={error?.stack}
      onHome={() => void navigate({ to: '/' })}
      onRetry={handleReset}
      className="h-full"
    />
  );

  // return (
  //   <div className="flex h-full w-full items-center justify-center p-6">
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.5 }}
  //       className="w-full max-w-md"
  //     >
  //       <Card className="border-2 border-destructive/20 shadow-lg">
  //         <CardHeader>
  //           <motion.div
  //             initial={{ scale: 0.8, rotate: -10 }}
  //             animate={{ scale: 1, rotate: 0 }}
  //             transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
  //             className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10"
  //           >
  //             <XCircle className="h-10 w-10 text-destructive" />
  //           </motion.div>
  //           <CardTitle className="text-center text-2xl">Something Went Wrong</CardTitle>
  //           <CardDescription className="text-center">
  //             We encountered an error while processing your request
  //           </CardDescription>
  //         </CardHeader>
  //         <CardContent>
  //           <motion.div
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             transition={{ delay: 0.4 }}
  //             className="mt-2 rounded-md bg-muted p-4"
  //           >
  //             <p className="font-mono text-sm text-muted-foreground">
  //               {error?.message ?? 'An unexpected error occurred'}
  //             </p>
  //             {process.env.NODE_ENV === 'development' && error?.stack && (
  //               <details className="mt-2">
  //                 <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
  //                   <Bug className="mr-1 inline-block h-3 w-3" /> Stack trace
  //                 </summary>
  //                 <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
  //                   {error.stack}
  //                 </pre>
  //               </details>
  //             )}
  //           </motion.div>
  //         </CardContent>
  //         <CardFooter className="flex flex-col gap-2">
  //           <Button
  //             id="try-again-button"
  //             variant="default"
  //             className="w-full"
  //             onClick={handleReset}
  //           >
  //             <RefreshCw className="mr-2 h-4 w-4" />
  //             Try Again
  //           </Button>
  //           <Button variant="outline" className="w-full" onClick={handleReturnHome}>
  //             Return Home
  //           </Button>
  //         </CardFooter>
  //       </Card>
  //     </motion.div>
  //   </div>
  // );
}
