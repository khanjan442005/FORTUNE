import { Component } from "react"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error("UI boundary caught an error.", error, errorInfo)
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-[#07111f] px-6">
          <div className="glass w-full max-w-xl rounded-3xl border border-white/10 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-blue-300/80">Runtime Error</p>
            <h2 className="mt-4 text-3xl font-bold text-white">This screen could not load.</h2>
            <p className="mt-3 text-sm text-slate-400">
              Reload the route or go back to the home page.
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="mt-6 rounded-full border border-blue-400/20 bg-blue-400/10 px-5 py-2 text-sm font-medium text-blue-200 transition-colors hover:border-blue-300/40 hover:text-white"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
