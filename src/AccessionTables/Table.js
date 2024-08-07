import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { useStripes } from '@folio/stripes/core';
import { EditableList } from '@folio/stripes/smart-components';
import { useShowCallout } from '@folio/stripes-acq-components';

import { ErrorCentered, LoadingCentered } from '../components';
import { Locations, AccessionTable } from '../data';
import { Location, LocationSelection } from './components';


const EDIT_PERMISSION = 'ui-remote-storage.settings.remote-storages.edit';

const columnMapping = {
  originalLocationId: <FormattedMessage id="ui-remote-storage.location.original" />,
  finalLocationId: <FormattedMessage id="ui-remote-storage.location.final" />,
};


const LocationField = ({ name, configurationId, ...props }) => {
  const showCallout = useShowCallout();
  const { locations, isSuccess } = Locations.useByConfigurationId({
    configurationId,
    onError: () => showCallout({ messageId: 'ui-remote-storage.error', type: 'error' }),
  });

  return <Field name={name} component={LocationSelection} locations={locations} disabled={!isSuccess} {...props} />;
};

LocationField.propTypes = {
  ...Field.propTypes,
  configurationId: PropTypes.string.isRequired,
};


export const Table = ({ configurationId }) => {
  const stripes = useStripes();
  const { rows, update, isError: isExtendedMappingsError } = AccessionTable.useByConfigurationId(configurationId);
  const { map: locationsMap, isError: isLocationError } = Locations.useMap();

  const handleEdit = item => update({ ...item, remoteConfigurationId: configurationId });

  const hasError = isLocationError || isExtendedMappingsError;

  return hasError
    ? <ErrorCentered />
    : <EditableList
        contentData={rows}
        uniqueField="originalLocationId" // todo: file a bug in EditableList - ignored for choosing of onCreate, onUpdate
        isEmptyMessage={<LoadingCentered />}
        canCreate={false} // does not really help with "Create" button, just disables it
        actionProps={{
          create: () => ({ style: { display: 'none' } }), // to get rid of "Create" button
        }}
        readOnlyFields={['originalLocationId']}
        visibleFields={['originalLocationId', 'finalLocationId']}
        editable={stripes.hasPerm(EDIT_PERMISSION)}
        actionSuppression={{ delete: () => true, edit: () => false }}
        columnMapping={columnMapping}
        fieldComponents={{
          finalLocationId: item => (
            <LocationField
              {...item.fieldProps}
              configurationId={configurationId}
              marginBottom0
            />
          ),
        }}
        formatter={{
          originalLocationId: item => <Location location={locationsMap[item.originalLocationId]} />,
          finalLocationId: item => <Location location={locationsMap[item.finalLocationId]} />,
        }}
        onCreate={handleEdit}
        onUpdate={handleEdit} // only onCreate is really used because of the bug with `id` in EditableList
        validate={() => { /* validation function must be supplied */ }}
      />;
};

Table.propTypes = {
  configurationId: PropTypes.string.isRequired,
};

