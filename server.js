const app = require ('./index')

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
    console.log (`Movies are ready at http://localhost:${PORT}`);
});

