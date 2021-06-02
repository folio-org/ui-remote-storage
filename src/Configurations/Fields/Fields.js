import React from 'react';
import PropTypes from 'prop-types';
import { useFormState } from 'react-final-form';

import {
  AccordionStatus,
  AccordionSet,
  Col,
  ExpandAllButton,
  Row,
} from '@folio/stripes/components';

import { CAIASOFT } from '../../const';
import * as CaiaSoft from './CaiaSoft';
import { General, Synchronization } from './Sections';

export const Fields = ({ isNonInteractive = false }) => {
  const { values } = useFormState();

  const isCaiasoft = values.providerName === CAIASOFT;

  return (
    <AccordionStatus>
      <Row end="xs">
        <Col xs={12}>
          <ExpandAllButton />
        </Col>
      </Row>
      <AccordionSet>
        <General isNonInteractive={isNonInteractive} />
        <Synchronization isNonInteractive={isNonInteractive} />
        {isCaiasoft && <CaiaSoft.Sections isNonInteractive={isNonInteractive} />}
      </AccordionSet>
    </AccordionStatus>
  );
};

Fields.propTypes = {
  isNonInteractive: PropTypes.bool,
};
