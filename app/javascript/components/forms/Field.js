import React from 'react';
import PropTypes from 'prop-types';

class Field extends React.PureComponent {
  render() {
    const {
      label, name, errors, scope, tag, type,
    } = this.props;
    const htmlName = scope ? `${scope}[${name}]` : name;
    const id = scope ? `${scope}-${name}` : name;
    const Tag = (tag || 'input');

    return (
      <div className="form-group">
        <label htmlFor={id} className="d-block">
          {label || name}
          <Tag
            name={htmlName}
            type={type || 'text'}
            id={id}
            className={`form-control ${!!errors[name] && 'is-invalid'}`}
          />
          <div className="invalid-feedback">
            {(errors[name] || []).join(', ')}
          </div>
        </label>
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
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
};

Field.defaultProps = {
  scope: null,
  label: null,
  type: 'text',
  tag: 'input',
  errors: {},
};
export default Field;
