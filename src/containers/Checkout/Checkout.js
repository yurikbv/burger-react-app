import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';

class Checkout extends Component {


  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {

    const {ings} = this.props;
    let summary = <Redirect to="/"/>;

    if(ings){

      const purchasedRedirect = this.props.purchased ?  <Redirect to="/" /> : null ;

      summary = (
        <React.Fragment>
          {purchasedRedirect}
          <CheckoutSummary
          ingredients={ings}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
          <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
        </React.Fragment>
      )
    }

    return (
      <div>
        {summary}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
};

export default connect(mapStateToProps)(Checkout);