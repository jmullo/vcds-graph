import React from 'react';

import { FileContext } from 'components/FileContext';

class ErrorBoundary extends React.Component {

    state = {
        error: false
    }

    static getDerivedStateFromError() {
        return { error: true };
    }

    componentDidCatch() {
        this.context.removeInvalidFile();
    }

    render() {
        if (this.state.error) {
            return null;
        }

        return this.props.children;
    }
}

ErrorBoundary.contextType = FileContext;

export default ErrorBoundary;
