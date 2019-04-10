import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {},
    totalPrice: 0
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if(param[0] === 'price') {
        price = +param[1]
      }else ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients,totalPrice: price})
  }


  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {

    const {ingredients, totalPrice} = this.state;

    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          price={totalPrice}
        />
        <Route path={this.props.match.path + '/contact-data'} render={(props) => (
          <ContactData
            ingredients={ingredients}
            price={totalPrice}
            {...props}/>
        )}/>
      </div>
    );
  }
}

export default Checkout;