import React, {Component} from 'react';
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street:  {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue:'Fastest'},
            {value: 'cheapest', displayValue:'Cheapest'},
            ]
        },
        value: 'fastest',
        validation: {
          required: {}
        },
        valid: true
      }
      },
    formIsValid: false
  };

  orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for(let key in this.state.orderForm){
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData
    };
    this.props.onOrderBurger(order);
  };

  checkValidity = (value, rules) => {

    let isValid = true;

    if(rules.required){
      isValid = value.trim() !== '' && isValid
    }
    return isValid;
  };

  inputChangedHandler = (event, inputId) => {
    const updatedForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {...updatedForm[inputId]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputId] = updatedFormElement;

    let formIsValid = true;
    for(let inputId in updatedForm){
      formIsValid = updatedForm[inputId].valid && formIsValid
    }

    this.setState({orderForm:updatedForm,formIsValid})
  };

  render() {

    const { orderForm, formIsValid} = this.state;

    let elementsArray = [];
    for(let key in orderForm){
      elementsArray = [...elementsArray,{
        id: key,
        config: orderForm[key]
      }]
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {elementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event,formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
      </form>);

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.props.loading ? <Spinner/> : form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
};

const mapDispatchToProps = dispatch => {
  return{
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));