import React from 'react'
import ReactDOM from 'react-dom'
import Spinner from 'react-spinner'


const DEFAULT_WAIT_MESSAGE = "Loading in progress..."

const Loading = ({ waitMessage }) => (
  <div>
    <div>{waitMessage}</div>
    <br />
    <Spinner />
  </div>
)

const containerStyle = {
  textAlign: 'center',
  margin: '2em auto'
}

class BookeoWidget extends React.Component {
  state = {
    loading: true
  }
  componentDidMount() {
    this.loadBookeo()
  }
  componentWillUnmount() {
    axiomct_div = undefined;
    axiomct_loadStarted = false;
  }
  componentWillUpdateProps() {
    axiomct_div = undefined;
    axiomct_loadStarted = false;
    this.loadBookeo();
  }
  loadBookeo = () => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = this.props.url
    script.onload = () => {
      setTimeout(() => {
        // ensure bookeo started
        var bookeoContentLoaded = typeof axiomct_div !== "undefined" && axiomct_div && axiomct_div.querySelectorAll('iframe').length;
        if(!bookeoContentLoaded && typeof axiomct_onload === "function") {
          axiomct_onload()
        }
        this.setState({
          loading: false
        });
      }, 500)
    }
    ReactDOM.findDOMNode(this).appendChild(script)
  }
  render() {
    return (
      <div style={ containerStyle }>
        { this.state.loading && <Loading waitMessage={ this.props.waitMessage || DEFAULT_WAIT_MESSAGE } /> }
      </div>
    )
  }
}

BookeoWidget.propTypes = {
  // widget url, as defined in bookeo parameters
  url: React.PropTypes.string.isRequired,
  waitMessage: React.PropTypes.string
}

export default BookeoWidget