import { Component, type ReactNode } from 'react';
import { Shield, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Kalasag Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
          <div className="glass-card rounded-3xl p-8 md:p-12 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--error)]/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[var(--error)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              Something went wrong
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              We apologize for the inconvenience. Your data is safe — this is just a temporary issue.
            </p>
            {this.state.error && (
              <p className="text-xs text-[var(--text-muted)] mb-6 font-mono bg-[var(--bg-surface-solid)] rounded-xl p-3 overflow-x-auto">
                {this.state.error.message}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleReload}
                className="btn-primary w-full sm:w-auto"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>
              <Link to="/" className="btn-secondary w-full sm:w-auto">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
