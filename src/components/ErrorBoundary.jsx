import { Component } from 'react'
import { RotateCw } from 'lucide-react'
import { SceneCrash } from './Scenes'

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
          <SceneCrash className="scene" />
          <h2>Something came unstuck</h2>
          <p>
            A view failed to render. Reloading usually clears it — if it keeps
            happening, the browser may be holding stale cached files.
          </p>
          <details className="eb-detail">
            <summary>Technical detail</summary>
            <code>{String(this.state.error?.message || this.state.error)}</code>
          </details>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              window.location.reload()
            }}
          >
            <RotateCw size={16} /> Reload app
          </button>
        </div>
      </div>
    )
  }
}
