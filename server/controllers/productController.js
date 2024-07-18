import productModel from '../models/productModel.js';
import cloudinary from 'cloudinary';
import { getDataUri } from '../utils/features.js'
import cartModel from '../models/CartModel.js';
import wishListModel from '../models/whishlistModel.js';

//get all products 
export const getAllProducts = async (req, res) => {
    console.log('this is getprducts function')
    try {
        const products = await productModel.find({}).populate('category')
        res.status(200).json({ totalProducts: products.length, products, success: true, message: 'all products fetched successfully', })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in all products  Api', success: false, error })
    }
}

//  getTopProducts
export const getTopProducts = async (req, res) => {
    try {
        const products = await productModel.find({ rating: { $gt: 2 } }).sort({ rating: -1 }).limit(3)
        res.status(200).json({ products, success: true, message: 'top products fetched successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in top products  Api', success: false, error })
    }
}
export const getsingleProduct = async (req, res) => {
    console.log('this is the single product function')
    console.log('hello something went wrong')
    try {
        const id = req.params.id
        console.log(id)
        const product = await productModel.findById(id)
        res.status(200).json({ product, success: true, message: 'single product fetched successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in single product Api', success: false, error })
    }
}

// create product
export const createProduct = async (req, res) => {
    console.log('this is the create product')
    try {
        console.log(req.body)
        const { name, description, price, category, stock } = req.body
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: 'Please fill all the fields', success: false })
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image', success: false })
        }
        const file = getDataUri(req.file)
        const cbd = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id: cbd.public_id,
            url: cbd.secure_url
        }
        await productModel.create({ name, description, price, category, stock, images: [image] })


        res.status(201).json({ message: 'Product created successfully', success: true })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in create product Api', success: false, error })
    }
}

// update product
export const updateProduct = async (req, res) => {
    console.log('this is the update product function')
    try {
        const product = await productModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false })
        }
        const { name, description, price, category, stock } = req.body

        if (name) product.name = name
        if (description) product.description = description
        if (price) product.price = price
        if (stock) product.stock = stock
        if (category) product.category = category

        await product.save()
        res.status(200).json({ message: 'Product updated successfully', success: true })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in update product Api', success: false, error })
    }
}

// update product image
export const updateProductImage = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false })
        }
        if (!req.file) {
            return res.status(404).json({ message: 'No file uploaded', success: false })
        }
        const file = getDataUri(req.file)
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }
        product.images.push(image)
        await product.save()
        res.status(200).json({ message: 'Product image updated successfully', success: true })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in update product image Api', success: false, error })
    }
}

//delete image
export const deleteImage = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false })
        }

        const id = req.query.id
        if (!id) {
            return res.status(400).json({ message: 'Image id is required', success: false })
        }
        let exist = -1
        product.images.forEach((item, index) => {
            if (item._id.toString() === id.toString()) {
                exist = index
            }
        })
        if (exist < 0) {
            return res.status(404).json({ message: 'Image not found', success: false })
        }
        await cloudinary.v2.uploader.destroy(product.images[exist].public_id)
        product.images.splice(exist, 1)
        await product.save()
        res.status(200).json({ message: 'Product image deleted successfully', success: true })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in delete product image Api', success: false, error })
    }
}

export const productDelete = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false })
        }
        for (let index = 0; index < product.images.length; index++) {
            await cloudinary.v2.uploader.destroy(product.images[index].public_id)
        }
        await product.deleteOne()
        res.status(200).json({ message: 'Product deleted successfully', success: true })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in delete product  Api', success: false, error })
    }
}

// rating review
export const ratingReview = async (req, res) => {
    console.log('this is the rating review function')
    try {
        const { rating, comment, } = req.body
        const product = await productModel.findById(req.params.id)
        const alreadyReviewed = product.reviews.find(
            (rev) => rev.user.toString() === req.user._id.toString()
        )
        if (alreadyReviewed) {
            return res.status(400).json({ message: 'Product already reviewed', success: false })
        }

        const review = {
            name: req.user.username,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(200).json({ message: 'Review added successfully', success: true })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in rating review Api', success: false, error })
    }
}

// add to cart
export const addToCart = async (req, res) => {
    console.log('this is add to cart function')

    try {
        console.log(req.user)
        const userId = req.user._id
        const { id } = req.params
        const { qty } = req.body
        console.log(qty, 'this is quantity')
        console.log(id)
        const product = await productModel.findById(id)
        console.log(product)
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false })
        }
        let cartItems = await cartModel.findOne({ user: userId })
        if (!cartItems) {
            cartItems = new cartModel({ user: userId, cart: { items: [] }, totalPrice: 0 });
        }

        const isProductExist = cartItems.cart.items.find((item) => item.productId.toString() === id.toString())

        if (isProductExist) {
            return res.status(400).json({ message: 'Product already exist in cart', success: false })
        }

        const cart = {
            productId: product._id,
            quantity: qty,
            name: product.name,
            price: product.price,
        }
        cartItems.cart.items.push(cart)
        cartItems.user = userId
        cartItems.totalPrice += product.price * qty

        await cartItems.save()

        res.status(200).json({ message: ' Add cart successfully', success: true })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in add to cart Api', success: false, error })
    }
}


// get cart items  
export const getCartItems = async (req, res) => {
    console.log('this is get cart items function')
    try {
        const userId = req.user._id
        const cartItems = await cartModel.findOne({ user: userId })
        if (!cartItems) {
            return res.status(404).json({ message: 'Cart items not found', success: false })
        }
        if (cartItems) {
            res.status(200).json({ message: 'Cart items fetched successfully', success: true, cartItems })

        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error  cart items Api', success: false, error, })
    }
}

// remove cart items
export const removeCartItems = async (req, res) => {
    console.log('this is remove cart items function')
    try {
        const userId = req.user._id
        const { id } = req.params
        const cartItems = await cartModel.findOne({ user: userId })
        if (!cartItems) {
            return res.status(404).json({ message: 'Cart items not found', success: false })
        }
        const isProductExist = cartItems.cart.items.find((item) => item.productId.toString() === id.toString())

        if (!isProductExist) {
            return res.status(400).json({ message: 'Product not exist in cart', success: false })
        }

        cartItems.cart.items = cartItems.cart.items.filter((item) => item.productId.toString() !== id.toString())
        cartItems.totalPrice -= isProductExist.price

        await cartItems.save()
        res.status(200).json({ message: 'Product removed from cart successfully', success: true })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in remove cart items Api', success: false, error })
    }
}

// add to whish list 
export const addToWishList = async (req, res) => {
    console.log('this is add to wish list function')

    try {
        const userId = req.user._id
        const { id } = req.params
        const product = await productModel.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false })
        }
        let wishListItems = await wishListModel.findOne({ user: userId })
        if (!wishListItems) {
            wishListItems = new wishListModel({ user: userId, items: [] });
        }
        const isProductExist = wishListItems.items.find((item) => item.productId.toString() === id.toString())

        if (isProductExist) {
            return res.status(400).json({ message: 'Product already exist in wishlist', success: false })
        }

        const wishList = {
            productId: product._id,
        }
        wishListItems.items.push(wishList)
        wishListItems.user = userId

        await wishListItems.save()

        res.status(200).json({ message: 'Product added to wishlist successfully', success: true })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in add to wishlist Api', success: false, error })
    }
}

// get wish list items
export const getWishListItems = async (req, res) => {
    console.log('this is get wish list items function')
    try {
        const userId = req.user._id
        const wishListItems = await wishListModel.findOne({ user: userId })
        if (!wishListItems) {
            return res.status(404).json({ message: 'Wish list items not found', success: false })
        }

        res.status(200).json({ message: 'Wish list items fetched successfully', success: true, wishListItems })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error in get wish list items Api', success: false, error })
    }
} 