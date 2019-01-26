import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
   ingredients: null ,
   totalPrice: 4,
   purchase: false,
   purchasing: false,
   loading: false,
   error: false
  }

  componentDidMount = () => {
    axios.get('/ingredients.json')
    .then(resp => {
      console.log(resp)
        this.setState({ ingredients: resp.data});
    }).catch(err => {
      console.log(err);
      this.setState({ error: true })
    })
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey]
    })
    .reduce((sum, el) =>{
      return sum + el;
    }, 0);
    this.setState({purchase: sum > 0})
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

   purchaseContinueHandler = () => {
    /*this.setState({purchasing: false});
    alert('You continued!!');*/
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Tyndale',
        address: {
          street: 'Alien Avenue',
          zipCode: '9752',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
    .then(response => {
      console.log(response);
      this.setState({ loading: false, purchasing: false })
    })
    .catch(err => { 
      console.log(err);
      this.setState({ loading: false, purchasing: false })
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updateCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }
  removeIngredientHandler = (type) => {

    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    } 
    const updateCounted = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updateCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if(this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded</p> : <Spinner />;
    if(this.state.ingredients) {
      burger =  (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientdDeducted={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchase}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
          />
        </Aux>);
        orderSummary = <OrderSummary 
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
          />;
    }

    return(
        <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
         {orderSummary}
          </Modal>
          {burger}
        </Aux>
      );
  }
}

export default withErrorHandler(BurgerBuilder, axios);