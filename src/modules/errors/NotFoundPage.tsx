'use client';

import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';

export function NotFoundPage() {
  const navigate = useNavigate();

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted"
            >
              <AlertCircle className="h-10 w-10 text-muted-foreground" />
            </motion.div>
            <CardTitle className="text-center text-2xl">Page Not Found</CardTitle>
            <CardDescription className="text-center">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-muted-foreground"
            >
              <p>
                You might have followed a broken link, mistyped the address, or the page may have
                been moved or deleted.
              </p>
            </motion.div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              id="go-home-button"
              variant="default"
              className="w-full cursor-pointer"
              onClick={() => void navigate({ to: '/' })}
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => void navigate({ to: window.history.length > 2 ? -1 : '/' })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
