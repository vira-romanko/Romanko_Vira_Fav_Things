const createError = require('http-errors');
const express = require('express');
const path = require('path');
const hbs = require('hbs');

// set the port
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/index'));


// catch 404 and forward to error handler
// app.use((req, res, next)=> {
//     next(createError(404));
//   });
  
  // error handler goes here
  // app.use((err, req, res, next)=>{
  //   //  only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
  //   res.status(err.status || 500);
  //   res.render('error');
  // });

  app.use((req, res, next) =>{
    var err = new Error('Not Found');
    err.status = 404;
    err.message = "Roses are Red, Violets are Blue, unexpected error on line 52"

    next(err);

})

app.use((err, req, res, next) =>{
    res.render('error', {error: err, layout:'errorPage'});
})


app.listen(port, () => {
    console.log(`app is running on ${port}`);
})

