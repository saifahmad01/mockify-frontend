import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Header } from '@/components/layout/Header';

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <LoadingSpinner fullScreen />;

  return (
    <div>
      {/* TODO: Replace with a shared Dashboard layout, including dashboard specific header, sidebar etc.. */}
      <Header />
      <main className="container px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
