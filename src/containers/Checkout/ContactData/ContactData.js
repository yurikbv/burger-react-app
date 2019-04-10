import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
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
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(err => this.setState({loading: false}));
  };

  render() {

    const {loading} = this.state;

    let form = (<form>
      <input type="text" name="name" placeholder="Your name"/>
      <input type="email" name="email" placeholder="Your email"/>
      <input type="text" name="street" placeholder="Street"/>
      <input type="text" name="postal" placeholder="Postal Code"/>
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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