import React from "react"
import * as STATUS_LABELS from "resources/status-labels"

class Test extends React.Component {
  componentWillReceiveProps(props) {
    if (props.scheduled) {
      this.runTest()
    }
  }

  render() {
    const {description, status} = this.props

    return <div data-component="test">
      <button onClick={this.runTest.bind(this)}>Run</button>

      <p>
        {description}
      </p>

      <aside className="details">
        <div className="status" data-status={status}>
          {STATUS_LABELS[status]}
        </div>
      </aside>
    </div>
  }

  runTest() {
    const
      {id, onStatusChange} = this.props,
      delay = 7000 + Math.random() * 7000,
      status = Math.random() > 0.5 ? 'passed' : 'failed'

    clearTimeout(this.testTimeout)

    onStatusChange({id, status: 'running'})

    this.testTimeout = setTimeout(() => onStatusChange({id, status}), delay)
  }
}

Test.propTypes = {
  description: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  onStatusChange: React.PropTypes.func.isRequired,
  scheduled: React.PropTypes.bool.isRequired,
  status: React.PropTypes.string.isRequired
}

export default Test
