import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: null,
      endPoint: null,
      rectangle: null,
      mouseDown: false
    };
    this.parent = React.createRef();
  }

  onMouseDown = e => {
    if (e.button === 2 || e.nativeEvent.which === 2) {
      return;
    }
    var newState = {
      mouseDown: true,
      startPoint: {
        x: e.pageX,
        y: e.pageY
      }
    };
    this.setState(newState);
    window.document.addEventListener("mousemove", this.onMouseMove);
    window.document.addEventListener("mouseup", this.onMouseUp);
  };
  onMouseUp = e => {
    window.document.removeEventListener("mousemove", this.onMouseMove);
    window.document.removeEventListener("mouseup", this.onMouseUp);
    this.setState({
      mouseDown: false,
      startPoint: null,
      endPoint: null,
      rectangle: null
    });
  };

  onMouseMove = e => {
    e.preventDefault();
    const { mouseDown, startPoint } = this.state;
    if (mouseDown) {
      var endPoint = {
        x: e.pageX,
        y: e.pageY
      };
      this.setState({
        endPoint: endPoint,
        rectangle: this.calculateRectangle(startPoint, endPoint)
      });
    }
  };

  calculateRectangle = (startPoint, endPoint) => {
    if (!this.state.mouseDown || endPoint === null || startPoint === null) {
      return null;
    }

    var parentNode = this.parent.current;
    var left = Math.min(startPoint.x, endPoint.x) - parentNode.offsetLeft;
    var top = Math.min(startPoint.y, endPoint.y) - parentNode.offsetTop;
    var width = Math.abs(startPoint.x - endPoint.x);
    var height = Math.abs(startPoint.y - endPoint.y);
    return {
      left: left,
      top: top,
      width: width,
      height: height,
      border: "1px dashed blue"
    };
  };

  renderRectangle = () => {
    const { mouseDown, endPoint, startPoint, rectangle } = this.state;
    if (!mouseDown || endPoint === null || startPoint === null) {
      return null;
    }
    return <div className="rectangle-border" style={rectangle} />;
  };

  render() {
    return (
      <div className="App">
        <div
          ref={this.parent}
          style={{
            width: "400px",
            height: "500px",
            background: "whitesmoke",
            border: "2px solid black"
          }}
          onMouseDown={this.onMouseDown}
        >
          {this.renderRectangle()}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
