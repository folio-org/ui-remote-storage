import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from '@folio/stripes/components';

import { Context } from './Context';

export const Item = ({ icon, label, onClick, ...rest }) => {
  const { onToggle } = useContext(Context);

  const handleClick = (...args) => {
    onToggle();

    return onClick?.(...args);
  };

  return (
    <Button
      buttonStyle="dropdownItem"
      onClick={handleClick}
      {...rest}
    >
      {icon ? <Icon size="small" icon={icon}>{label}</Icon> : label}
    </Button>
  );
};

Item.propTypes = {
  ...Button.propTypes,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
};
