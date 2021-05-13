import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  Accordion,
  Col,
  Row,
} from '@folio/stripes/components';

import { AccessionWorkflow } from './AccessionWorkflow';
import { ReturningWorkflow } from './ReturningWorkflow';

export const Sections = ({ isNonInteractive }) => {
  const intl = useIntl();

  return (
    <>
      <Accordion label={intl.formatMessage({ id: 'ui-remote-storage.accession-workflow.title' })}>
        <Row>
          <Col xs={6}>
            <AccessionWorkflow isNonInteractive={isNonInteractive} />
          </Col>
        </Row>
      </Accordion>
      <Accordion label={intl.formatMessage({ id: 'ui-remote-storage.returning-workflow.title' })}>
        <Row>
          <Col xs={6}>
            <ReturningWorkflow isNonInteractive={isNonInteractive} />
          </Col>
        </Row>
      </Accordion>
    </>
  );
};

Sections.propTypes = {
  isNonInteractive: PropTypes.bool.isRequired,
};
