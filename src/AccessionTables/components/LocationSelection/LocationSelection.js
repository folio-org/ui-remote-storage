import React from 'react';
import PropTypes from 'prop-types';
import { escapeRegExp } from 'lodash';
import { useIntl } from 'react-intl';

import { OptionSegment } from '@folio/stripes/components';
import { Selection } from '@folio/stripes-acq-components';

import { Location } from '../Location';

// todo: this is forked from stripes-smart-components, got to figure out the way to merge

const filter = (searchString, dataOptions) => {
  const regexp = new RegExp(escapeRegExp(searchString), 'i');
  const match = location => Location.textFields.some(field => regexp.test(location[field]));

  return dataOptions.filter(match);
};


const Formatter = ({ option, searchTerm }) => {
  const { formatMessage } = useIntl();

  if (!option.value) return formatMessage({ id: 'ui-remote-storage.notSet' });

  return (
    <Location
      location={option}
      label={text => <OptionSegment innerText={text} searchTerm={searchTerm} />}
    />
  );
};

Formatter.propTypes = {
  option: Location.propTypes.location,
  searchTerm: OptionSegment.propTypes.searchTerm,
};


export const LocationSelection = ({ locations, placeholder, ...rest }) => {
  const { formatMessage } = useIntl();

  const locationOpts = locations.map(location => ({
    ...location,
    value: location.id,
  }));

  return (
    <Selection
      placeholder={placeholder || formatMessage({ id: 'stripes-smart-components.ls.locationPlaceholder' })}
      dataOptions={[{ value: '' }, ...locationOpts]}
      onFilter={filter}
      formatter={Formatter}
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
