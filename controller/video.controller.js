const videoServices = require("../services/user.services");


const getVideoById = async(req, res)=>{
    console.log(req.params.videoId,"videoId");
    const result = await videoServices.getVideoById(req.params.videoId);
    res.status(200).json(result);
}


const getVideos = async(req,res) =>{
    const query = req.query;

    if (!Object.keys(query).length) {
        const result = await videoServices.getAllVideos();
        res.status(200).json({ videos: result });
    }

    const {title, sortBy, contentRating, genres} = query;

  if(title && genres && contentRating){
    console.log(title, genres, contentRating)
    const titleResult = await videoServices.getVideoByTitle(title);
    const genresResult =  await videoServices.getVideoByGenres(genres);
    const contentRatingResult = await videoServices.getVideoByContentRating(contentRating);

    const int1 = titleResult.filter((ele)=> {
      let isFound=false;
      genresResult.forEach((item)=>{
        if(item.genre === ele.genre && ele.title === item.title)
           isFound = true;
      })
      return isFound;
    });

    const int2 = int1.filter((ele)=>{
      let isFound=false;
        contentRatingResult.forEach((item)=>{
          if(item.contentRating === ele.contentRating){
            isFound=true;
          }
        })
        return isFound;
    })
    

    console.log(int1);
    res.status(200).json({videos: int2})
    return;
  }

  if(title){
    const result = await videoServices.getVideoByTitle(title);
    res.status(200).json({videos: result})
    return;
  }
  if(genres){
    const result = await videoServices.getVideoByGenres(genres);
    res.status(200).json({videos: result})
    return;
  }
  if(contentRating){
    const result = await videoServices.getVideoByContentRating(contentRating);
    res.status(200).json({videos: result});
    return;
  }
  if(sortBy){
    const result = await videoServices.getSortedVideos(sortBy);
    res.status(200).json({videos: result});
  }

}


const postVideos = async(req,res)=>{

    const result = await videoServices.postVideoToDb(req.body);
    res.status(201).json(result);

}


const patchViews = async (req,res)=>{
    const result = await videoServices.patchVotes(req.body, req.params.videoId);
    res.sendStatus(204);
}


const patchVotes = async(req,res)=>{
    const result = await videoServices.patchViews(req.params.videoId);
    res.sendStatus(204);
}


module.exports = {
    getVideos,
    postVideos,
    getVideoById,
    patchViews,
    patchVotes,
}