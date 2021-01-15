import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  useHistory,
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
} from '@folio/stripes/components';
import {
  ViewMetaData,
} from '@folio/stripes/smart-components';
import {
  useAccordionToggle,
} from '@folio/stripes-acq-components';

import {
  SECTIONS_STORAGE,
  STORAGES_LIST_ROUTE,
} from '../const';

const RemoteStorageDetails = ({
  defaultWidth,
  storage,
  isLoading,
}) => {
  const history = useHistory();

  const [expandAll, sections, toggleSection] = useAccordionToggle(
    Object.values(SECTIONS_STORAGE).reduce((acc, k) => {
      acc[k] = true;

      return acc;
    }, {}),
  );

  const renderActionMenu = useCallback(() => (
    <MenuSection id="storage-details-actions" />
  ), []);

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
          label={<FormattedMessage id="ui-remote-storage.details.title" />}
          id={SECTIONS_STORAGE.INFORMATION}
        >
          {storage.metadata && <ViewMetaData metadata={storage.metadata} />}
          <Row>
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="ui-remote-storage.details.storageName" />}>
                {storage.name}
              </KeyValue>
            </Col>
            <Col xs={4}>
              <KeyValue label={<FormattedMessage id="ui-remote-storage.details.providerName" />}>
                {storage.providerName}
              </KeyValue>
            </Col>
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="ui-remote-storage.details.url" />}>
                {storage.url}
              </KeyValue>
            </Col>
          </Row>
        </Accordion>

        <Accordion
          label={<FormattedMessage id="ui-remote-storage.accession.title" />}
          id={SECTIONS_STORAGE.ACCESSION}
        >
          <KeyValue label={<FormattedMessage id="ui-remote-storage.accession.schedule.title" />}>
            <FormattedMessage
              id="ui-remote-storage.accession.schedule.info"
              values={{
                delay: storage.accessionDelay,
                unit: storage.accessionTimeUnit,
              }}
            />
          </KeyValue>
        </Accordion>

        <Accordion
          label={<FormattedMessage id="ui-remote-storage.retrieval.title" />}
          id={SECTIONS_STORAGE.RETRIEVAL}
        />
      </AccordionSet>
    </Pane>
  );
};

RemoteStorageDetails.propTypes = {
  defaultWidth: PropTypes.string,
  storage: PropTypes.object,
  isLoading: PropTypes.bool,
};

RemoteStorageDetails.defaultProps = {
  defaultWidth: '50%',
};

export default RemoteStorageDetails;
