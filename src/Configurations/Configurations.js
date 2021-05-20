import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';

import { Paneset } from '@folio/stripes/components';

import { CONFIGURATIONS_PATH } from '../const';
import { ListPane } from './ListPane';
import { DetailsPane } from './DetailsPane';
import { EditorLayer } from './EditorLayer';


const List = () => {
  const history = useHistory();

  const onCreateConfiguration = () => history.push(`${CONFIGURATIONS_PATH}/create`);
  const openDetails = (e, meta) => history.push(`${CONFIGURATIONS_PATH}/${meta.id}`);

  return <ListPane onCreate={onCreateConfiguration} openDetails={openDetails} />;
};


const Details = () => {
  const history = useHistory();
  const { id } = useParams();

  return (
    <DetailsPane
      configurationId={id}
      onEdit={() => history.push(`${CONFIGURATIONS_PATH}/${id}/edit`)}
      onClose={() => history.push(CONFIGURATIONS_PATH)}
    />
  );
};


const Edit = () => {
  const history = useHistory();
  const { id } = useParams();

  const handleClose = history.action === 'PUSH'
    ? history.goBack
    : () => history.push([CONFIGURATIONS_PATH, id].join('/'));

  return <EditorLayer configurationId={id} onClose={handleClose} />;
};


export const Create = () => {
  const history = useHistory();

  const handleClose = history.action === 'PUSH'
    ? history.goBack
    : () => history.push(CONFIGURATIONS_PATH);

  return <EditorLayer create onClose={handleClose} />;
};


export const Configurations = () => (
  <Paneset paneTitle={<FormattedMessage id="ui-remote-storage.meta.title" />}>
    <Route path={CONFIGURATIONS_PATH} component={List} />
    <Switch>
      <Route path={`${CONFIGURATIONS_PATH}/create`} component={Create} />
      <Route path={`${CONFIGURATIONS_PATH}/:id`}>
        <Details />
        <Route path={`${CONFIGURATIONS_PATH}/:id/edit`} component={Edit} />
      </Route>
    </Switch>
  </Paneset>
);
