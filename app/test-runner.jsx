import React from "react"
import Test from "./test"
import * as STATUS_LABELS from "resources/status-labels"

function uniqueID () {
  return Math.random().toString(36).substring(7)
}

function specToTest(spec, index) {
  return {
    id: uniqueID(),
    description: spec.description,
    scheduled: false,
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
    const
      {tests} = this.state,
      statuses = [
        'failed',
        'passed',
        'running',
        'unstarted'
      ]

    function statusToStat(status) {
      return {
        label: status,
        count: tests.filter((test) => test.status === status).length
      }
    }

    return statuses.map(statusToStat)
  }

  render() {
    return <div data-component="test-runner">
      <h1>NoRedInk Test Runner</h1>

      {this.renderStats()}

      <button className="run-all-tests" onClick={this.runAllTests.bind(this)}>
        Run all tests
      </button>

      {this.renderTests()}
    </div>
  }

  renderStats() {
    const
      stats = this.getStats(),
      runningStat = stats.find((stat) => stat.label === 'running'),
      unstartedStat = stats.find((stat) => stat.label === 'unstarted')

    const entries = stats.map(function(entry, index) {
      return <span className="stat" data-status={entry.label} key={index}>
        {STATUS_LABELS[entry.label]} - {entry.count}
      </span>
    })

    const stateLabel = unstartedStat.count === 0 && runningStat.count === 0 ? '- Finished!' : ''

    return <div className="test-stats">
      <div className="stats">
        {entries} {stateLabel}
      </div>
    </div>
  }

  renderTests() {
    return this.state.tests.map(function (test) {
      return <Test {...test} onStatusChange={this.updateTest.bind(this)} key={test.id} />
    }.bind(this))
  }

  runAllTests() {
    let {tests} = this.state

    tests.forEach((test) => test.scheduled = true)

    this.setState({tests})
  }

  updateTest(result) {
    let
      {tests} = this.state,
      test = tests.find(test => test.id === result.id)

    test.status = result.status
    test.scheduled = false

    this.setState({tests})
  }
}

TestRunner.propTypes = {
  specs: React.PropTypes.array.isRequired
}

export default TestRunner
