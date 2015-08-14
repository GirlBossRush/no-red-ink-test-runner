import React from "react"

const STATUS = {
  "failed": "Failed",
  "passed": "Passed",
  "running": "Running",
  "unstarted": "Not Started Yet"
}

class Test extends React.Component {
  render() {
    let {description, status} = this.props

    return <div data-component="test">
      <div>
        {STATUS[status]}
      </div>

      <p>
        {description}
      </p>
    </div>
  }
}

Test.propTypes = {
  description: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  onCompletion: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired
}

export default Test
