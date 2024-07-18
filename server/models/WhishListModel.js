import mongoose from "mongoose";
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'


const wishListSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    }],

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'userId is required']
    }
})

const WishList = mongoose.model("WishList", wishListSchema)

export default WishList;