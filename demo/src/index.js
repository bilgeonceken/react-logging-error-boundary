import React, { Component } from "react"
import { render } from "react-dom"
import GivesError from "./GivesError"
import { ErrorPage } from "./ErrorPage"
import LoggingErrorBoundary from "../../src"

class Demo extends Component {
  render() {
    return (
      <div>
        <LoggingErrorBoundary
          logService={{
            sentry: {
              dsn: "your-dns"
            },
            loggly: {
              logglyKey: "your-key"
            }
          }}
          errorComponent={<ErrorPage />}
        >
          <GivesError />
        </LoggingErrorBoundary>
      </div>
    )
  }
}

render(<Demo />, document.querySelector("#demo"))
