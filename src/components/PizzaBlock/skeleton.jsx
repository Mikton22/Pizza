import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={350}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="114" r="101" /> 
    <rect x="4" y="224" rx="6" ry="6" width="268" height="16" /> 
    <rect x="7" y="261" rx="8" ry="8" width="268" height="109" /> 
    <rect x="12" y="404" rx="8" ry="8" width="74" height="26" /> 
    <rect x="149" y="391" rx="8" ry="8" width="124" height="40" />
  </ContentLoader>
)

export default MyLoader

