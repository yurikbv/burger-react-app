import React, { Component } from 'react';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component{

  ingredientSummary = (ingredients) => Object.keys(ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>
          {igKey}
        </span>
        : {ingredients[igKey]}
      </li>)
  });

  render() {

    const {price, purchaseCanceled, purchaseContinued } = this.props;

    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
          {this.ingredientSummary(this.props.ingredients)}
        </ul>
        <p><strong>Total Price: {price.toFixed(2)}$</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={purchaseCanceled}
        >CANCEL</Button>
        <Button btnType="Success" clicked={purchaseContinued}
        >CONTINUE</Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
