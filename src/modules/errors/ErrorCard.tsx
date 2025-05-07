'use client';

import { motion } from 'framer-motion';
import { Bug, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  stack?: string;
  onRetry?: () => void;
  onHome?: () => void;
  className?: string;
}

export function ErrorCard({
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred',
  stack,
  onRetry,
  onHome,
  className = '',
}: ErrorDisplayProps) {
  return (
    <div className={`flex w-full items-center justify-center p-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-destructive/20 shadow-lg">
          <CardHeader>
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10"
            >
              <XCircle className="h-10 w-10 text-destructive" />
            </motion.div>
            <CardTitle className="text-center text-2xl">{title}</CardTitle>
            <CardDescription className="text-center">
              We encountered an error while processing your request.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2 rounded-md bg-muted p-4">
              <p className="font-mono text-sm text-muted-foreground">{message}</p>
              {process.env.NODE_ENV === 'development' && stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
                    <Bug className="mr-1 inline-block h-3 w-3" /> Stack trace
                  </summary>
                  <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
                    {stack}
                  </pre>
                </details>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            {onRetry && (
              <Button
                id="try-again-button"
                variant="default"
                className="w-full cursor-pointer"
                onClick={onRetry}
              >
                Try Again
              </Button>
            )}
            {onHome && (
              <Button variant="outline" className="w-full cursor-pointer" onClick={onHome}>
                Return Home
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
