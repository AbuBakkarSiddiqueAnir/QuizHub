const mongoose = require('mongoose');
const validator = require('validator');
const fs = require('fs');
const path = require('path');




const quizSchemaWithOwner = new mongoose.Schema({
    question : {
        type : String,
        unique : true,
        required : true,
    },
    options : [{
        option : {
            type : String,
            required : true,
            trim : true,        
        }
    }],
    answer : {
        type : String,
        required : true,
        trim : true
    },
    tag : {
        type : String,
        required : true,
        trim : true
    },
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

},{
    timestamps : true
})





const quizSchemaWithoutOwner = new mongoose.Schema({
    question : {
        type : String,
        unique : true,
        required : true,
    },
    options : [{
        option : {
            type : String,
            required : true,
            trim : true,        
        }
    }],
    answer : {
        type : String,
        required : true,
        trim : true
    },
    tag : {
        type : String,
        required : true,
        trim : true
    }
},{
    timestamps : true
})



quizSchemaWithOwner.statics.insertMassQuizess = () => {
    const quizFilesPathphysics = path.join(__dirname ,'../../public/files/physics.json');
    const quizFilesPathgi = path.join(__dirname ,'../../public/files/GI.json');
    const quizFilesPathCs = path.join(__dirname ,'../../public/files/CS.json');

    const quizessPhy = fs.readFileSync(quizFilesPathphysics)
    const quizessGi = fs.readFileSync(quizFilesPathgi)
    const quizessCs = fs.readFileSync(quizFilesPathCs)

    const mergedQuizess = [
        JSON.parse(quizessPhy),JSON.parse(quizessGi),JSON.parse(quizessCs)
    ]
    var quizess = [];
    try{

        for(let subject of mergedQuizess){
            for(let quiz of subject){
                quizess.push(quiz)
            }
        }
    }catch(e){
        console.log("can't make obj")
    }
   
    return quizess;
}


const ownerQuiz = mongoose.model('ownerQuiz', quizSchemaWithOwner);
const withoutOwnerQuiz = mongoose.model('withoutOwnerQuiz', quizSchemaWithoutOwner)

module.exports = {
    ownerQuiz,
    withoutOwnerQuiz
}
