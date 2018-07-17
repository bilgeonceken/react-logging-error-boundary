import React, { Component, Fragment } from "react"
import Script from "react-load-script"

class LoggingErrorBoundary extends Component {
  // Global raven client for this application
  static ravenClient = null
  static logglyClient = null

  constructor(props) {
    super(props)

    // Initialize state based on ravenClient
    this.state = {
      hasError: false,
      ravenExists: !!this.props.logService.sentry,
      logglyExists: !!this.props.logService.loggly,
      ravenLoaded: global.Raven !== undefined,
      logglyLoaded: global._LTracker !== undefined ///
    }

    // Bindings
    this.renderRavenScript = this.renderRavenScript.bind(this)
    this.renderLogglyScript = this.renderLogglyScript.bind(this)

    this.handleRavenScriptError = this.handleRavenScriptError.bind(this)
    this.handleLogglyScriptError = this.handleLogglyScriptError.bind(this)

    this.handleLogglyScriptLoad = this.handleLogglyScriptLoad.bind(this)
    this.handleRavenScriptLoad = this.handleRavenScriptLoad.bind(this)
  }

  static getDerivedStateFromProps(
    props,
    { ravenLoaded, logglyLoaded, ravenExists, logglyExists }
  ) {
    // IF DSN PROVIDED: Initialize raven client if not already done
    if (ravenExists) {
      if (!ravenLoaded && global.Raven && LoggingErrorBoundary.ravenClient) {
        return {
          ravenLoaded: true
        }
      }
    }

    if (logglyExists) {
      if (
        !logglyLoaded &&
        global._LTracker &&
        LoggingErrorBoundary.logglyClient
      ) {
        return {
          logglyLoaded: true
        }
      }
    }

    return null
  }

  componentDidMount() {
    const { ravenLoaded, logglyLoaded, ravenExists, logglyExists } = this.state
    if (ravenExists) {
      if (ravenLoaded && LoggingErrorBoundary.ravenClient === null) {
        this.handleRavenScriptLoad()
      }
    }
    if (logglyExists) {
      if (logglyLoaded && LoggingErrorBoundary.logglyClient === null) {
        this.handleLogglyScriptLoad()
      }
    }
  }

  componentDidCatch(e, einfo) {
    this.setState({ hasError: true })
    // If raven exits &&
    // If script loaded and ravenClient is defined  then log it

    if (
      this.state.ravenExists &&
      this.state.ravenLoaded &&
      LoggingErrorBoundary.ravenClient
    ) {
      LoggingErrorBoundary.ravenClient.captureException(e)
    }
    //  If loggly exists &&
    // If script loaded and logglyClient is defined  then log it
    if (
      this.state.logglyExists &&
      this.state.logglyLoaded &&
      LoggingErrorBoundary.logglyClient
    ) {
      LoggingErrorBoundary.logglyClient.push(e)
    }
  }

  // On raven loaded
  handleRavenScriptLoad() {
    // Mark script as loaded
    this.setState({ ravenLoaded: true })

    // We are creating Raven.Client manually to avoid conflicts with other raven clients
    LoggingErrorBoundary.ravenClient = global.Raven.config(
      this.props.logService.sentry.dsn
    ).install()
  }

  handleLogglyScriptLoad() {
    // Mark script as loaded
    this.setState({ logglyLoaded: true })

    // We are creating Raven.Client manually to avoid conflicts with other raven clients
    LoggingErrorBoundary.logglyClient = global._LTracker
    LoggingErrorBoundary.logglyClient.push({
      // 'logglyKey': 'your-customer-token',
      sendConsoleErrors: true,
      tag: "loggly-jslogger",
      ...this.props.logService.loggly
    })
  }

  // On error of loading raven script
  handleRavenScriptError() {
    this.setState({
      logglyLoaded: false
    })
  }

  // On error of loading loggly script
  handleLogglyScriptError() {
    this.setState({
      logglyLoaded: false
    })
  }

  // Renders raven script load
  renderRavenScript() {
    return (
      <Script
        url="https://cdn.ravenjs.com/3.26.2/raven.min.js"
        onError={this.handleRavenScriptError}
        onLoad={this.handleRavenScriptLoad}
      />
    )
  }

  // Renders loggly script load
  renderLogglyScript() {
    return (
      <Script
        url="https://cloudfront.loggly.com/js/loggly.tracker-latest.min.js"
        onError={this.handleLogglyScriptError}
        onLoad={this.handleLogglyScriptLoad}
      />
    )
  }

  renderError() {
    return this.props.errorComponent
  }

  render() {
    const { children, errorComponent } = this.props
    const {
      hasError,
      ravenLoaded,
      logglyLoaded,
      ravenExists,
      logglyExists
    } = this.state

    if (hasError) return errorComponent

    return (
      <Fragment>
        {!ravenLoaded && ravenExists && this.renderRavenScript()}
        {!logglyLoaded && logglyExists && this.renderLogglyScript()}
        {children}
      </Fragment>
    )
  }
}

export default LoggingErrorBoundary
