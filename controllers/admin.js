const Movie = require('../model/movie');
const _=require('underscore');

//展示电影录入页
exports.showAdminInsert= (req,res)=>{
    res.render('./page/admin',{'title':'录入页',movie:{
        movieName:null,
        doctor:null,
        language:null,
        country:null,
        summary:null,
        flash:null,
        poster:null,
        year:null,
    },'active':'录入'})
}

//展示电影修改页
exports.showAdminUpdate=(req,res)=>{
    let {id}=req.params;
    Movie.findById(id,(err,docObj)=>{
        if(err){console.log(err);return}
        res.render('./page/admin',{'title':'修改页','movie':docObj,'active':'修改'})
    })
}

//修改或者录入电影的功能
exports.adminInsertOrUpdate=(req,res)=>{
    let {movieName,doctor,language,country,summary,flash,poster,year,id} = req.body;
    //修改
    if(id !== 'undefined'&& id !==''&&id!==null){
        Movie.findById(id,(err,docObj)=>{
            if(err){console.log(err);return}
            let _movie =_.extend(docObj,{movieName,doctor,language,country,summary,flash,poster,year,_id:id})
            _movie.save((err,doc)=>{
                if(err){console.log(err);return}
                res.redirect('/movie/'+doc._id);
            })
        })
    }else {
        //录入
        let _movie=new Movie({movieName,doctor,language,country,summary,flash,poster,year})
        _movie.save((err,doc)=>{
            if(err){console.log(err);return}
            res.redirect('/movie/'+doc._id);
        })
    }
    console.log(id);
}

//展示电影列表页页
exports.adminshowList=(req,res)=>{
    Movie.fetch((err,docArr)=>{
        if(err){console.log(err);return}
        res.render('./page/list',{'movies':docArr})
    })
}

//电影删除功能
exports.adminRemoveMovie=(req,res)=>{
    let {id}=req.query;
    Movie.remove({_id:id},(err,r)=>{
        if(err){
            console.log(err);
            res.json(-1);
            return
        }
        res.json(1);
    })
}

//管理员权限认证
exports.adminRequired=(req,res,next)=>{
    // role > 50  才能够进入我们的路由
    let role = req.session.user.role;
    if(role>50){
        next();
    }else {
        res.redirect('/');
    }
}

