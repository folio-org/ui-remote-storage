import React from 'react';
import PropTypes from 'prop-types';

import { MenuSection } from '@folio/stripes/components';

import { Context } from './Context';

export const Menu = ({
  onToggle,
  keyHandler: _keyHandler, // not to pass it to MenuSection - to prevent illegal passing it further to dom
  ...rest
}) => (
  <Context.Provider value={{ onToggle }}>
    <MenuSection {...rest} />
  </Context.Provider>
);

Menu.propTypes = {
  ...MenuSection.propTypes,
  onToggle: PropTypes.func.isRequired,
};
