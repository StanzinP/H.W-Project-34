//Create variables here
var dog, happyDog, database,foods,foodStock,lastFed,foodObject;
function preload() {
  //load images here
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}
function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  foodObject = new Food();
  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  dog = createSprite(250, 300);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}

function draw() {
  background(46, 139, 87);

  foodObject.display();
  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });
  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + (lastFed % 12) + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }

  drawSprites();
 /* textSize(20);
  fill(255, 255, 254);
  stroke("black");
  text("Food remaining : " + foods, 170, 200);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 130, 10, 300, 20);

  //add styles here
  if (keyWentDown(UP_ARROW)) {
    writeStock(foods);
    dog.addImage(happyDogImage);
  }*/
}
function readStock(data) {
  foods = data.val();
  foodObject.updateFoodStock(foods);
}

/*function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    Food: x,
  });
}
*/
function feedDog(){
  dog.addImage(happyDogImage);

  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods() {
  foods++; 
  database.ref('/').update({ Food: foods })
}