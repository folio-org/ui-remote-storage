import { escapeRegExp } from 'lodash';

import { Selection, useShowCallout } from '@folio/stripes-acq-components';

import { useCaiaSoftConfigurations } from './useCaiaSoftConfigurations';


const filter = (value, data) => {
  return data.filter(o => new RegExp(escapeRegExp(value), 'i').test(o.label));
};


export const ConfigurationsSelect = props => {
  const showCallout = useShowCallout();

  const query = useCaiaSoftConfigurations({
    onError: () => {
      showCallout({ messageId: 'ui-remote-storage.error', type: 'error' });
    },
  });
  const dataOptions = query.configurations.map(({ id, name }) => ({ value: id, label: name }));

  return (
    <Selection
      dataOptions={dataOptions}
      onFilter={filter}
      {...props}
    />
  );
};

ConfigurationsSelect.propTypes = Selection.propTypes;
