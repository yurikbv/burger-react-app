import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

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
        validation: {},
        valid: true
      }
      },
    formIsValid: false,
    loading: false
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for(let key in this.state.orderForm){
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      orderData: formData
    };
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(err => {
        console.error(err);
        this.setState({loading: false})
      });
  };

  checkValidity = (value, rules) => {

    let isValid = false;

    if(rules.required){
      isValid = value.trim() !== ''
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength
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

    const {loading, orderForm, formIsValid} = this.state;

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
        {loading ? <Spinner/> : form}
      </div>
    );
  }
}

export default ContactData;