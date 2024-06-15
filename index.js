const express = require('express');
const app = express();
const {createClient} = require('@supabase/supabase-js')
const url = 'https://oxovhbhwuxpyiqkxizbe.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94b3ZoYmh3dXhweWlxa3hpemJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4Njg2MzAsImV4cCI6MjAwNjQ0NDYzMH0.YdbrQlYhlfQrJhC2_99ZGFaL0hrg26sMRbVGXAUejX4';
const cors = require('cors');

const supabase = createClient(url,key);
app.use(cors({
    origin:'*'
}))

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('home')
})

//get students data
app.get('/student',async(req,res)=>{
    const {data,error} = await supabase.from('students').select('*');
    res.json(data);
})

//get students data by year
app.get('/student/year/:year',async(req,res)=>{
    const year = req.params.year;
    const {data,error} = await supabase.from('students').select().eq('year',year);
    res.json(data);
})

//get students data by student id
app.get('/student/id/:id',async(req,res)=>{
    const id = req.params.id;
    const {data,error} = await supabase.from('students').select().eq('sid',id);
    res.json(data);
})

//add student to database
app.post('/add/student',async(req,res)=>{
    let back = req.query.back;
    const all = req.body;
    const {data,error} = await supabase.from('students').insert([{
        name:all.name,
        nickname:all.nickname,
        address:all.addr,
        contact:all.contact,
        sid:all.sid,
        year:all.year,
        class:all.class,
        marks:all.mark
    }]).select();
    if(!error){
        res.redirect(back);
    }
})

//get tools list data
app.get('/tools',async(req,res)=>{
    const {data,error} = await supabase.from('tools').select('*');
    if(data){
        res.json(data)
    }else{
        res.sendStatus(404).end('Error')
    }
})

//get tools list data by categories
app.get('/tools/:cate',async(req,res)=>{
    const cate = req.params.cate;
    const {data,error} = await supabase.from('tools').select().eq('type',cate);
    if(data){
        res.json(data)
    }else{
        res.sendStatus(404).end('Error')
    }
})

app.listen(80,()=>{
    console.log('Server started with port 80');
})