import React, {Component} from 'react';
import axios from '../../axios-orders';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    purchasable: false,
    purchasing: false,
    totalPrice: 4,
    loading: false,
    error: null
  };

  componentDidMount() {
    axios.get('https://burger-builder-react-app-858cd.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ingredients: res.data});
      })
      .catch(error => {
        this.setState({error: error.message});
        setTimeout(() => this.setState({ingredients: 1}),1000)
      })
  }


  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => sum + el,0);

    this.setState({purchasable: sum > 0})
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({purchasing: true})
  };

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: 'Georg',
        address: {
          street: 'Teststreet 1',
          zipCode: '43255',
          house: '23'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false})
      })
      .catch(err => this.setState({loading: false, purchasing: false}));
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  };

  render() {

    const {ingredients, totalPrice, purchasable, purchasing, loading, error} = this.state;
    const disabledInfo = {
      ...ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = (ingredients && <OrderSummary
      ingredients={ingredients}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={totalPrice}
    />);

    let burger = (
      <React.Fragment>
        {error ? 'Ingredients can\'t be loaded!' : <Burger ingredients={ingredients}/>}
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={purchasable}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          { loading ? <Spinner/> : orderSummary }
        </Modal>
        {ingredients ? burger : <Spinner/>}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);