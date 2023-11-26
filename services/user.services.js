const Video = require('../model/video.model');

const getVideoById = async(id)=>{
    const result = await Video.findById({_id:id});
    console.log(result,"result");
    return result;
}


const getAllVideos = async()=>{
    const result = await Video.find({});
    return result;
}


const getVideoByTitle = async(title)=>{
    const result = await Video.find({title: { $regex: `${title}`, $options: 'i'}});
    return result;

}


const getVideoByGenres = async(genres)=>{

    const genreArr = genres.split(',');
     
     let resultArr = [];
     
     for(const ele of genreArr){
        const dbResult = await Video.find({genre: ele});
        resultArr.push(...dbResult);
     }
    return resultArr;
}


const getVideoByContentRating = async(age)=>{

    const ageArr = [7, 12, 16, 18];
    const actualAge = parseInt(age.split('%')[0]);
    const index = ageArr.indexOf(actualAge);
 
    const newAgeArr = ageArr.slice(index);

    let resultArr = [];
    console.log(newAgeArr);
    for(const ele of newAgeArr){

        const dbResult = await Video.find({contentRating: `${ele}+`});
       
        resultArr.push(...dbResult);
    }

    return resultArr;

}

const getSortedVideos = async(sortBy)=>{

    if(sortBy==='releaseDate'){
        const allVideos = await getAllVideos();
        allVideos.sort((a, b)=>{
            const date1 = new Date(a.releaseDate);
            const date2 = new Date(b.releaseDate);
            return date2.getTime() - date1.getTime();
        })
        return allVideos;
    }

}

const postVideoToDb = async(video)=>{
    const newDocument = await Video.create(video);
    return newDocument;

}

const patchVotes =async (body, videoId)=>{
 
    if(body.change === 'increase'){
        const videoFetched = await Video.findById({_id:videoId});
        const upVoteCount = videoFetched.votes.upVotes;
        let key;
        if(body.vote==='upVote')
            key = 'upVotes'
        
        else key = 'downVotes'
        const result = await Video.findByIdAndUpdate({_id: videoId}, {
            votes:{
                [key]: upVoteCount+1,
            }
        })
        return result;
    }
   
}

const patchViews = async(videoId)=>{
    const videoFetched = await getVideoById(videoId);
    
    const result = await Video.findByIdAndUpdate({_id: videoId}, {
        viewCount: videoFetched.viewCount+1,
    })
    return result;
}



module.exports = {
    getVideoById,
    getAllVideos,
    getVideoByTitle,
    getVideoByGenres,
    getVideoByContentRating,
    getSortedVideos,
    postVideoToDb,
    patchViews,
    patchVotes

}