import React,{useState} from 'react';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [Product, setProduct] = useState({
    name:"react from facebook",
    price:10,
    productBy:"facebook"
  })

const makepayment = token =>{
  const body = {
    token,Product
  }
  const headers = {
    "Content-Type":"application/json"
  }
  return fetch("http://localhost:5000/payment",{
    method:"POST",
    headers,
    body:JSON.stringify(body)
  }).then(res=>console.log(res))
  .catch(err=>console.log(err))
}

  return (
    <div className="App">
      <header className="App-header">
      <h1>StripeCheckout Testing</h1>
        <StripeCheckout
        token={makepayment}
        stripeKey={process.env.REACT_APP_KEY}
        name="Buy React"
        amount={Product.price * 100 }
      />
      </header>
    </div>
  );
}

export default App;
