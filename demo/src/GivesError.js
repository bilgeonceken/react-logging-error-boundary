import React, { Component } from "react"

class GivesError extends Component {
  constructor(props) {
    super(props)

    this.state = { error: false }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ error: true })
    }, 5000)
  }

  render() {
    if (this.state.error) {
      throw new Error("Ops, I crashed!")
    }

    return (
      <div
        style={{
          height: "500px",
          width: "100%",
          background: "lightcoral",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1 style={{ color: "white", fontFamily: "sans-serif" }}>
          I am about to die...
        </h1>
      </div>
    )
  }
}
export default GivesError
