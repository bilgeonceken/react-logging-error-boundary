# react-logging-error-boundary

[![npm package][npm-badge]][npm]

An error boundary component which sends your logs to [Sentry](https://sentry.io/) and [Loggly](https://loggly.com).

[npm-badge]: https://img.shields.io/npm/v/react-logging-error-boundary.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-logging-error-boundary

[![Edit LoggingErrorBoundary](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/j406rjr1ow)

## Usage

```javascript
import React from "react"
import ReactDOM from "react-dom"
import LoggingErrorBoundary from "react-logging-error-boundary"
import GivesError from "./GivesError"
import { ErrorPage } from "./ErrorPage"

function App() {
  return (
    <div className="App">
      <LoggingErrorBoundary
        logService={{
          sentry: {
            dsn: "your sentry dsn"
          },
          loggly: { logglyKey: "your loggly key" }
        }}
        errorComponent={<ErrorPage />}
      >
        <GivesError />
      </LoggingErrorBoundary>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
```

### Properties

| Property         | Type      | Required | Description                                                   |
| :--------------- | :-------- | :------- | :------------------------------------------------------------ |
| `logService`     | object    | no       | object that contains your sentry and/or loggly configs        |
| `errorComponent` | component | no       | If something is broken users will see this instead of red box |
