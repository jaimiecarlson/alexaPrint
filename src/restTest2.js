const thingiverse = require('./thingiverseRest');

thingiverse.findThing("wrench").then((status) => {
    console.log("do we ever get there");
});