/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.
There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?
Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/
Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/
// As you may have realized, this website randomly generates pizzas.

//PizzaIngredients Object
//Contains arrays of all possible pizza ingredients.
var pizzaIngredients = {};
//Pizza Meats List
pizzaIngredients.meats = [
"Pepperoni",
"Sausage",
"Fennel Sausage",
"Spicy Sausage",
"Chicken",
"BBQ Chicken",
"Chorizo",
"Chicken Andouille",
"Salami",
"Tofu",
"Bacon",
"Canadian Bacon",
"Proscuitto",
"Italian Sausage",
"Ground Beef",
"Anchovies",
"Turkey",
"Ham",
"Venison",
"Lamb",
"Duck",
"Soylent Green",
"Carne Asada",
"Soppressata Picante",
"Coppa",
"Pancetta",
"Bresola",
"Lox",
"Guanciale",
"Chili",
"Beef Jerky",
"Pastrami",
"Kielbasa",
"Scallops",
"Filet Mignon"
];

//Pizza Non-Meats List
pizzaIngredients.nonMeats = [
"White Onions",
"Red Onions",
"Sauteed Onions",
"Green Peppers",
"Red Peppers",
"Banana Peppers",
"Ghost Peppers",
"Habanero Peppers",
"Jalapeno Peppers",
"Stuffed Peppers",
"Spinach",
"Tomatoes",
"Pineapple",
"Pear Slices",
"Apple Slices",
"Mushrooms",
"Arugula",
"Basil",
"Fennel",
"Rosemary",
"Cilantro",
"Avocado",
"Guacamole",
"Salsa",
"Swiss Chard",
"Kale",
"Sun Dried Tomatoes",
"Walnuts",
"Artichoke",
"Asparagus",
"Caramelized Onions",
"Mango",
"Garlic",
"Olives",
"Cauliflower",
"Polenta",
"Fried Egg",
"Zucchini",
"Hummus"
];

//Pizza Cheese List
pizzaIngredients.cheeses = [
"American Cheese",
"Swiss Cheese",
"Goat Cheese",
"Mozzarella Cheese",
"Parmesean Cheese",
"Velveeta Cheese",
"Gouda Cheese",
"Muenster Cheese",
"Applewood Cheese",
"Asiago Cheese",
"Bleu Cheese",
"Boursin Cheese",
"Brie Cheese",
"Cheddar Cheese",
"Chevre Cheese",
"Havarti Cheese",
"Jack Cheese",
"Pepper Jack Cheese",
"Gruyere Cheese",
"Limberger Cheese",
"Manchego Cheese",
"Marscapone Cheese",
"Pecorino Cheese",
"Provolone Cheese",
"Queso Cheese",
"Roquefort Cheese",
"Romano Cheese",
"Ricotta Cheese",
"Smoked Gouda"
];

//Pizza Sauce List
pizzaIngredients.sauces = [
"Red Sauce",
"Marinara",
"BBQ Sauce",
"No Sauce",
"Hot Sauce"
];

//Pizza Crust List
pizzaIngredients.crusts = [
"White Crust",
"Whole Wheat Crust",
"Flatbread Crust",
"Stuffed Crust"
];

//Retrieve the specialized adjective list that matches the provided adjective category.
function getAdj(x) {
    switch (x) {
        case "apocalyptic":
            var apocalyptic = ["Nuclear", "Apocalyptic", "Desolate", "Atomic", "Zombie", "Collapsed", "Grim", "Fallen", "Collapsed", "Cannibalistic", "Radioactive", "Toxic", "Poisonous", "Venomous", "Disastrous", "Grimy", "Dirty", "Undead", "Bloodshot", "Rusty", "Glowing", "Decaying", "Rotten", "Deadly", "Plagued", "Decimated", "Rotting", "Putrid", "Decayed", "Deserted", "Acidic"];
            return apocalyptic;
        case "color":
            var colors = ["Blue", "Green", "Purple", "Grey", "Scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "Pink", "Black", "Red", "Maroon", "Silver", "Golden", "Yellow", "Orange", "Mustard", "Plum", "Violet", "Cerulean", "Brown", "Lavender", "Violet", "Magenta", "Chestnut", "Rosy", "Copper", "Crimson", "Teal", "Indigo", "Navy", "Azure", "Periwinkle", "Brassy", "Verdigris", "Veridian", "Tan", "Raspberry", "Beige", "Sandy", "ElectricBlue", "White", "Champagne", "Coral", "Cyan"];
            return colors;
        case "dark":
            var dark = ["Dark", "Morbid", "Scary", "Spooky", "Gothic", "Deviant", "Creepy", "Sadistic", "Black", "Dangerous", "Dejected", "Haunted", "Morose", "Tragic", "Shattered", "Broken", "Sad", "Melancholy", "Somber", "Dark", "Gloomy", "Homicidal", "Murderous", "Shady", "Misty", "Dusky", "Ghostly", "Shadowy", "Demented", "Cursed", "Insane", "Possessed", "Grotesque", "Obsessed"];
            return dark;
        case "insulting":
            var insulting = ["Stupid", "Idiotic", "Fat", "Ugly", "Hideous", "Grotesque", "Dull", "Dumb", "Lazy", "Sluggish", "Brainless", "Slow", "Gullible", "Obtuse", "Dense", "Dim", "Dazed", "Ridiculous", "Witless", "Daft", "Crazy", "Vapid", "Inane", "Mundane", "Hollow", "Vacuous", "Boring", "Insipid", "Tedious", "Monotonous", "Weird", "Bizarre", "Backward", "Moronic", "Ignorant", "Scatterbrained", "Forgetful", "Careless", "Lethargic", "Insolent", "Indolent", "Loitering", "Gross", "Disgusting", "Bland", "Horrid", "Unseemly", "Revolting", "Homely", "Deformed", "Disfigured", "Offensive", "Cowardly", "Weak", "Villainous", "Fearful", "Monstrous", "Unattractive", "Unpleasant", "Nasty", "Beastly", "Snide", "Horrible", "Syncophantic", "Unhelpful", "Bootinglick"];
            return insulting;
        case "noisy":
            var noisy = ["Untuned", "Loud", "Soft", "Shrieking", "Melodious", "Musical", "Operatic", "Symphonic", "Dancing", "Lyrical", "Harmonic", "Orchestral", "Noisy", "Dissonant", "Rhythmic", "Hissing", "Singing", "Crooning", "Shouting", "Screaming", "Wailing", "Crying", "Howling", "Yelling", "Hollering", "Caterwauling", "Bawling", "Bellowing", "Roaring", "Squealing", "Beeping", "Knocking", "Tapping", "Rapping", "Humming", "Scatting", "Whispered", "Whispering", "Rasping", "Buzzing", "Whirring", "Whistling", "Whistled"];
            return noisy;
        case "praise":
            var praise = ["Beautiful", "Intelligent", "Smart", "Genius", "Ingenious", "Gorgeous", "Pretty", "Witty", "Angelic", "Handsome", "Graceful", "Talented", "Exquisite", "Enchanting", "Fascinating", "Interesting", "Divine", "Alluring", "Ravishing", "Wonderful", "Magnificient", "Marvelous", "Dazzling", "Cute", "Charming", "Attractive", "Nifty", "Delightful", "Superior", "Amiable", "Gentle", "Heroic", "Courageous", "Valiant", "Brave", "Noble", "Daring", "Fearless", "Gallant", "Adventurous", "Cool", "Enthusiastic", "Fierce", "Awesome", "Radical", "Tubular", "Fearsome", "Majestic", "Grand", "Stunning"];
            return praise;
        case "scientific":
            var scientific = ["Scientific", "Technical", "Digital", "Programming", "Calculating", "Formulating", "Cyberpunk", "Mechanical", "Technological", "Innovative", "Brainy", "Chemical", "Quantum", "Astro", "Space", "Theoretical", "Atomic", "Electronic", "Gaseous", "Investigative", "Solar", "Extinct", "Galactic"];
            return scientific;
        case "shiny":
            var shiny = ["Sapphire", "Opal", "Silver", "Gold", "Platinum", "Ruby", "Emerald", "Topaz", "Diamond", "Amethyst", "Turquoise", "Starlit", "Moonlit", "Bronze", "Metal", "Jade", "Amber", "Garnet", "Obsidian", "Onyx", "Pearl", "Copper", "Sunlit", "Brass", "Brassy", "Metallic"];
            return shiny;
        case "whimsical":
            var whimsy = ["Whimsical", "Silly", "Drunken", "Goofy", "Funny", "Weird", "Strange", "Odd", "Playful", "Clever", "Boastful", "Breakdancing", "Hilarious", "Conceited", "Happy", "Comical", "Curious", "Peculiar", "Quaint", "Quirky", "Fancy", "Wayward", "Fickle", "Yawning", "Sleepy", "Cockeyed", "Dizzy", "Dancing", "Absurd", "Laughing", "Hairy", "Smiling", "Perplexed", "Baffled", "Cockamamie", "Vulgar", "Hoodwinked", "Brainwashed"];
            return whimsy;
        default:
            var scientific = ["Scientific", "Technical", "Digital", "Programming", "Calculating", "Formulating", "Cyberpunk", "Mechanical", "Technological", "Innovative", "Brainy", "Chemical", "Quantum", "Astro", "Space", "Theoretical", "Atomic", "Electronic", "Gaseous", "Investigative", "Solar", "Extinct", "Galactic"];
            return scientific;
    }
}

//Return the specialized list of nouns matching the provided noun category
function getNoun(y) {
    switch (y) {
        case "animals":
            var animals = ["Flamingo", "Hedgehog", "Owl", "Elephant", "Pussycat", "Alligator", "Dachsund", "Poodle", "Beagle", "Crocodile", "Kangaroo", "Wallaby", "Woodpecker", "Eagle", "Falcon", "Canary", "Parrot", "Parakeet", "Hamster", "Gerbil", "Squirrel", "Rat", "Dove", "Toucan", "Raccoon", "Vulture", "Peacock", "Goldfish", "Rook", "Koala", "Skunk", "Goat", "Rooster", "Fox", "Porcupine", "Llama", "Grasshopper", "Gorilla", "Monkey", "Seahorse", "Wombat", "Wolf", "Giraffe", "Badger", "Lion", "Mouse", "Beetle", "Cricket", "Nightingale", "Hawk", "Trout", "Squid", "Octopus", "Sloth", "Snail", "Locust", "Baboon", "Lemur", "Meerkat", "Oyster", "Frog", "Toad", "Jellyfish", "Butterfly", "Caterpillar", "Tiger", "Hyena", "Zebra", "Snail", "Pig", "Weasel", "Donkey", "Penguin", "Crane", "Buzzard", "Vulture", "Rhino", "Hippopotamus", "Dolphin", "Sparrow", "Beaver", "Moose", "Minnow", "Otter", "Bat", "Mongoose", "Swan", "Firefly", "Platypus"];
            return animals;
        case "everyday":
            var everyday = ["Mirror", "Knife", "Fork", "Spork", "Spoon", "Tupperware", "Minivan", "Suburb", "Lamp", "Desk", "Stereo", "Television", "TV", "Book", "Car", "Truck", "Soda", "Door", "Video", "Game", "Computer", "Calender", "Tree", "Plant", "Flower", "Chimney", "Attic", "Kitchen", "Garden", "School", "Wallet", "Bottle"];
            return everyday;
        case "fantasy":
            var fantasy = ["Centaur", "Wizard", "Gnome", "Orc", "Troll", "Sword", "Fairy", "Pegasus", "Halfling", "Elf", "Changeling", "Ghost", "Knight", "Squire", "Magician", "Witch", "Warlock", "Unicorn", "Dragon", "Wyvern", "Princess", "Prince", "King", "Queen", "Jester", "Tower", "Castle", "Kraken", "Seamonster", "Mermaid", "Psychic", "Seer", "Oracle"];
            return fantasy;
        case "gross":
            var gross = ["Slime", "Bug", "Roach", "Fluid", "Pus", "Booger", "Spit", "Boil", "Blister", "Orifice", "Secretion", "Mucus", "Phlegm", "Centipede", "Beetle", "Fart", "Snot", "Crevice", "Flatulence", "Juice", "Mold", "Mildew", "Germs", "Discharge", "Toilet", "Udder", "Odor", "Substance", "Fluid", "Moisture", "Garbage", "Trash", "Bug"];
            return gross;
        case "horror":
            var horror = ["Murderer", "Chainsaw", "Knife", "Sword", "Murder", "Devil", "Killer", "Psycho", "Ghost", "Monster", "Godzilla", "Werewolf", "Vampire", "Demon", "Graveyard", "Zombie", "Mummy", "Curse", "Death", "Grave", "Tomb", "Beast", "Nightmare", "Frankenstein", "Specter", "Poltergeist", "Wraith", "Corpse", "Scream", "Massacre", "Cannibal", "Skull", "Bones", "Undertaker", "Zombie", "Creature", "Mask", "Psychopath", "Fiend", "Satanist", "Moon", "FullMoon"];
            return horror;
        case "jewelry":
            var jewelry = ["Earrings", "Ring", "Necklace", "Pendant", "Choker", "Brooch", "Bracelet", "Cameo", "Charm", "Bauble", "Trinket", "Jewelry", "Anklet", "Bangle", "Locket", "Finery", "Crown", "Tiara", "BlingBling", "Chain", "Rosary", "Jewel", "Gemstone", "Beads", "Armband", "Pin", "Costume", "Ornament", "Treasure"];
            return jewelry;
        case "music":
            var music = ["Violin", "Flute", "Bagpipe", "Guitar", "Symphony", "Orchestra", "Piano", "Trombone", "Tuba", "Opera", "Drums", "Harpsichord", "Harp", "Harmonica", "Accordion", "Tenor", "Soprano", "Baritone", "Cello", "Viola", "Piccolo", "Ukelele", "Woodwind", "Saxophone", "Bugle", "Trumpet", "Sousaphone", "Cornet", "Stradivarius", "Marimbas", "Bells", "Timpani", "Bongos", "Clarinet", "Recorder", "Oboe", "Conductor", "Singer"];
            return music;
        case "places":
            var places = ["Swamp", "Graveyard", "Cemetery", "Park", "Building", "House", "River", "Ocean", "Sea", "Field", "Forest", "Woods", "Neighborhood", "City", "Town", "Suburb", "Country", "Meadow", "Cliffs", "Lake", "Stream", "Creek", "School", "College", "University", "Library", "Bakery", "Shop", "Store", "Theater", "Garden", "Canyon", "Highway", "Restaurant", "Cafe", "Diner", "Street", "Road", "Freeway", "Alley"];
            return places;
        case "profession":
            var professions = ["Doctor", "Lawyer", "Ninja", "Writer", "Samurai", "Surgeon", "Clerk", "Artist", "Actor", "Engineer", "Mechanic", "Comedian", "Fireman", "Nurse", "RockStar", "Musician", "Carpenter", "Plumber", "Cashier", "Electrician", "Waiter", "President", "Governor", "Senator", "Scientist", "Programmer", "Singer", "Dancer", "Director", "Mayor", "Merchant", "Detective", "Investigator", "Navigator", "Pilot", "Priest", "Cowboy", "Stagehand", "Soldier", "Ambassador", "Pirate", "Miner", "Police"];
            return professions;
        case "scifi":
            var scifi = ["Robot", "Alien", "Raygun", "Spaceship", "UFO", "Rocket", "Phaser", "Astronaut", "Spaceman", "Planet", "Star", "Galaxy", "Computer", "Future", "TimeMachine", "WormHole", "TimeTraveler", "Scientist", "Invention", "Martian", "Pluto", "Jupiter", "Saturn", "Mars", "Quasar", "BlackHole", "WarpDrive", "Laser", "Orbit", "Gears", "Molecule", "Electron", "Neutrino", "Proton", "Experiment", "Photon", "Apparatus", "Universe", "Gravity", "DarkMatter", "Constellation", "Circuit", "Asteroid"];
            return scifi;
        default:
            var scifi = ["Robot", "Alien", "Raygun", "Spaceship", "UFO", "Rocket", "Phaser", "Astronaut", "Spaceman", "Planet", "Star", "Galaxy", "Computer", "Future", "TimeMachine", "WormHole", "TimeTraveler", "Scientist", "Invention", "Martian", "Pluto", "Jupiter", "Saturn", "Mars", "Quasar", "BlackHole", "WarpDrive", "Laser", "Orbit", "Gears", "Molecule", "Electron", "Neutrino", "Proton", "Experiment", "Photon", "Apparatus", "Universe", "Gravity", "DarkMatter", "Constellation", "Circuit", "Asteroid"];
            return scifi;
    };
};

//Adjective Categories List
var adjectiveCategories = ["dark", "color", "whimsical", "shiny", "noise", "apocalyptic", "insulting", "praise", "scientific"]; // types of adjectives for pizza titles
var adjCategoryLength = adjectiveCategories.length;
//Noun Categories List
var nounCategories = ["animals", "everyday", "fantasy", "gross", "horror", "jewelry", "places", "scifi"]; // types of nouns for pizza titles
var nounCategoryLength = nounCategories.length;

//Use random math to calc indexes which will determine a unique Adjective and Noun category.
//Then return a list of adjectives and nouns for each category.
//Finally, use random math to calculate indexes into each list to come up with a unique pizza name.
function generatePizzaName() { //adjCategory, nounCategory) {
    var adjectivesList = getAdj(adjectiveCategories[Math.floor(Math.random() * adjCategoryLength)]);
    var nounsList = getNoun(nounCategories[Math.floor(Math.random() * nounCategoryLength)]);

    var randomAdjective = adjectivesList[Math.floor(Math.random() * adjectivesList.length)];

    var randomNoun = nounsList[Math.floor(Math.random() * nounsList.length)];

    return "The " + randomAdjective + " " + randomNoun;
};


var meatIngredientsLength = pizzaIngredients.meats.length;
var nonMeatsIngredientsLength = pizzaIngredients.nonMeats.length;
var cheesesIngredientsLength = pizzaIngredients.cheeses.length;
var saucesIngredientsLength = pizzaIngredients.sauces.length;
var crustsIngredientsLength = pizzaIngredients.crusts.length;

//Use random math calc to determine random indexes to the meat, non-meat, cheese, and sauce arrays.
//Build an unordered list DOM element that contains small subsets from these arrays.
var makeRandomPizza = function () {
    var pizza = "";
    var numberOfMeats = Math.floor((Math.random() * 4));
    var numberOfNonMeats = Math.floor((Math.random() * 3));
    var numberOfCheeses = Math.floor((Math.random() * 2));

    for (var i = 0; i < numberOfMeats; i++) {
        var meatIx = Math.floor((Math.random() * meatIngredientsLength));
        pizza = pizza + "<li>" + pizzaIngredients.meats[meatIx] + "</li>";
    }

    for (var i = 0; i < numberOfNonMeats; i++) {
        var nonMeatIx = Math.floor((Math.random() * nonMeatsIngredientsLength));
        pizza = pizza + "<li>" + pizzaIngredients.nonMeats[nonMeatIx] + "</li>";
    }

    for (var i = 0; i < numberOfCheeses; i++) {
        var cheeseIx = Math.floor((Math.random() * cheesesIngredientsLength));
        pizza = pizza + "<li>" + pizzaIngredients.cheeses[cheeseIx] + "</li>";
    }

    var sauceIx = Math.floor((Math.random() * saucesIngredientsLength));
    pizza = pizza + "<li>" + pizzaIngredients.sauces[sauceIx] + "</li>";

    var crustIx = Math.floor((Math.random() * crustsIngredientsLength));
    pizza = pizza + "<li>" + pizzaIngredients.crusts[crustIx] + "</li>";

    return pizza;
}

// Create a new div element / pizza container.
// Insert into the container both the pizza image and the random name and ingredients.
var pizzaElementGenerator = function (i) {
    var pizzaContainer, // contains pizza title, image and list of ingredients
    pizzaImageContainer, // contains the pizza image
    pizzaImage, // the pizza image itself
    pizzaDescriptionContainer, // contains the pizza title and list of ingredients
    pizzaName, // the pizza name itself
    ul; // the list of ingredients
    pizzaContainer = document.createElement("div"); //New pizza container
    pizzaImageContainer = document.createElement("div"); 
    pizzaImage = document.createElement("img"); //New image element
    pizzaDescriptionContainer = document.createElement("div");
    pizzaContainer.classList.add("randomPizzaContainer"); //Add class name
    pizzaContainer.style.width = "33.33%";  //Define CSS style
    pizzaContainer.style.height = "325px";
    pizzaContainer.id = "pizza" + i; // gives each pizza element a unique id
    pizzaImageContainer.classList.add("col-md-6"); //Bootstrap setting
    pizzaImage.src = "images/pizza.png"; //Image URL
    pizzaImage.classList.add("img-responsive"); //Make image web responsive

    pizzaImageContainer.appendChild(pizzaImage); //Append to containers
    pizzaContainer.appendChild(pizzaImageContainer);
    pizzaDescriptionContainer.classList.add("col-md-6");
    pizzaName = document.createElement("h4");

    pizzaName.innerHTML = generatePizzaName(); //Call fxn to randomly generate a pizza name
    pizzaDescriptionContainer.appendChild(pizzaName);
    ul = document.createElement("ul");
    ul.innerHTML = makeRandomPizza(); //Call fxn to randomly generate a list of ingredients
    pizzaDescriptionContainer.appendChild(ul);
    pizzaContainer.appendChild(pizzaDescriptionContainer);
    return pizzaContainer;
}

// Event Handler for the sizeSlider html control on pizza.html
// Alter the size of the pizza icons in the "Our Pizzas" section 
// to either small, medium, large. 
var resizePizzas = function (size) {
    window.performance.mark("mark_start_resize"); // User Timing API function
 
    // Changes the value for the size of the pizza above the slider, and set the new size percentage
    var newsize = 0;
    switch (size) {
        case "1":
                document.getElementById("pizzaSize").innerHTML = "Small";
                newsize = 0.25; //small percentage
                break;
        case "2":
                document.getElementById("pizzaSize").innerHTML = "Medium";
                newsize = 0.3333; //med percent
                break;
        case "3":
                document.getElementById("pizzaSize").innerHTML = "Large";
                newsize = 0.5; //large percent
                break;
        default:
                console.log("bug in sizeSwitcher"); //Exception!
    }

    //Get all elements with classname "randomPizzaContainer"
    var pzContainers = document.getElementsByClassName("randomPizzaContainer");
    var windowwidth = document.getElementById("randomPizzas").offsetWidth;
    var newWidth = 0;
    //Loop through each container and reset the container width to new adjusted size.
    for (var i = 0; i < pzContainers.length; i++) {
        if (i === 0){ //The new size is the same for all so do calculation only once!
            var elem_offsetWidth = pzContainers[i].offsetWidth; //current width
            var dx = (newsize - (elem_offsetWidth / windowwidth)) * windowwidth;
            var newWidth = (elem_offsetWidth + dx) + 'px';
        }
        pzContainers[i].style.width = newWidth;
    }

    // User Timing API is awesome
    window.performance.mark("mark_end_resize");
    window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
    var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
    console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
}

window.performance.mark("mark_start_generating"); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads
var pizzasDiv = document.getElementById("randomPizzas");
for (var i = 2; i < 100; i++) { //Create 98 additional random pizza's
    pizzasDiv.appendChild(pizzaElementGenerator(i)); //Add to the randomPizzas div container
}

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;


// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html
// Moves the sliding background pizzas based on scroll position
function updatePositions() {
    frame++;
    window.performance.mark("mark_start_frame"); //Timing API marking

    var items = document.getElementsByClassName("mover"); //Find all the 
    var itemsLength = items.length;
    var value1 = document.body.scrollTop / 1250;

    for (var i = 0; i < itemsLength; i++) {
        var phase = Math.sin((value1) + (i % 5));
        items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
   }

    // User Timing API to the rescue again. Seriously, it's worth learning.
    // Super easy to create custom metrics.
    window.performance.mark("mark_end_frame");
    window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
    if (frame % 10 === 0) { //After 10 frames, mark, measure, and display result to console
        var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");

        //Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll 
        var numberOfEntries = timesToUpdatePosition.length;
        var sum = 0;
        for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
            sum = sum + timesToUpdatePosition[i].duration; //Get the total sum
        }
        console.log("Average time to generate last 10 frames: " + sum / 10 + "ms"); //display average
    }
}

// EVENT LISTENER - call the updatePositions on scroll
window.addEventListener('scroll', updatePositions);

// EVENT LISTENER - call this inline function after the DOM is loaded.
// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function () {
    var cols = 8;  // Create a rows or eight pizza's max
    var s = 256;

    var movingPizzasElem = document.getElementById("movingPizzas1"); //Find the element div section

    for (var i = 0; i < 32; i++) {  //Create a total of 32 pizzas (ie 8 pizzas on 4 rows)
                                    //This fills up the entire page above the scroll line
        var elem = document.createElement('img');
        elem.className = 'mover';   //The class name for all the pizzas created
        elem.src = "images/pizza.png";
        elem.style.height = "100px";
        elem.style.width = "73.333px";
        elem.basicLeft = (i % cols) * s; //Determine the X horizontal axis position (col)
        elem.style.top = (Math.floor(i / cols) * s) + 'px'; //Determine the Y vertical position (row)
        movingPizzasElem.appendChild(elem); //append to the movingPizzas1 div 
    }

    updatePositions(); //Call fxn that positions each pizza on the horizontal X axis / row
});
