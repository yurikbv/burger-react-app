import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {

  state = {
    orders: [],
    loading:true
  };

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        let fetchOrders = [];
        for(let key in res.data){
          fetchOrders = [...fetchOrders,{...res.data[key], id: key}];
        }
        this.setState({loading: false, orders: fetchOrders});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }


  render() {

    const {orders} = this.state;
    console.log(orders);
    return (
      <div>
        {orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}

          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);