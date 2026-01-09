import { useState } from 'react';
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import {
  useForgotPassword,
  useResetPassword,
} from '@/hooks/use-password';

export const Route = createFileRoute('/_auth/reset-password')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: typeof search.token === 'string' ? search.token : undefined,
    };
  },
  component: ResetPasswordPage,
});

export default function ResetPasswordPage() {
  const search = useSearch({ from: '/_auth/reset-password' });
  const token = search.token ?? null;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {!token ? (
          <ForgotPasswordView />
        ) : (
          <ResetPasswordView token={token} />
        )}
      </div>
    </div>
  );
}

// FORGOT PASSWORD
function ForgotPasswordView() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const forgotPassword = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    forgotPassword.mutate(email.trim(), {
      onSettled: () => setSubmitted(true), // success OR error
    });
  };

  if (submitted) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="text-xl font-semibold">Reset your password</h1>

        <p className="text-sm text-muted-foreground">
          Check your email for a link to reset your password.
          If it doesn’t appear within a few minutes, check your spam folder.
        </p>

        <Link to="/login" className="text-sm text-primary">
          Return to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold text-center">
        Reset your password
      </h1>

      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />

      <button
        type="submit"
        disabled={forgotPassword.isPending}
        className="w-full rounded bg-primary py-2 text-white disabled:opacity-60"
      >
        {forgotPassword.isPending ? 'Sending…' : 'Send reset link'}
      </button>

      <div className="text-center">
        <Link to="/login" className="text-sm text-primary">
          Return to sign in
        </Link>
      </div>
    </form>
  );
}

// RESET PASSWORD
function ResetPasswordView({ token }: { token: string }) {
  const navigate = useNavigate();
  const resetPassword = useResetPassword();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const isValidPassword =
    password.length >= 15 ||
    (password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isValidPassword) {
      setError('Password does not meet requirements');
      return;
    }

    setError('');

    resetPassword.mutate(
      { token, newPassword: password },
      {
        onSuccess: () => {
          navigate({ to: '/login' });
        },
      }
    );
  };

  if (resetPassword.isError) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="text-xl font-semibold">
          Reset link invalid or expired
        </h1>

        <p className="text-sm text-muted-foreground">
          Please request a new password reset link.
        </p>

        <Link to="/reset-password" className="text-sm text-primary">
          Request new reset link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold text-center">
        Change your password
      </h1>

      <p className="text-sm text-muted-foreground">
        Make sure it's at least 15 characters OR at least 8 characters
        including a number and a lowercase letter.
      </p>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError('');
        }}
        className="w-full rounded border px-3 py-2"
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setError('');
        }}
        className="w-full rounded border px-3 py-2"
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={resetPassword.isPending}
        className="w-full rounded bg-primary py-2 text-white disabled:opacity-60"
      >
        {resetPassword.isPending ? 'Updating…' : 'Update password'}
      </button>

      <div className="text-center">
        <Link to="/login" className="text-sm text-primary">
          Return to sign in
        </Link>
      </div>
    </form>
  );
}
