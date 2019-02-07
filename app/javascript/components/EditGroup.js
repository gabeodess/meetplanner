import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import routes from '../helpers/routes';
import history from '../helpers/history';
import FormFor from './forms/FormFor';
import GroupFields from './GroupFields';
import Loading from './Loading';

class EditGroup extends React.Component {
  state = {}

  componentDidMount() {
    const { match } = this.props;
    axios.get(routes.api.group(match.params.id)).then(
      ({ data }) => this.setState({ group: data }),
    );
  }

  onSubmit = (e) => {
    const { match } = this.props;
    const { group } = this.state;

    e.preventDefault();

    axios.patch(routes.api.group(match.params.id), $('form').serialize()).then(
      () => history.push(routes.manageEvent(group.event_id)),
      (error) => {
        const { status, data } = error.response;
        if (status === 422) {
          this.setState({ group: { ...group, errors: data.errors } });
        }
      },
    );
  }

  render() {
    const { group } = this.state;

    if (!group) {
      return <Loading />;
    }
    console.log(group);
    return (
      <React.Fragment>
        <h1 className="text-center">Edit Session</h1>
        <FormFor object={group} scope="group" onSubmit={this.onSubmit}>
          <GroupFields />
          <div className="text-center">
            <input type="submit" value="Submit" className="btn btn-primary" />
            <br />
            <Link to={routes.manageEvent(group.event_id)}>Cancel</Link>
          </div>
        </FormFor>
      </React.Fragment>
    );
  }
}

EditGroup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EditGroup;
