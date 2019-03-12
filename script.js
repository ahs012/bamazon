// Require - mySQL/Inquirer Packages
var mysql = require("mySQL");
var inquirer = require("inquirer");

// MySQL Connection Creation
var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password:"root",
    database:"bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as ID: " + connection.threadId);
    displayItems();
})
//Item Display Function >> ID, Name, and Price
function displayItems(){
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
        if(err) throw err;
        console.log("\n Item ID | Product | Price");
        console.log("---------------------------")
        for(i=0; i < res.length; i++){
            console.log(res[i].item_id + "| " + res[i].product_name + " | " + res[i].price);
        }
        cartInquire();
    })
}

// Inquirer Prompt
function cartInquire(){
    inquirer.prompt([{
        name : "id",
        type : "Input",
        message : "What Product would you like to purchase?(Use Item ID for selection)"
    },{
        name : "units",
        type : "Input",
        message : "Input desired ammount"
    }]).then(function(selection) {
        var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query,{item_id: selection.id}, function(err, res){
            if (err) throw err;
            if(res[0].stock_quantity < selection.units){
                console.log("Inusfficient Quantity!");
            }else{
                var updateStock = res[0].stock_quantity - selection.units;
                console.log("Ready for Purchase!");
                console.log(updateStock);
            }
        })
  });
}
