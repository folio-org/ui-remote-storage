import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, FormSpy } from 'react-final-form';

import {
  Pane,
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  LoadingPane,
  Row,
  KeyValue,
  Layer,
  TextField,
  Select,
} from '@folio/stripes/components';
import {
  ViewMetaData,
} from '@folio/stripes/smart-components';
import {
  useAccordionToggle,
  FormFooter,
} from '@folio/stripes-acq-components';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  SECTIONS_STORAGE,
  TIME_UNITS,
} from '../const';

const spySubscription = { values: true };

const RemoteStorageEditor = ({
  initialValues,
  providers,
  isLoading,
  pristine,
  submitting,
  onClose,
  handleSubmit,
}) => {
  const [isDematicSD, setIsDematicSD] = useState();
  const [expandAll, sections, toggleSection] = useAccordionToggle(
    Object.values(SECTIONS_STORAGE).reduce((acc, k) => {
      acc[k] = true;

      return acc;
    }, {}),
  );

  const paneFooter = useMemo(() => (
    <FormFooter
      label={<FormattedMessage id="ui-finance.saveAndClose" />}
      handleSubmit={handleSubmit}
      pristine={pristine}
      submitting={submitting}
      onCancel={onClose}
    />
  ), [onClose, handleSubmit, submitting, pristine]);

  const changeProvider = useCallback(({ values }) => {
    if (values?.providerName === 'Dematic StagingDirector') {
      setIsDematicSD(true);
    } else {
      setIsDematicSD(false);
    }
  }, []);

  if (isLoading) {
    return <LoadingPane />;
  }

  return (
    <Layer
      isOpen
    >
      <form style={{ height: '100vh' }}>
        <Pane
          paneTitle={
            <FormattedMessage
              id="ui-remote-storage.editForm.title"
              values={{
                name: initialValues.name,
              }}
            />}
          footer={paneFooter}
          onClose={onClose}
          dismissible
        >
          <Row>
            <Col
              xs={12}
              md={8}
              mdOffset={2}
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
                  {initialValues.metadata && <ViewMetaData metadata={initialValues.metadata} />}
                  <Row>
                    <Col xs={3}>
                      <FormattedMessage id="ui-remote-storage.details.storageName">
                        {label => (
                          <Field
                            component={TextField}
                            area-label={label}
                            label={label}
                            name="name"
                          />
                        )}

                      </FormattedMessage>
                    </Col>
                    <Col xs={3}>
                      <FormattedMessage id="ui-remote-storage.details.providerName">
                        {label => (
                          <Field
                            component={Select}
                            area-label={label}
                            label={label}
                            name="providerName"
                            dataOptions={providers}
                          />
                        )}

                      </FormattedMessage>
                    </Col>
                    <Col xs={4}>
                      <FormattedMessage id="ui-remote-storage.details.url">
                        {label => (
                          <Field
                            component={TextField}
                            area-label={label}
                            label={label}
                            name="url"
                          />
                        )}

                      </FormattedMessage>
                    </Col>
                    {isDematicSD && (
                      <Col xs={4}>
                        <FormattedMessage id="ui-remote-storage.details.statusUrl">
                          {label => (
                            <Field
                              component={TextField}
                              area-label={label}
                              label={label}
                              name="statusUrl"
                            />
                          )}

                        </FormattedMessage>
                      </Col>
                    )}
                  </Row>
                </Accordion>

                <Accordion
                  label={<FormattedMessage id="ui-remote-storage.accession.title" />}
                  id={SECTIONS_STORAGE.ACCESSION}
                >
                  <KeyValue label={<FormattedMessage id="ui-remote-storage.accession.schedule.title" />}>
                    <Row>
                      <Col xsOffset={0}>
                        <FormattedMessage
                          id="ui-remote-storage.accession.schedule.info"
                          values={{
                            delay: '',
                            unit: '',
                          }}
                        />
                      </Col>
                      <Col xs={1}>
                        <Field
                          component={TextField}
                          type="number"
                          name="accessionDelay"
                          hasClearIcon={false}
                        />
                      </Col>
                      <Col xs={2}>
                        <Field
                          component={Select}
                          name="accessionTimeUnit"
                          dataOptions={TIME_UNITS}
                        />
                      </Col>
                    </Row>
                  </KeyValue>
                </Accordion>

                <Accordion
                  label={<FormattedMessage id="ui-remote-storage.retrieval.title" />}
                  id={SECTIONS_STORAGE.RETRIEVAL}
                />
              </AccordionSet>
            </Col>
          </Row>
        </Pane>
      </form>
      <FormSpy
        subscription={spySubscription}
        onChange={changeProvider}
      />
    </Layer>
  );
};

RemoteStorageEditor.propTypes = {
  initialValues: PropTypes.object,
  providers: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};

export default stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(RemoteStorageEditor);
