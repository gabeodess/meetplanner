import React from 'react';
import Field from './forms/Field';

const GroupFields = () => (
  <React.Fragment>
    <Field name="description" tag="textarea" />
    <Field name="date" type="date" />
    <Field name="weigh_in_at" label="Weigh-in Time" type="time" />
    <Field name="start_at" label="Start Time" type="time" />
  </React.Fragment>
);

export default GroupFields;
