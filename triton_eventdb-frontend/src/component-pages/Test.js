import React, { Component } from "react";
import { connect } from "react-redux";
class Test extends Component {
  state = {
    damn: this.props.user.name
  };

  render() {
    return (
      <div>
        <div>
          <h1>Test page</h1>
          <h1>{this.state.damn}</h1>
        </div>
        <button
          onClick={() => {
            this.props.setName("ethan");
          }}
        >
          hi
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => {
      dispatch({
        type: "SET_NAME",
        payload: name
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
