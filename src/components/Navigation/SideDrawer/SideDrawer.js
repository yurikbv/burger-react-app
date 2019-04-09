import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css';
import BackDrop from "../../UI/BackDrop/BackDrop";

const SideDrawer = (props) => {

  let attachedClasses = props.show ? [classes.SideDrawer,classes.Open] : [classes.SideDrawer,classes.CLose];

  return (
    <React.Fragment>
      <BackDrop show={props.show} clicked={props.closed}/>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}><Logo/></div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
