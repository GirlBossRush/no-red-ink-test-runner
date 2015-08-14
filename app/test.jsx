import React from "react"

const STATUS = {
  "failed": "Failed",
  "passed": "Passed",
  "running": "Running",
  "unstarted": "Not Started Yet"
}

class Test extends React.Component {
  render() {
    const {description, status} = this.props

    return <div data-component="test">
      <div onClick={this.runTest.bind(this)}>Run</div>
      <div>
        {STATUS[status]}
      </div>

      <p>
        {description}
      </p>
    </div>
  }

  runTest() {
    const
      {id, onStatusChange} = this.props,
      delay = 7000 + Math.random() * 7000,
      status = Math.random() > 0.5 ? 'passed' : 'failed'

    onStatusChange({id, status: 'running'})

    setTimeout(() => onStatusChange({id, status}), delay)
  }
}

Test.propTypes = {
  description: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  onStatusChange: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired
}

export default Test
