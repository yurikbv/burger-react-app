import React, {Component} from 'react';
import axios from '../../axios-orders';
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }


  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => sum + el,0);

    return sum > 0
  };

  purchaseHandler = () => {
    this.setState({purchasing: true})
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  render() {
    const { purchasing} = this.state;

    const disabledInfo = {
      ...this.props.ings
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = (this.props.ings && <OrderSummary
      ingredients={this.props.ings}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.props.price}
    />);

    let burger = (
      <React.Fragment>
        {this.props.error ? 'Ingredients can\'t be loaded!' : <Burger ingredients={this.props.ings}/>}
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          price={this.props.price}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary }
        </Modal>
        {this.props.ings ? burger : <Spinner/>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (name) =>
      dispatch(burgerBuilderActions.addIngredient(name)),
    onIngredientRemoved: (name) =>
      dispatch(burgerBuilderActions.removeIngredient(name)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));