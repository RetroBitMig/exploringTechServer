// load in environmental variables
require('dotenv').load();

var express = require('express'),
app = express(),
mongoose = require('mongoose'),
expressSanitizer = require('express-sanitizer');
bodyParser = require('body-parser'),
cors = require('cors'),
// db_server = process.env.DB_ENV || 'mongodb://localhost:27017/exploringTech',
db_server = process.env.MONOGO_DB_URL,
port = process.env.PORT || 3000;


// routes
var volunteerRoutes = require('./routes/volunteerRouter'),
mentorRoutes = require('./routes/mentorRouter'),
contactRoutes = require('./routes/contactUsRouter'),
subscriberRoutes = require('./routes/subscriberRouter'),
blogRoutes = require('./routes/blogsRouter'),
appRoutes = require('./routes/appRouter'),
commentRoutes = require('./routes/commentsRouter');
cubeAppRoutes = require('./routes/cubeAppRouter');
testRoutes = require('./routes/test');
tabletSignInRoutes = require('./routes/cubeAppSignInRouter');

mongoose.connect(db_server);
mongoose.connection.on('connected',function(ref){
    console.log("Connected to " + db_server + " DB!")
});
mongoose.connection.on('error',function(err){
    console.log("Connection error " + err);
    console.log("Terminating application");
    process.exit(0);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/volunteer',volunteerRoutes);
app.use('/mentor',mentorRoutes);
app.use('/contact',contactRoutes);
app.use('/subscribe',subscriberRoutes);
app.use('/blogs',blogRoutes);
app.use('/comments',commentRoutes);
app.use('/app', appRoutes);
app.use('/cubeApp', cubeAppRoutes);
app.use('/test', testRoutes);
app.use('/signIn', tabletSignInRoutes);

app.listen(port, function() {
    console.log('listening on port ' + port);
});