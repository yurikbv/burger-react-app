import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from '../../axios-orders';
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as action from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }


  render() {

    const {orders, loading} = this.props;

    return (
      !loading
        ? <div>
            {orders.map(order => (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
              />
            ))}
          </div>
        : <Spinner/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(action.fetchOrders())
  }
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));