//model
const movie = require('../model/movie');
const Comment=require('../model/comment');

//展示电影详情页
exports.movieDetail=(req,res)=>{
    let {id}=req.params;
    movie.findById(id,(err,docObj)=>{
        if(err){console.log(err);return}
        Comment.find({})
            .populate('from','username')
            .populate('reply.from reply.to','username')
            .sort({'meta.createAt':-1})
            .exec((err,commentArr)=>{
                if(err){
                    console.log(err);
                    return
                }
                res.render('./page/detail',{'title':movie.movieName,movie:docObj,comments:commentArr})
            })
    })
}