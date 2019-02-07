import React from 'react';
import PropTypes from 'prop-types';
import FormContext from '../../contexts/FormContext';
import formatDate from '../../helpers/formatDate';

class Field extends React.PureComponent {
  static contextType = FormContext

  render() {
    const {
      label, name, tag, type,
    } = this.props;
    const Tag = (tag || 'input');
    let labelText = (label || name).replace(/_/g, ' ');
    labelText = (labelText.charAt(0).toUpperCase() + labelText.slice(1));

    return (
      <div className="form-group">
        <FormContext.Consumer>
          {({ object, scope }) => {
            const obj = object || {};
            const htmlName = scope ? `${scope}[${name}]` : name;
            const id = scope ? `${scope}-${name}` : name;
            const errors = obj.errors || {};
            let value = obj[name] || undefined;
            if (value && type === 'time') {
              value = formatDate(value, { hour12: false, hour: 'numeric', minute: '2-digit' });
            }

            return (
              <label htmlFor={id} className="d-block">
                {labelText}
                <Tag
                  defaultValue={value}
                  name={htmlName}
                  type={type || 'text'}
                  id={id}
                  className={`form-control ${!!errors[name] && 'is-invalid'}`}
                />
                <div className="invalid-feedback">
                  {(errors[name] || []).join(', ')}
                </div>
              </label>
            );
          }}
        </FormContext.Consumer>
      </div>
    );
  }
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  type: PropTypes.string,
  tag: PropTypes.string,
};

Field.defaultProps = {
  label: null,
  type: 'text',
  tag: 'input',
};
export default Field;
