const path = require('path')
const mongoose = require("mongoose")

require("dotenv").config({ path: path.resolve(__dirname, '../.env') })

const userSchema = new mongoose.Schema({
  name: {
    trim: true,
    type: String,
    required: true,
  },
  email: {
    trim: true,
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    trim:  true,
    type: String,
    require: true
  },
  country: {
    trim: true,
    type: String,
    required: true
  },
  state: {
    trim:  true,
    type: String,
    require: true
  },
  city: {
    trim:  true,
    type: String,
    require: true
  },
  address: {
    trim: true,
    type: String,
    required: true,
  },
  zipcode: {
    trim:  true,
    type: String,
    require: true
  },
  company: {
    trim:  true,
    type: String,
    require: true
  },
  role: {
    type: String,
    require: true
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
})

const User  = mongoose.model("User", userSchema)

const getUser = async (req) => {

}

const create = async (req, res) => {
  try {
    // Creating a new document in the collection

    const result = await new User(req.body).save();
    // console.log(result);
    // Returning successfull response
    return res.status(200).json({
      success: true,
      result,
      message: "Successfully Created the document in Model ",
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        result: null,
        message: "Required fields are not supplied",
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        message: "Email is already available",
      });
    }
  }
} 

const update = async (req, res) => {
  try {
    // Find document by id and updates with the required fields
    const result = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      }
    ).exec();

    return res.status(200).json({
      success: true,
      result,
      message: "we update this document by this id: " + req.params.id,
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        result: null,
        message: "Required fields are not supplied",
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        message: "Oops there is an Error",
      });
    }
  }
}

const getUsers = async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = page * limit - limit;
  try {
    //  Query the database for a list of all results
    const resultsPromise = User.find()
      .skip(skip)
      .limit(limit)
      .sort({ created: "desc" })
      .populate();
    // Counting the total documents
    const countPromise = User.count();
    // Resolving both promises
    const [result, count] = await Promise.all([resultsPromise, countPromise]);
    // Calculating total pages
    const pages = Math.ceil(count / limit);

    // const result = await User.find();
    // const count = result.length;
    // const pages = Math.ceil(count / limit);

    // Getting Pagination Object
    const pagination = { page, pages, count};
    if (count > 0) {
      return res.status(200).json({
        success: true,
        result,
        pagination,
        message: "Successfully found all documents",
      });
    } else {
      return res.status(203).json({
        success: false,
        result: [],
        pagination,
        message: "Collection is Empty",
      });
    }
  } catch {
    return res
      .status(500)
      .json({ success: false, result: [], message: "Oops there is an Error" });
  }
}

const remove = async (req, res) => {
  try {
    // Find the document by id and delete it

    // Find the document by id and delete it
    const result = await User.findOneAndDelete({ _id: req.params.id }).exec();
    // If no results found, return document not found
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No document found by this id: " + req.params.id,
      });
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: "Successfully Deleted the document by id: " + req.params.id,
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Oops there is an Error",
    });
  }
}

const removeList = async (req, res) => {
  try {
    const { lists } = req.body;
    console.log(lists)
    const result = await User.deleteMany({
      _id: {
        $in: lists
      }
    })

    if(!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No document found"
      })
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: "Successfully Deleted"
      })
    }
  } catch(err) {
    return res.status(500).json({
      success: false,
      result: null,
      error: err 
    })
  }
}



module.exports = {
  create,
  update,
  getUsers,
  remove,
  removeList,
}