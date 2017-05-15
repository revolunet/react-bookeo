import React from "react";
import { render } from "react-dom";
import GitHubForkRibbon from "react-github-fork-ribbon";

import BookeoWidget from "../../src";

class Demo extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      url: "https://bookeo.com/widget.js?a=224W7P3X41480A16D5CF"
    };
  }
  changeBooking = url => {
    this.setState({ url });
  };
  render() {
    return (
      <div style={{ maxWidth: 600 }}>
        <h1>react-bookeo Demo</h1>
        <p>Insert Bookeo Widget in your React Apps</p>
        <GitHubForkRibbon
          href="//github.com/revolunet/react-bookeo"
          target="_blank"
          position="right"
        >
          Fork me on GitHub
        </GitHubForkRibbon>
        <div>
          <button
            onClick={() =>
              this.changeBooking(
                "https://bookeo.com/widget.js?a=224W7P3X41480A16D5CF&type=224HUAKRF150392AE5F7"
              )}
          >
            Paris 1
          </button>
          <button
            onClick={() =>
              this.changeBooking(
                "https://bookeo.com/widget.js?a=224W7P3X41480A16D5CF&type=224TMPP7F15039383A99"
              )}
          >
            Paris 2
          </button>
          <button
            onClick={() =>
              this.changeBooking(
                "https://bookeo.com/widget.js?a=224W7P3X41480A16D5CF&type=2247E4WER150394186CB"
              )}
          >
            Paris 3
          </button>
        </div>
        <BookeoWidget
          url={this.state.url}
          waitMessage="Chargement en cours..."
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
