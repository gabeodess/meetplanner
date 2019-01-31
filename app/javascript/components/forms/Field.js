import React from 'react';
import PropTypes from 'prop-types';
import FormContext from '../../contexts/FormContext';

class Field extends React.PureComponent {
  static contextType = FormContext

  render() {
    const {
      label, name, scope, tag, type,
    } = this.props;
    const htmlName = scope ? `${scope}[${name}]` : name;
    const id = scope ? `${scope}-${name}` : name;
    const Tag = (tag || 'input');

    return (
      <div className="form-group">
        <FormContext.Consumer>
          {(object) => {
            const errors = object.errors || {};

            return (
              <label htmlFor={id} className="d-block">
                {label || name}
                <Tag
                  defaultValue={object[name] || undefined}
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
  scope: PropTypes.node,
  label: PropTypes.node,
  type: PropTypes.string,
  tag: PropTypes.string,
};

Field.defaultProps = {
  scope: null,
  label: null,
  type: 'text',
  tag: 'input',
};
export default Field;
