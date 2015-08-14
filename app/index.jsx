"use strict"

require("babel-core/polyfill")
require("./index.css")

import React from "react"
import TestRunner from "./test-runner"
import {tests} from "./resources/sample-data"

document.addEventListener("DOMContentLoaded", function () {
  React.render(<TestRunner tests={tests} />, document.body)
})
