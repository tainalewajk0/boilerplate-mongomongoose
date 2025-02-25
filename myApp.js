require('dotenv').config();


/** MONGOOSE SETUP
 * =============== */

// install and set up mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = function(done) {
  var billHader = new Person({
    name: "Bill Hader",
    age: 46,
    favoriteFoods: ["popcorn", "meatballs", "fish tacos"]});

  billHader.save(function(err, data) {
    if (err) {
      console.error(err);
      return done(err);
    }
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Sal", age: 17, favoriteFoods: ["steak"]},
  {name: "Valerie", age: 32, favoriteFoods: ["milk"]},
  {name: "Mickey", age: 90, favoriteFoods: ["cheese"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},
    function (err, personFound) {
      if (err) return console.log(err);
      done(null, personFound);
    });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},
    function(err, food) {
      if (err) return console.log(err);
      done(null, food);
    });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, personId) {
    if (err) return console.log(err);
    done(null, personId);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, {err, updatedDoc} => {
    if (err) return console.log(err);
    done(null, updatedDoc)
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc)
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: {$all: [foodToSearch]}})
        .sort({name: 'asc'})
        .limit(2)
        .select('-age')
        .exec((error, filteredResults) => {
          if (err) console.log(err);
          else done(null, filteredResults)
        });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
