// this is a comment
/*
This is a multi-line comment
We'll be simulating our full scale project on the console for now
*/
console.log("Welcome to your first mini project!");

const app_name = "Bronks App"; // constant string value

console.log("Project Name:", app_name); // console printing

// creating variables
let user_name = "BiggyTiggy" //string
let user_pass = "password123" 
let isAdmin = true; // boolean value
let user_age = 25; // number value

// input html elements for conditional checking we'll call it var for now
let user_username_input = "BiggyTiggy";
let user_password_input = "password123";

// creating an object to store user data
let user_data = {
    username: user_name,
    password: user_pass,
    isAdmin: isAdmin,
};
user_data.age = user_age; // adding new key value pair to object


console.log("User Data:", user_data);
// conditional checking
if(user_password_input === user_data.password && user_username_input === user_data.username){ 
    // other conditional joins would be || (OR) and ! (NOT)
    console.log("Login Successful! Welcome", user_data.username);
}
else if(user_password_input !== user_data.password && user_username_input === user_data.username){
    console.log("Login Failed! Incorrect Password");
}
else{
    console.log("Login Failed! User Not Found");
}


user_stock = ["AAPL", "GOOGL", "MSFT", "AMZN"]; // array of stocks
user_data.ownedStocks = user_stock; // adding array to object
user_data["ownedStocks"] = user_stock; // another way to add array to object

// printing user owned stocks
console.log("User Owned Stocks:", user_data.ownedStocks); 

available_stocks = [{ // in a real world scenario this is a database
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 150.00,
    isAvailable: true
},
{
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2800.00,
    isAvailable: true
},
{
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 299.00,
    isAvailable: true
},
{
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 3500.00,
    isAvailable: true
},
{
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 700.00,
    isAvailable: true
}, 
{
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 330.00,
    isAvailable: true
},
{
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 590.00,
    isAvailable: true
}];
// function to get user stocks details from available stocks
function getUserStocksOld(user,available_stocks){
    let stocks = []
    user.ownedStocks.forEach(stock => { // foreach loop
        for(let i=0; i<available_stocks.length; i++){ // for loop
            if(available_stocks[i].symbol === stock){
                stocks.push(available_stocks[i]);
            }   
        }
    });
    return stocks;
}

console.log("User Stocks Details:", getUserStocksOld(user_data,available_stocks));

// using set to store unique stocks
user_stock = new Set(["AAPL", "GOOGL", "MSFT", "AMZN"]); // set of stocks
console.log("User Owned Stocks:", user_data.ownedStocks); // notice that this is still an array not a set
user_data.ownedStocks = user_stock;
console.log("User Owned Stocks:", user_data.ownedStocks); // notice that this is now a set

available_stocks = {
    "AAPL": {
    name: "Apple Inc.",
    price: 150.00,
    isAvailable: true
},
"GOOGL": {
    name: "Alphabet Inc.",
    price: 2800.00,
    isAvailable: true
},  
"MSFT": {
    name: "Microsoft Corporation",
    price: 299.00,
    isAvailable: true
},
"AMZN": {
    name: "Amazon.com Inc.",
    price: 3500.00,
    isAvailable: true
},
"TSLA": {
    name: "Tesla Inc.",
    price: 700.00,
    isAvailable: true
}, 
"META": {
    name: "Meta Platforms Inc.",
    price: 330.00,
    isAvailable: true
},
"NFLX": {
    name: "Netflix Inc.",
    price: 590.00,
    isAvailable: true
}};

function getUserStocks(user,available_stocks){
    let stocks = [];
    user.ownedStocks.forEach(stock => {
        if (available_stocks[stock] !== undefined){ // checking if stock exists in available_stocks
            stocks.push(available_stocks[stock]); // spread operator to merge objects
        }
    });
    return stocks;
}
// objects are reference types so we can modify them directly
function alterUserStock(user, stockSymbol, add=true){ // default value of add is set to true
    if (add) {
        user.ownedStocks.add(stockSymbol);
    } else {
        user.ownedStocks.delete(stockSymbol);
    }
}

alterUserStock(user_data, "TSLA");
alterUserStock(user_data, "AAPL", false);

console.log("User Stocks Details:", getUserStocks(user_data,available_stocks));

// since both alterUserStock and getUser stocks both deal with the user object, we can create a class to handle it
class User {
    // constructor to initialize user object is ran when new object is created
    constructor(data) {
        this.ownedStocks = new Set(data);
    }
    //methods are simialr to functions but they are attatched to objects
    getStocks(available_stocks){
        let stocks = [];
        this.ownedStocks.forEach(stock => {
            if (available_stocks[stock] !== undefined){ // checking if stock exists in available_stocks
                stocks.push(available_stocks[stock]); // spread operator to merge objects
            }
        });
        return stocks;
    }

    alterStock(stockSymbol, add=true){ // default value of add is set to true
        if (add) {
            this.ownedStocks.add(stockSymbol);
        } else {
            this.ownedStocks.delete(stockSymbol);
        }
    }
}

let user1 = new User(["AAPL", "GOOGL", "MSFT", "AMZN"]); // creating new user object
console.log("User1 Stocks Details:", user1.getStocks(available_stocks));
user1.alterStock("TSLA");
user1.alterStock("AAPL", false);
console.log("User1 Stocks Details:", user1.getStocks(available_stocks));

//objects are reusable so we can create multiple user objects
let user2 = new User(["META", "NFLX"]);
console.log("User2 Stocks Details:", user2.getStocks(available_stocks));
user2.alterStock("AAPL");
console.log("User2 Stocks Details:", user2.getStocks(available_stocks));