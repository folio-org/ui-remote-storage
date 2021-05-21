import React from 'react';
import PropTypes from 'prop-types';

const centered = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const Centered = ({ children, ...rest }) => <div style={centered} {...rest}>{children}</div>;

Centered.propTypes = {
  children: PropTypes.node,
};
