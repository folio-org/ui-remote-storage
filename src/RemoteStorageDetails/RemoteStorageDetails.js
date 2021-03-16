import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  useHistory,
  useParams,
} from 'react-router-dom';

import {
  Pane,
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  LoadingPane,
  MenuSection,
  Row,
  KeyValue,
  Icon,
  Button,
} from '@folio/stripes/components';
import {
  ViewMetaData,
} from '@folio/stripes/smart-components';
import {
  useAccordionToggle,
} from '@folio/stripes-acq-components';
import { IfPermission } from '@folio/stripes/core';

import {
  SECTIONS_STORAGE,
  STORAGES_LIST_ROUTE,
} from '../const';

const RemoteStorageDetails = ({
  defaultWidth,
  storage,
  isLoading,
  onRemovestorage,
}) => {
  const history = useHistory();
  const { id } = useParams();
  const intl = useIntl();

  const [expandAll, sections, toggleSection] = useAccordionToggle(
    Object.values(SECTIONS_STORAGE).reduce((acc, k) => {
      acc[k] = true;

      return acc;
    }, {}),
  );

  const renderActionMenu = useCallback(() => (
    <IfPermission perm="ui-remote-storage.settings.remote-storages.all">
      <MenuSection id="storage-details-actions">
        <Button
          id="clickable-edit-storage"
          buttonStyle="dropdownItem"
          data-test-button-edit-storage
          to={{
            pathname: `${STORAGES_LIST_ROUTE}/edit/${id}`,
          }}
        >
          <Icon size="small" icon="edit">
            {intl.formatMessage({ id: 'ui-remote-storage.edit' })}
          </Icon>
        </Button>

        <Button
          id="clickable-delete-storage"
          buttonStyle="dropdownItem"
          data-test-button-delete-storage
          onClick={onRemovestorage}
        >
          <Icon size="small" icon="trash">
            {intl.formatMessage({ id: 'ui-remote-storage.delete' })}
          </Icon>
        </Button>
      </MenuSection>
    </IfPermission>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [id]);

  const closePane = useCallback(
    () => {
      history.push({
        pathname: STORAGES_LIST_ROUTE,
      });
    },
    [history],
  );

  if (isLoading) {
    return <LoadingPane />;
  }

  return (
    <Pane
      data-testid="storage-details-pane"
      actionMenu={renderActionMenu}
      paneTitle={storage.name}
      defaultWidth={defaultWidth}
      onClose={closePane}
      dismissible
    >
      <Row end="xs">
        <Col xs={12}>
          <ExpandAllButton
            accordionStatus={sections}
            onToggle={expandAll}
          />
        </Col>
      </Row>

      <AccordionSet
        accordionStatus={sections}
        onToggle={toggleSection}
      >
        <Accordion
          label={intl.formatMessage({ id: 'ui-remote-storage.details.title' })}
          id={SECTIONS_STORAGE.INFORMATION}
        >
          {storage.metadata && <ViewMetaData metadata={storage.metadata} />}
          <Row>
            <Col xs={6}>
              <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.details.storageName' })}>
                {storage.name}
              </KeyValue>
            </Col>
            <Col xs={4}>
              <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.details.providerName' })}>
                {intl.formatMessage({ id: `ui-remote-storage.name.${storage.providerName}` })}
              </KeyValue>
            </Col>
            <Col xs={6}>
              <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.details.url' })}>
                {storage.url}
              </KeyValue>
            </Col>
            {storage.statusUrl && (
              <Col xs={6}>
                <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.details.statusUrl' })}>
                  {storage.statusUrl}
                </KeyValue>
              </Col>
            )}
            {storage.apiKey && (
              <Col xs={6}>
                <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.details.credProperties' })}>
                  {storage.apiKey}
                </KeyValue>
              </Col>
            )}
          </Row>
        </Accordion>

        <Accordion
          label={intl.formatMessage({ id: 'ui-remote-storage.synchronization.title' })}
          id={SECTIONS_STORAGE.SYNCHRONIZATION}
        >
          <KeyValue label={intl.formatMessage({ id: 'ui-remote-storage.synchronization.schedule.title' })}>
            {intl.formatMessage(
              { id: 'ui-remote-storage.synchronization.schedule.info' },
              {
                delay: storage.accessionDelay,
                unit: storage.accessionTimeUnit,
              },
            )}
          </KeyValue>
        </Accordion>
      </AccordionSet>
    </Pane>
  );
};

RemoteStorageDetails.propTypes = {
  defaultWidth: PropTypes.string,
  storage: PropTypes.object,
  isLoading: PropTypes.bool,
  onRemovestorage: PropTypes.func,
};

RemoteStorageDetails.defaultProps = {
  defaultWidth: '50%',
};

export default RemoteStorageDetails;
