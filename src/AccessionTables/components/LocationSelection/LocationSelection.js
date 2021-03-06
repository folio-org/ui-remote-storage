import React from 'react';
import PropTypes from 'prop-types';
import { escapeRegExp } from 'lodash';
import { useIntl } from 'react-intl';

import { Selection } from '@folio/stripes-acq-components';

// todo: this is forked from stripes-smart-components, got to figure out the way to merge

const filter = (value, data) => {
  return data.filter(o => new RegExp(escapeRegExp(value), 'i').test(o.label));
};

export const LocationSelection = ({ locations, placeholder, ...rest }) => {
  const { formatMessage } = useIntl();

  const finalPlaceholder = placeholder || formatMessage({ id: 'stripes-smart-components.ls.locationPlaceholder' });

  const locationOpts = locations.map(loc => ({
    label: `${loc.name} (${loc.code})`,
    value: loc.id,
  }));


  return (
    <Selection
      placeholder={finalPlaceholder}
      dataOptions={[{ label: `${finalPlaceholder}`, value: '' }, ...locationOpts]}
      onFilter={filter}
      {...rest}
    />
  );
};

LocationSelection.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
  input: PropTypes.object,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
};
