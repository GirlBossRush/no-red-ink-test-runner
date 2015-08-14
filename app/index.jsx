"use strict"

require("babel-core/polyfill")
require("./index.css")

import React from "react"
import TestRunner from "./test-runner"

document.addEventListener("DOMContentLoaded", function () {
  React.render(<TestRunner />, document.body)
})
