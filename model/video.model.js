const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    videoLink: {
      type: String,
    },
    title: { type: String },
    genre: { type: String },
    contentRating: {
      type: String,
    },
    releaseDate:{
      type: String,
    },
    previewImage: {
      type:String,
    },
    viewCount: {
      type: Number, 
      default: 0
    },
    votes:{
      type: {
          upVotes: {
              type: Number,
              default: 0,
          },
          downVotes: {
              type: Number,
              default: 0,
          }
      },
      default: {
          upVotes: 0,
          downVotes: 0,
      },
      _id: false,
    }
  
  });
  
  const videoModel = mongoose.model('Videos', videoSchema);

  module.exports = videoModel;