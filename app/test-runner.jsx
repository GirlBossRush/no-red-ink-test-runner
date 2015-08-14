import React from "react"
import Test from "./test"

class TestRunner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tests: props.tests
    }
  }

  render() {
    return <div data-component="test-runner">
      <h1>NoRedInk Test Runner</h1>

      {this.renderTests()}
    </div>
  }

  renderTests() {
    return this.state.tests.map(function (test, index) {
      return <Test key={index} spec={test} />
    })
  }
}

TestRunner.propTypes = {
  tests: React.PropTypes.array.isRequired
}

export default TestRunner
