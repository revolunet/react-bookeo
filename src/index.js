import React from 'react'
import PropTypes from 'prop-types';
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

const loadScript = (url, cb, timeout=500) => {
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.src = url
  script.onload = () => setTimeout(() => {
    // ensure bookeo started
    var bookeoContentLoaded = typeof axiomct_div !== "undefined" && axiomct_div && axiomct_div.querySelectorAll('iframe').length;
    if(!bookeoContentLoaded && typeof axiomct_onload === "function") {
      axiomct_onload()
    }
    if(cb) {
      cb()
    }
  }, timeout)
  return script;
}

class BookeoWidget extends React.Component {
  state = {
    loading: true
  }
  componentDidMount() {
    this.loadBookeo()
  }
  componentWillUnmount() {
    this.cleanup()
  }
  componentWillReceiveProps() {
    this.cleanup()
    this.setState({ loading: true }, () => {
      this.loadBookeo();
    })
  }
  cleanup = () => {
    // cleanup scripts
    ReactDOM.findDOMNode(this).querySelectorAll("script[src*='bookeo.com']").forEach(node => node.parentElement.removeChild(node));
    if (axiomct_div) {
      axiomct_div.parentElement.removeChild(axiomct_div)
    }
    axiomct_div = undefined;
    axiomct_loadStarted = false;
  }
  loadBookeo = () => {
    const script = loadScript(this.props.url, () => {
      this.setState({
        loading: false
      });
    });
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
  url: PropTypes.string.isRequired,
  waitMessage: PropTypes.string
}

export default BookeoWidget