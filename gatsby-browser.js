/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from "react"
import "./src/css/index.css"
require("prismjs/themes/prism.css")
import { ParallaxProvider } from 'react-scroll-parallax';

export const wrapRootElement = ({ element }) => (
  <ParallaxProvider>{element}</ParallaxProvider>
)