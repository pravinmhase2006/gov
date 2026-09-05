import React from 'react';
import { CardSkeleton } from './SkeletonLoader';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';

interface DataBoundaryProps {
  loading: boolean;
  error?: string | null;
  isEmpty?: boolean;
  onRetry?: () => void;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  children: React.ReactNode;
}

export default function DataBoundary({
  loading,
  error,
  isEmpty,
  onRetry,
  loadingComponent = <CardSkeleton count={3} />,
  emptyComponent,
  errorComponent,
  emptyTitle,
  emptyDescription,
  children,
}: DataBoundaryProps) {
  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    if (errorComponent) return <>{errorComponent}</>;
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (isEmpty) {
    if (emptyComponent) return <>{emptyComponent}</>;
    return <EmptyState title={emptyTitle} description={emptyDescription} onAction={onRetry} actionLabel={onRetry ? "Refresh" : undefined} />;
  }

  return <>{children}</>;
}
