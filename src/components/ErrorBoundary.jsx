import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="error-boundary">
        <div className="eb-card">
          <span className="eb-icon">⚠️</span>
          <h2>Something went wrong</h2>
          <p>An error interrupted this view. Reloading usually fixes it — if it keeps happening, try clearing this site's data.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              window.location.reload()
            }}
          >
            Reload app
          </button>
        </div>
      </div>
    )
  }
}