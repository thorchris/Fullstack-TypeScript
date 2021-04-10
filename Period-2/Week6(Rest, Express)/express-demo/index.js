const Joi = require('joi')
const express = require('express')
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}


app.get('/', (req, res) => {
    res.send('Hello World'); //Define a route 
});

app.get('api/courses', (req, res) =>{
    res.send(courses) //Should get from DB 
})

app.post('/api/courses', (req, res )=> {
    const { error } = validateCourse(req.body);
    if(error){
        //400 Bad request
        res.status(400).send(error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    //Find course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('The course with the given ID was not found')
        return;
    }

     //Validate
    const { error } = validateCourse(req.body);
    if(error){
        //400 Bad request
        res.status(400).send(error.details[0].message)
        return;
    }

    //Update course
    course.name = req.body.name
    res.send(course)
})

app.get('api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found')
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
     //Find course
     const course = courses.find(c => c.id === parseInt(req.params.id))
     if (!course) {
        res.status(404).send('The course with the given ID was not found')
        return;
    }

     //Delete
     const index = courses.indexOf(course)
     courses.splice(index, 1);

     //Return res
     res.send(course)
})

app.get('api/posts/:year/:month', (req, res) => {
    res.send(req.query)
})

//PORT (Enviroment varible)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
