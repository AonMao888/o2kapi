const express = require('express');
const app = express();
const {createClient} = require('@supabase/supabase-js')
const url = 'https://oxovhbhwuxpyiqkxizbe.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94b3ZoYmh3dXhweWlxa3hpemJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4Njg2MzAsImV4cCI6MjAwNjQ0NDYzMH0.YdbrQlYhlfQrJhC2_99ZGFaL0hrg26sMRbVGXAUejX4';

const supabase = createClient(url,key);

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

app.listen(80,()=>{
    console.log('Server started with port 80');
})