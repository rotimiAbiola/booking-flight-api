const express = require('express');
const fs = require('fs');
const router = express.Router();
const controller = require('../controllers/flightController');
const flights = require('../models/flight.json');

// 1. Add/Book Flight
router.post('/add', (req, res) => {

    flights.push(req.body.newFlight);

    let stringedData = JSON.stringify(flights, null, 2);
    fs.writeFile('./models/flight.json', stringedData, (err) => {
        if (err) {
            return res.status(500).json({ message: err })
        }
    });
    return res.status(200).json({ message: "New flight has been added" });
});

// 2. Get all Flight
router.get('/', (req, res) => {
    return res.json({ flights });
});

// 3. Get a single Flight
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let targetFlight = flights.find(flight => {
        return String(flight.id) === id
    })
    if (targetFlight) {
        return res.status(200).json({ flight: targetFlight })
    } else {
        return res.status(404).json({ message: "flight not found" })
    }

});

// 4. Update/Edit Flight
router.put('/edit/:id', (req, res) => {
    let id = req.params.id;
    let targetFlight = flights.find(flight => {
        return String(flight.id) === id
    })
    if (targetFlight) {
        return res.status(200).json({ flight: targetFlight })
    } else {
        return res.status(404).json({ message: "flight not found" })
    }
});


// 5. Delete Flight
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let targetFlight = flights.find(flight => {
        return String(flight.id) === id
    })
    let flightRemoval = delete flights[targetFlight];
    fs.writeFile('./models/flight.json', flightRemoval, (err) => {
            if (err) {
                return res.status(200).json({ message: "flight not found" })
            } else {
                return res.status(404).json({ message: "flight has been removed" })
            }
    });
});


module.exports = router;

