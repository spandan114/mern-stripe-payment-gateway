const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const key = require('./config/key');
const stripe = require("stripe")(key.Secret_key)
const uuid = require("uuid")

const app = express();

app.use(express.json());
app.use(cors)

mongoose
  .connect(key.MONGO_URI,{ 
    useUnifiedTopology: true ,
    useNewUrlParser: true})
  .then(() => console.log(" Mondodb Connected"))
  .catch(err => console.error(err));


app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

app.post("/payment", (req, res) => {
    
    const {product,token} = req.body;
    console.log(product);
    console.log(product.price);
    const idempontencykey = uuid()

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer => {
        stripe.charges.create({
            amount:product.price * 100,
            currency: 'inr',
            customer:customer.id,
            receipt_email: token.email,
            description:`purches of product.name`,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_contry
                }
            }
        },{idempontencykey})
        .then(res=>res.status(200).json(res))
        .catch(err=>console.log(err))
    })

  });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port port ${port} `));