import React, { Component } from 'react';

const Status = (props) => {
    return(
      <p className={`status ${props.type}`}>{props.message}</p>
    );
  }


export default Status;
