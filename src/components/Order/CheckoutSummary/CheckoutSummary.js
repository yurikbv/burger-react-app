import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope It tastes well!</h1>
      <div style={{width: '100%',margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <p><strong>Current Price: {props.price.toFixed(2)}$</strong></p>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>Cancel</Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
    </div>
  );
};

export default CheckoutSummary;
