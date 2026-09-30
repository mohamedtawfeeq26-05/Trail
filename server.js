const express = require('express')
const app = express();
const PORT = 3000;
app.use(express.json());

let students= [
    {id:1, name: "John", email: "john@gmail.com", course: "MCA", sem:3},
    {id:2, name: "David", email: "david@gmail.com", course: "MCA", sem:3},
];

app.get('/api/students',(req,res) => {
    res.json(students);
});

app.get('/api/students/:id',(req,res) =>{
    const id =Number(req.params.id);
    const student = students.find(s =>s.id === id);
    if(!student){
        return res.status(404).json({message:'Student not available'});
    }

    res.json(students);
});
app.post('/api/students',(req,res) =>{
    const{name, email, course, sem } = req.body;

    if(!name || !email || !course || !sem){
        return res.status(404).json({message:'Details are required'});
    }
    

    const newstud= {
        id: students.length > 0 ? students[students.length -1].id + 1 : 1,
        name,
        email,
        course,
        sem
    };
    students.push(newstud);
    res.status(201).json(students);
});

app.put('api/students/:id',(req,res) => {
    const id = Number(req.params.id);
    const student=students.find(s =>s.id === id);
    if(!student){
        return res.status(404).json({message:'Not found'});
    }

    const{name, email, course, sem}= req.body;
    if(name )student.name=name;
    if(email )student.email=email;
    if(course)student.course=course;
    if(sem)student.sem=sem;
    
    res.json(students);
});

app.delete('api/students/:id',(req,res) => {
    const id = Number(req.params.id);
    const studentExits= students.same(s => s.id === id);
    if(!studentExits) {
        return res.status(404).json({message:'Not found'});
    }

    student=students.filter(s =>s.id === id);
    res.status(200).json({message:'Student deleted successfully'});

});


app.listen(PORT, () =>{
    console.log(`server running on http://Localhost:${PORT}`);
});