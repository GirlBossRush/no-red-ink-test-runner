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

  getStats() {
    const {tests} = this.state

    return [{
      label: "Failed",
      count: tests.filter((test) => test.status === 'failed').length
    }, {
      label: "Passed",
      count: tests.filter((test) => test.status === 'passed').length
    }, {
      label: "Running",
      count: tests.filter((test) => test.status === 'running').length
    }, {
      label: "Unstarted",
      count: tests.filter((test) => test.status === 'unstarted').length
    }]
  }

  render() {
    return <div data-component="test-runner">
      <h1>NoRedInk Test Runner</h1>

      {this.renderStats()}

      {this.renderTests()}
    </div>
  }

  renderStats() {
    const
      stats = this.getStats(),
      runningStat = stats.find((stat) => stat.label === 'Running'),
      unstartedStat = stats.find((stat) => stat.label === 'Unstarted')

    const entries = stats.map(function(entry, index) {
      return <span key={index}>
        {entry.label} - {entry.count}
      </span>
    })

    const stateLabel = unstartedStat.count === 0 && runningStat.count === 0 ? 'Finished!' : ''

    return <div className="test-stats">
      <h2>Stats {stateLabel}</h2>
      {entries}
    </div>
  }

  renderTests() {
    return this.state.tests.map(function (test) {
      return <Test {...test} onStatusChange={this.updateTest.bind(this)} key={test.id} />
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
