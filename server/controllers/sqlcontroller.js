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
    const oldName = "'" + req.body.oldcomname + "'";
    const newName = "'" + req.body.comname + "'";
    const oldgenus = "'" + req.body.oldgenus + "'";
    const newGenus = "'" + req.body.genus + "'";
    const oldspecies = "'" + req.body.oldspecies + "'";
    const newSpecies = "'" + req.body.species + "'";

    //res.send(oldName);

    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    //name
    const SQLUpdateName = 'UPDATE FLOWERS SET COMNAME = ' + newName + ' WHERE FLOWERS.COMNAME = ' + oldName;
    const SQLUpdateSightings = 'UPDATE SIGHTINGS SET NAME = ' + newName + ' WHERE SIGHTINGS.NAME = ' + oldName;
    const SQLUpdateGenus = 'UPDATE FLOWERS SET GENUS = ' + newGenus + ' WHERE FLOWERS.GENUS = ' + oldgenus;
    const SQLUpdateSpecies = 'UPDATE FLOWERS SET SPECIES = ' + newSpecies + ' WHERE FLOWERS.SPECIES = ' + oldspecies;
    db.all(SQLUpdateName, (err, rows) => {
        if (!err) {
            db.all(SQLUpdateSightings, (err, rows) => {
                if (!err) {
                    db.all(SQLUpdateGenus, (err, rows) => {
                        if (!err) {
                            db.all(SQLUpdateSpecies, (err, rows) => {
                                if (!err) {
                                   // console.log("G");
                                    console.log('Name has been changed!\nGenus has been changed!\nSpecies has been changed!\n');
                                    res.send('Name has been changed!\nGenus has been changed!\nSpecies has been changed!\n');
                                    
                                }
                                else {
                                    console.log(err);
                                }
                            })
                        }
                        else {
                            console.log(err);
                        }
                    })
                }
                else {
                    console.log(err);
                }
            })
        }
        else {
            console.log(err);
        }
    })
    
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
            console.log('Sighting has been inserted!')
            res.send('Sighting has been inserted!')
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
            console.log('Flower has been deleted!');
            res.send('Flower has been deleted!');
        }
        else {
            console.log(err);
        }
    });
} 

exports.performance = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    var preQuery = new Date().getTime();
    db.serialize(function(){
        db.each("SELECT * FROM flowers", function(err,row){
            //console.log(row.GENUS + " | " + row.SPECIES + " | " + row.COMNAME);
        });
    });
    var postQuery = new Date().getTime();
    var duration = (postQuery - preQuery) / 1000;
    console.log(duration);
    res.body.num(duration);
}