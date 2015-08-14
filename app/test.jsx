import React from "react"

class Test extends React.Component {
  render() {
    return <div data-component="test">
      <p>
        {this.props.spec.description}
      </p>
    </div>
  }
}

Test.propTypes = {
  spec: React.PropTypes.object.isRequired
}

export default Test
