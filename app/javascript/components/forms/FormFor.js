import React from 'react';
import PropTypes from 'prop-types';
import FormContext from '../../contexts/FormContext';
import csrfToken from '../../helpers/csrfToken';

class FormFor extends React.PureComponent {
  render() {
    const { onSubmit, children } = this.props;

    return (
      <FormContext.Provider value={this.props}>
        <form onSubmit={onSubmit}>
          <input type="hidden" value={csrfToken()} name="authenticity_token" />
          {children}
        </form>
      </FormContext.Provider>
    );
  }
}

FormFor.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormFor;
