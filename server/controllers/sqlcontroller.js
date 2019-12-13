const sqlite3 = require('sqlite3').verbose();

exports.getFlowers = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all('SELECT * FROM FLOWERS', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
}

exports.getSightings = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all('SELECT * FROM SIGHTINGS', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
}

exports.flowersUpdate = (req, res) => {
        const oldName = req.body.oldcomname
        const newName = req.body.comname
        const oldgenus = req.body.oldgenus
        const newGenus = req.body.genus
        const oldspecies = req.body.oldspecies
        const newSpecies = req.body.species
        console.log(oldName, newName, oldgenus, newGenus, oldspecies, newSpecies)

        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        //name
        const SQLUpdateName = 'UPDATE FLOWERS SET COMNAME = ' + newName + ' WHERE FLOWERS.COMNAME = ' + oldName;
        const SQLUpdateSightings = 'UPDATE SIGHTINGS SET NAME = ' + newName + ' WHERE SIGHTINGS.NAME = ' + oldName;
        
        db.all(SQLUpdateName, (err, rows) => {
            if (!err) {
                db.all(SQLUpdateSightings, (err, rows) => {
                    if (!err) {
                        res.send('Name has been changed!');
                    }
                    else {
                        console.log(err);
                    }
                })
            }
            else {
                console.log(err);
            }
        });
    
        //genus
        const SQLUpdateGenus = 'UPDATE FLOWERS SET GENUS = ' + newGenus + ' WHERE FLOWERS.GENUS = ' + oldgenus;
        db.all(SQLUpdateGenus, (err, rows) => {
            if (!err) {
                res.send('Genus has been changed!');
            }
            else {
                console.log(err);
            }
        });
    
        //species
        const SQLUpdateSpecies = 'UPDATE FLOWERS SET SPECIES = ' + newSpecies + ' WHERE FLOWERS.SPECIES = ' + oldspecies;
        db.all(SQLUpdateSpecies, (err, rows) => {
            if (!err) {
                res.send('Species has been changed!');
            }
            else {
                console.log(err);
            }
        });
    
}

exports.sightingsUpdate = (req, res) => {
    const newName = "'" + req.body.newName + "'";
    const person = "'" + req.body.person + "'";
    const name = "'" + req.body.name + "'";
    const location = "'" + req.body.location + "'";
    const date = "'" + req.body.date + "'";
    const change = req.body.change;

    if (change === "person") {
        const SQLUpdatePerson = 'UPDATE SIGHTINGS SET PERSON = ' + newName + ' WHERE SIGHTINGS.PERSON = ' + person + ' AND SIGHTINGS.NAME = ' + name + ' AND SIGHTINGS.LOCATION = ' + location + ' AND SIGHTINGS.SIGHTED = ' + date;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdatePerson, (err, rows) => {
            if (!err) {
                res.send('Person has been changed!');
            }
            else {
                console.log(err);
            }
        });
    }
    else if (change === "location") {
        const SQLUpdateLocation = 'UPDATE SIGHTINGS SET LOCATION = ' + newName + ' WHERE SIGHTINGS.PERSON = ' + person + ' AND SIGHTINGS.NAME = ' + name + ' AND SIGHTINGS.LOCATION = ' + location + ' AND SIGHTINGS.SIGHTED = ' + date;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdateLocation, (err, rows) => {
            if (!err) {
                res.send('Location has been changed!');
            }
            else {
                console.log(err);
            }
        });
    }
    else if (change === "date") {
        const SQLUpdateDate = 'UPDATE SIGHTINGS SET SIGHTED = ' + newName + ' WHERE SIGHTINGS.PERSON = ' + person + ' AND SIGHTINGS.NAME = ' + name + ' AND SIGHTINGS.LOCATION = ' + location + ' AND SIGHTINGS.SIGHTED = ' + date;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdateDate, (err, rows) => {
            if (!err) {
                res.send('Date has been changed!');
            }
            else {
                console.log(err);
            }
        });
    }
}

exports.sightingsInsert = (req, res) => {
    const name = "'" + req.body.name + "'";
    const person = "'" + req.body.person + "'";
    const location = "'" + req.body.location + "'";
    const date = "'" + req.body.date + "'";

    const SQLInsertSighting = 'INSERT INTO SIGHTINGS (NAME, PERSON, LOCATION, SIGHTED) VALUES (' + name + ', ' + person + ', ' + location + ', ' + date + ')';
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all(SQLInsertSighting, (err, rows) => {
        if (!err) {
            res.send('Sighting has been inserted!');
        }
        else {
            console.log(err);
        }
    });
}

exports.sightingsDelete = (req, res) => {
    const name = "'" + req.body.name + "'";
    const person = "'" + req.body.person + "'";
    const location = "'" + req.body.location + "'";
    const date = "'" + req.body.date + "'";

    const SQLDeleteSighting = 'DELETE FROM SIGHTINGS WHERE NAME = ' + name + ' AND PERSON = ' + person + ' AND LOCATION = ' + location + ' AND SIGHTED = ' + date;
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all(SQLDeleteSighting, (err, rows) => {
        if (!err) {
            res.send('Sighting has been deleted!');
        }
        else {
            console.log(err);
        }
    });
}

exports.flowersDelete = (req, res) => {
    const name = "'" + req.body.name + "'";
    const genus = "'" + req.body.genus + "'";
    const species = "'" + req.body.species + "'";

    const SQLDeleteFlower = 'DELETE FROM FLOWERS WHERE COMNAME = ' + name + ' AND GENUS = ' + genus + ' AND SPECIES = ' + species;
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all(SQLDeleteFlower, (err, rows) => {
        if (!err) {
            res.send('Flower has been deleted!');
        }
        else {
            console.log(err);
        }
    });
} 
