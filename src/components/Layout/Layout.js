import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  SideDrawerHandler = () => { 
    this.setState((prevState, props) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render() {
     return ( 
    <Aux>
      <Toolbar open={this.SideDrawerHandler}/>
      <SideDrawer 
      open={this.state.showSideDrawer} 
      closed={this.SideDrawerHandler}
      />
      <main className={classes.content}>
        {this.props.children}
      </main>
    </Aux>
    )
  }
}

export default Layout;