import React, { Component } from 'react';

import classes from './layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState(prevState => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  };

  sideDrawerOpenedHandler = () => {
    this.setState({showSideDrawer: true})
  };

  render() {

    const {showSideDrawer}  = this.state;

    return (
      <React.Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerOpenedHandler}/>
        <SideDrawer closed={this.sideDrawerClosedHandler} show={showSideDrawer}/>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    )
  }
}

export default Layout;

