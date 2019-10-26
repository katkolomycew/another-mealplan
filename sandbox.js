//Selectors
var add = document.querySelector(".add");
var food = document.querySelector("#_food_");
var weight = document.querySelector("#weight");
var list = document.querySelector("#list");
var clear = document.querySelector("#clear");
var plus = document.querySelector("#plus");
//initialize array of foods and weights
myList = [];
//clear inputs
function clearInputs() {
  food.value = "";
  weight.value = "";
  measurement.value = "";
  food.focus();
}
//main function
var init = function () {
  //display clear button
  clear.style.display = "block";
  //store input values into variables
  var foodValue = food.value.trim(); /*get rid of leading and trailing spaces */
  var weightValue = Number(weight.value);
  var measurementValue = measurement.value.trim(); /*get rid of leading and trailing spaces */
  //store all values lowercase
  var foodValueLower = foodValue.toLowerCase();
  var measurementValueLower = measurementValue.toLowerCase();
  //remove white spaces to create id
  var foodId = foodValueLower.replace(/\s/g, '');
  //function to add list to display
  function addToListDisplay() {
    //span element with a foodId is added inorder to select and update when like foods are added
    list.innerHTML += "<li><span id = '" + foodId + "'> " + weightValue + "</span> " + measurementValue + " " + foodValue + "<i class='fa fa-trash'></i></li>";
  }
  //function to add item to the array
  function addToArray() {
    myList.push({
      food: foodValueLower,
      weight: weightValue,
      measurement: measurementValueLower,
      ID: foodId
    });
  }
  //update the list display on the page
  var check = myList[0];
  //check to see if array is empty. Allow for initial object to be added to the array
  if (!check) {
    addToListDisplay();
    addToArray();
    clearInputs();
    //if array already has items in it
  } else {
    var match = false;
    //search for duplicate food names
    for (var i = 0; i < myList.length; i++) {
      //if a match is found, update the quantity
      if (myList[i].food === foodValueLower && myList[i].measurement === measurementValueLower) {
        myList[i].weight += weightValue;
        document.getElementById(foodId).textContent = myList[i].weight;
        //if a match was found set match to true
        match = true;
        clearInputs();
      }
    }
    //if no match was found, add a new item to the display list and add an new object to the myList array
    if (!match) {
      addToListDisplay();
      addToArray();
      clearInputs();
    }
  }
}
//run init function when Add to List button, plus is clicked
add.addEventListener("click", init);
plus.addEventListener("click", init);
//run init function when enter key is pressed
document.addEventListener("keypress", function (e) {
  var keyPressed = e.which;
  if (keyPressed === 13) {
    init();
  }
});
//clear the list button
clear.addEventListener("click", function () {
  myList = [];
  list.innerHTML = "";
  clearInputs();
  clear.style.display = "none";
});
//remove list items from display by clicking the trashcan
document.querySelector('body').addEventListener('click', function (event) {
  if (event.target.className === 'fa fa-trash') {
    //get id of element to be removed
    var checkId = event.target.parentNode.firstChild.getAttribute('id');
    //remove item from the array
    for (var i = 0; i < myList.length; i++) {
      if (checkId === myList[i].ID) {
        myList.splice(i, 1);
      }
      //remove element from the display
      event.target.parentNode.remove();
      //put cursor back in the food input
      food.focus();
    }
  }
});