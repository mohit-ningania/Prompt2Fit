import { Component } from "react";

// The 3D scene needs a working WebGL context. If it throws (unsupported
// browser, disabled GPU, blocked context) we simply render nothing and let
// the CSS gradient mesh behind it carry the "flowy" background alone.
export default class WebGLErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("Prompt2Fit 3D scene disabled:", error?.message ?? error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
