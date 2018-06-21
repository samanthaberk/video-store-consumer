import React from 'react';
import PropTypes from 'prop-types';

const Status = (props) => {
    return(
      <p className={`status ${props.type}`}>{props.message}</p>
  );
}

Status.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Status;
