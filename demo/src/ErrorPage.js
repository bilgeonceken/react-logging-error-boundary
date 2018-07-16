import React from "react"

const wrapperStyles = {
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  background: "#121212",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const bgStyles = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundSize: "cover",
  mixBlendMode: "overlay",
  backgroundImage: "url('http://i.giphy.com/l117HrgEinjIA.gif')"
}

const codeStyles = {
  fontFamily: '"Alfa Slab One", cursive',
  fontSize: "144px",
  height: "100vh",
  color: "white",
  width: "100%",
  display: "flex",
  backgorundPosition: "center",
  alignItems: "center",
  backgroundSize: "cover",
  justifyContent: "center"
}

export const ErrorPage = () => {
  return (
    <div style={wrapperStyles} className="FourOhFour">
      <div className="bg" style={bgStyles} />
      <div style={codeStyles} className="code">
        Nooooo!
      </div>
    </div>
  )
}
