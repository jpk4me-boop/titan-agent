const express = require('express');
const app = express();
app.use(express.json());

// Configuration des variables Railway
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = "Titanex_AI_2026"; // Votre jeton exact

// ROUTE DE VÉRIFICATION (C'est ce que Meta va tester)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Route par défaut pour vérifier que le serveur vit
app.get('/', (req, res) => res.send('Titanex AI pour le Cercle des Titans est en ligne !'));

app.listen(PORT, () => console.log(`Serveur actif sur le port ${PORT}`));
