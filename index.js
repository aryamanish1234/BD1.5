const express = require('express');
const cors = require('cors');

const app = express();
const port = 3010;


app.use(cors());


app.get('/', (req, res) => {
  res.send('BD1.5 - Assignment 1')
});


// Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
    const newItemPrice = parseFloat(req.query.newItemPrice);
    const cartTotal = parseFloat(req.query.cartTotal);
    const totalCartValue = newItemPrice + cartTotal;
    res.send(totalCartValue.toString());
});

// Endpoint 2: Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
    const cartTotal = parseFloat(req.query.cartTotal);
    const isMember = req.query.isMember === 'true'; // Convert string to boolean
    let finalPrice = cartTotal;

    if (isMember) {
        finalPrice *= 0.90; // Apply 10% discount
    }

    res.send(finalPrice.toString());
});

// Endpoint 3: Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
    const cartTotal = parseFloat(req.query.cartTotal);
    const taxRate = 0.05; // Assuming a tax rate of 5%
    const tax = cartTotal * taxRate;
    res.send(tax.toString());
});

// Endpoint 4: Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
    const shippingMethod = req.query.shippingMethod.toLowerCase();
    const distance = parseFloat(req.query.distance);
    let deliveryDays = 0;

    if (shippingMethod === 'standard') {
        deliveryDays = Math.ceil(distance / 50); // 1 day per 50 kms
    } else if (shippingMethod === 'express') {
        deliveryDays = Math.ceil(distance / 100); // 1 day per 100 kms
    }

    res.send(deliveryDays.toString());
});

// Endpoint 5: Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
    const weight = parseFloat(req.query.weight);
    const distance = parseFloat(req.query.distance);
    const shippingCost = weight * distance * 0.1; // 0.1 per kg per km
    res.send(shippingCost.toString());
});

// Endpoint 6: Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
    const purchaseAmount = parseFloat(req.query.purchaseAmount);
    const loyaltyPoints = purchaseAmount * 2; // Assuming 1 point for every Rs. 1
    res.send(loyaltyPoints.toString());
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
