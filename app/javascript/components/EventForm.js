import React from 'react';
import PropTypes from 'prop-types';
import Field from './forms/Field';
import FormFor from './forms/FormFor';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { multidayChecked: !!props.object.end_on };
  }


  handleCheckboxChange = () => {
    const { multidayChecked } = this.state;

    this.setState({ multidayChecked: !multidayChecked });
  }

  renderEndOn = () => {
    const { multidayChecked } = this.state;
    if (multidayChecked) {
      return <Field name="end_on" type="date" scope="event" />;
    }
    return <input name="event[end_on]" type="hidden" />;
  }

  render() {
    const { object, onSubmit, submitText } = this.props;
    const { multidayChecked } = this.state;

    return (
      <FormFor object={object} scope="event" onSubmit={onSubmit} id="event-form" className="text-left">
        <Field name="title" scope="event" label="Event Title" required />
        <Field name="organizer" scope="event" required />
        <Field name="sanction_id" scope="event" label="USAW Sanction ID" required />
        <Field name="fee" scope="event" required type="number" min="0.01" step="0.01" />
        <Field tag="textarea" name="description" scope="event" required />
        <Field name="start_on" type="date" scope="event" required />
        <div className="form-check">
          <label className="form-check-label" htmlFor="multiday">
            <input className="form-check-input" type="checkbox" id="multiday" checked={multidayChecked} onChange={this.handleCheckboxChange} />
              Multi-day event?
          </label>
        </div>
        {this.renderEndOn()}

        <Field name="street" scope="event" required />
        <Field name="city" scope="event" required />
        <Field name="state" scope="event" required />
        <Field name="zipcode" scope="event" required />
        <Field name="phone" type="tel" scope="event" required />
        <Field name="email" type="email" scope="event" required />

        <div className="text-center">
          <input type="submit" value={submitText || (object ? 'Update Event' : 'Create Event')} className="btn btn-primary btn-large text-uppercase" />
        </div>
      </FormFor>
    );
  }
}

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  object: PropTypes.shape({
    id: PropTypes.number,
    end_on: PropTypes.string,
  }),
  submitText: PropTypes.string,
};

EventForm.defaultProps = {
  object: {},
  submitText: null,
};

export default EventForm;
