import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { noop } from 'lodash';

import { useStripes } from '@folio/stripes/core';
import { Layer } from '@folio/stripes/components';
import { useShowCallout } from '@folio/stripes-acq-components';

import { Configurations } from '../../data';
import { Editor } from './Editor';


const PERMISSION = 'ui-remote-storage.settings.remote-storages.edit';


export const EditorLayer = ({ configurationId, create = false, onClose = noop }) => {
  const intl = useIntl();
  const stripes = useStripes();
  const showCallout = useShowCallout();

  const query = Configurations.useSingleQuery({
    id: configurationId,
    enabled: !create,
    onError: () => {
      showCallout({ messageId: 'ui-remote-storage.error', type: 'error' });
    },
  });

  const { mutate: createConfiguration } = Configurations.useCreateMutation({
    onSuccess: () => {
      onClose();
      showCallout({ messageId: 'ui-remote-storage.edit.success.created' });
    },
    onError: err => {
      showCallout({ messageId: 'ui-remote-storage.edit.error', type: 'error' });
      throw err;
    },
  });

  const { mutate: updateConfiguration } = Configurations.useUpdateMutation({
    id: configurationId,
    onSuccess: () => {
      onClose();
      showCallout({ messageId: 'ui-remote-storage.edit.success.changed' });
    },
    onError: error => {
      showCallout({ messageId: 'ui-remote-storage.edit.error', type: 'error' });
      throw error;
    },
  });

  if (!stripes.hasPerm(PERMISSION)) return null;

  const title = create
    ? intl.formatMessage({ id: 'ui-remote-storage.createForm.title' })
    : intl.formatMessage(
      { id: 'ui-remote-storage.editForm.title' },
      { name: query.configuration?.name },
    );

  return (
    <Layer isOpen inRootSet contentLabel={title}>
      <Editor
        title={title}
        initialValues={query.configuration}
        isLoading={query.isFetching}
        onClose={onClose}
        onSubmit={create ? createConfiguration : updateConfiguration}
      />
    </Layer>
  );
};

EditorLayer.propTypes = {
  configurationId: PropTypes.string,
  create: PropTypes.bool,
  onClose: PropTypes.func,
};
