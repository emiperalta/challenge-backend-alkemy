require('./database');
const { PORT } = require('./config/keys');
const { app } = require('./app');

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
