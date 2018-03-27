import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const modal = (props) => {
  return(
    <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div 
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        visibility: props.show ? 'visible' : 'hidden'
      }}
      className={classes.Modal}>
        {props.children}
      </div>
    </Aux>
    );
};

export default modal;