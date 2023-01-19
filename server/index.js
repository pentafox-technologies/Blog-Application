const app = require('./app');

const PORT=5000;

app.listen(PORT, function()
{
    console.log('Server is running on PORT:', PORT);
});