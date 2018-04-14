import React, { Component } from 'react';

/**
 * Class wrapper for components-functions;
 * @param {Node} FunctionComponent - react component function.
 * @return {Node} - wrapped react component function by react component class.
 */
export default (FunctionComponent) => {
  class WrappedComponent extends Component {
    render () {
      return <FunctionComponent {...this.props} />;
    }
  }

  return WrappedComponent;
};
