const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
//CREATE PRODUCT --ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//GET ALL PRODUCT
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

//GET ALL PRODUCT DETAILS
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//Update product ---admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "product delete successfully",
  });
});

//Create New Review or Update The Review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // Find the product by its ID
  const product = await Product.findById(productId);

  // Check if the product exists
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Check if the user has already reviewed the product
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // Update the existing review
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    // Add a new review
    product.reviews.push(review);
    product.numofReviews = product.reviews.length;
  }

  // Calculate average rating
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  // Save the product
  await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
  });
});


//Get All Reviews
exports.getProductReviews = catchAsyncErrors(async (req,res,next)=>{
   const product = await Product.findById(req.query.id);

   if(!product){
      return next(new ErrorHander("Product Not Found",404));
   }
   res.status(200).json({
      success:true,
      reviews:product.reviews,
   });
});


//Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHander("Product Not Found", 404));
    }

    // Filter out the review to be deleted by comparing _id.
    const updatedReviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    // Calculate the new average rating.
    let avg = 0;
    updatedReviews.forEach((rev) => {
      avg += rev.rating;
    });
    const ratings =
      updatedReviews.length > 0 ? +(avg / updatedReviews.length).toFixed(2) : 0;

    const numofReviews = updatedReviews.length;

    // Update the product with the new review data.
    const updatedProduct = await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews: updatedReviews,
        ratings,
        numofReviews,
      },
      {
        new: true, // Return the updated document.
        runValidators: true, // Run validation on update.
        useFindAndModify: false, // Use modern version of findByIdAndUpdate.
      }
    );

    if (!updatedProduct) {
      return next(new ErrorHander("Product Not Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });
  } catch (error) {
    next(error); // Pass any caught errors to your error handling middleware.
  }
});

