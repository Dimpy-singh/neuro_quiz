import express from 'express'
import supabase from './supabase.js';
import bodyParser from 'body-parser';

const app=express();
// import body parser

app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const tests=[{title:'CT-1',des:'Acquire the knowledge on constructing a neural network and genetic programming.',mcq:'/mcq/ct-1',video:'/video/ct-1'},{title:'CT-2',des:'Identify the basic Neural learning algorithm to apply for a real time problem.',mcq:'/mcq/ct-2',video:'/video2'},{title:'CT-3',des:'Gain Knowledge on applying the Fuzzy rules to different applications',mcq:'/mcq/ct-3',video:'/video3'}]

let score=0;

app.get("/home",(req,res)=>{
    score=0;
    res.render("cards",{tests:tests})
})

app.get("/mcq/:ct",async(req,res)=>{
    let ct= req.params.ct;
    console.log(ct);
    // res.render("mcq",{ctnum:ct})
    let{data}=await  supabase
    .from('ques')
    .select('*')
    .eq("label",ct)
    // console.log(data)
    // res.json(data);
    res.render('mcq', {items: data });

})


app.post("/submit",(req,res)=>{
    let answers=req.body;
    for(let answer in answers){
        if (answers.hasOwnProperty(answer)) {
            let value=answers[answer];
            if (value.charAt(0)==value.charAt(2)){
                console.log(`you have ans correctly for ${answer}` )
              score++;  
            }

            console.log(`Key: ${answer}, Value: ${answers[answer]}`);}}

            res.redirect("/showscore")

})

app.get('/showscore',(req,res)=>{
    //convert score to string
    let marks = String(score);
    res.render("score",{marks:marks});
}
)


app.get("/video/:vc",(request,response)=>{
    let vc=request.params.vc;
    response.render("video",{vc:vc})
})

app.get("/video2",(request,response)=>{
    let vc=request.params.vc;
    response.render("video2",{vc:vc})
})

app.get("/video3",(request,response)=>{
    let vc=request.params.vc;
    response.render("video3",{vc:vc})
})

app.get("/try",(request,response)=>{
    response.render("try")
})

app.get("/testing",async(req,res)=>{
    
let { data} = await supabase
.from('testing')
.select('*')
        
    console.log(data)
    
    res.json(data);
    
})

app.get("/neuro_quiz",async(req,res)=>{
    let{data}=await  supabase
    .from('ques')
    .select('*')
    // console.log(data)
    // res.json(data);
    res.render('mcq', {items: data });
})











app.listen(3000,(req,res)=>{
    console.log("hi")
})
