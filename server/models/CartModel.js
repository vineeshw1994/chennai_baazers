import mongoose from 'mongoose';
import productModel from '../models/productModel.js';
import UserModel from '../models/userModel.js';

const cartSchema = new mongoose.Schema({
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            name: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1
            }, 
            price: {
                type: Number,
            },
            offer: {
                type: Number,
            }
        }]
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;