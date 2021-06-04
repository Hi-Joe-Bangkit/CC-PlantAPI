const express = require('express');
const Firestore = require('@google-cloud/firestore')
const db = new Firestore();
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Hi Joe Rest API listening on port ${port}`);
});

app.get('/', async (req, res) => {
    res.json({status: 'Hi-Joe!'});
})

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const query = db.collection('Hi-Joe').where('ID', '==', id);
    const querySnapshot = await query.get();
    if (querySnapshot.size > 0) {
        res.json(querySnapshot.docs[0].data());
    }
    else {
        res.json({status: 'Not found'});
    }
})
