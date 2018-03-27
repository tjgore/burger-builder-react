import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map( igKey => {
    return <li key={igKey}>
    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
    </li>
  });
  return(
    <div>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total: ${props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to checkout</p>
     <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
     <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </div>
    );

};

export default orderSummary;