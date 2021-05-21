import React from 'react';
import PropTypes from 'prop-types';

import { MenuSection } from '@folio/stripes/components';

import { Context } from './Context';

export const Menu = ({ onToggle, ...rest }) => (
  <Context.Provider value={{ onToggle }}>
    <MenuSection {...rest} />
  </Context.Provider>
);

Menu.propTypes = {
  ...MenuSection.propTypes,
  onToggle: PropTypes.func.isRequired,
};
