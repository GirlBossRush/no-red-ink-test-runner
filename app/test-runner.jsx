import React from "react"
import Test from "./test"

function uniqueID () {
  return Math.random().toString(36).substring(7)
}

function specToTest(spec, index) {
  return {
    id: uniqueID(),
    description: spec.description,
    status: "unstarted"
  }
}

class TestRunner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tests: props.specs.map(specToTest)
    }
  }

  render() {
    return <div data-component="test-runner">
      <h1>NoRedInk Test Runner</h1>

      {this.renderTests()}
    </div>
  }

  renderTests() {
    return this.state.tests.map(function (test) {
      return <Test {...test} onCompletion={this.updateTest.bind(this)} key={test.id} />
    }.bind(this))
  }

  updateTest(result) {
    let
      {tests} = this.state,
      index = tests.findIndex(test => test.id === result.id)

    tests[index].status = result.status

    this.setState({tests})
  }
}

TestRunner.propTypes = {
  specs: React.PropTypes.array.isRequired
}

export default TestRunner
