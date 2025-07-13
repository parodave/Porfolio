import { Component, ReactNode } from 'react';
import i18n from '../i18n';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Canvas error:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>{i18n.t('errorBoundary.default')}</div>;
    }
    return this.props.children;
  }
}
