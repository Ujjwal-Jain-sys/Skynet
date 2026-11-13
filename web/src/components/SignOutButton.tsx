"use client";

// components/SignOutButton.tsx
// Log out action — ends Better Auth session and returns to /.
// Degrades gracefully when not authenticated (renders nothing).

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSafeAuth, authClient } from "@/lib/auth-client";
import { Button } from "@/components/Button";

interface SignOutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function SignOutButton({ className, ...props }: SignOutButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useSafeAuth();

  // If the visitor isn't authenticated, render nothing.
  if (!isAuthenticated) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } finally {
      router.push("/");
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="md"
      className={className}
      {...props}
      onClick={(e) => {
        props.onClick?.(e as React.MouseEvent<HTMLButtonElement>);
        void handleSignOut();
      }}
    >
      Log out
    </Button>
  );
}