import React from 'react'
import {render} from 'react-dom'

import BookeoWidget from '../../src'

let Demo = React.createClass({
  render() {
    return <div>
      <h1>react-bookeo Demo</h1>
      <BookeoWidget url="https://bookeo.com/widget.js?a=224W7P3X41480A16D5CF" waitMessage="Chargement en cours..."/>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
