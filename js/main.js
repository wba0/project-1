const Peach = function() {
  this.health = 1;
  this.friendly = true;
  this.imageSrc = "images/bowser.png";
  this.sound = "sounds/bowser.wav";
}
const Koopa = function() {
  this.health = 1;
  this.friendly = false;
  this.colors = ["red", "green"];
  this.color = _.sample(this.colors);
  this.imageSrc = "images/koopa-" + this.color + ".png";
  this.sound = "sounds/koopa.wav";
}

const Goomba = function() {
  this.health = 1;
  this.friendly = false;
  this.imageSrc = "images/goomba.png";
  this.sound = "sounds/goomba.wav";;
}

const Bowser = function() {
  this.health = 5;
  this.friendly = false;
  this.imageSrc = "images/bowser.png";
  this.sound = "sounds/bowser.wav";
}


// Koopa.prototype.finished = function() {
//   if(this.correctPairs === 12){
//     alert("win");
//   }
// };
//Enemy constructor


//Powerup constructor

const Mushroom = function() {
  this.health = 1;
  this.friendly = true;
  this.imageSrc = "images/mushroom.png";
  this.sound = "sounds/sound.wav";
}
//mushroom
//flower
//yoshi
//star

//array of constructor objects

koopa = new Koopa();
koopa2 = new Koopa();
koopa3 = new Koopa();
bowser = new Bowser();

const unitCollection = [koopa, koopa2, koopa3, bowser];


let gridSize = 8;
let flipSpeed = 500;
let tileImgSrc = "images/mushroom.png";


$(document).ready(function() {


  //grab dom elements
  const gameContainer = $("#game-container");
  const tileInsert = "<div class='tile'></div>";
  const rowInsert = "<div class='row game-row'></div>"


  //populate game-rows

  function addRows() {
    for (let i = 0; i < gridSize; i++) {
      $("#game-container").append(rowInsert);
    };
  }

  addRows();

  let gameRow = $(".game-row")

  //populate tiles
  function addColumns() {
    _.forEach(gameRow, function(el, index) {
      for (let i = 0; i < gridSize; i++) {
        $(el).append(tileInsert);
      }
    })
  };
  let tiles = $(".tile");

  addColumns();

  //assign column and row numbers as classes to grid
  function assignClasses() {
    _.forEach(gameRow, function(el, index) {
      let rowToAdd = ("r" + (index + 1));
      $(el).addClass(rowToAdd);
      let populatedTile = $(el).find(".tile");
      _.forEach(populatedTile, function(el, index) {
        let columnToAdd = ("c" + (index + 1));
        $(el).addClass(columnToAdd);
      });
    });
  };

  assignClasses();


  //grow gridSize
  function growGridSize(increase) {
    $("#game-container").empty();
    gridSize += increase;
    addRows();
    gameRow = $(".game-row")
    addColumns();
    tiles = $(".tile");
    assignClasses();
  };


  //counter




  //start game logic
  $("#start-button").on("click", function() {
    let points = 0;
    let flippedTiles;
    let tileCountdownArray = [];

    setInterval(function() {
      //flip tile
      const rowRandom = _.random(1, gridSize);
      const colRandom = _.random(1, gridSize);
      const tileRandom = ".r" + rowRandom + " .c" + colRandom;
      const chosenTile = $(tileRandom);
      tileCountdownArray.push(chosenTile);
      if (chosenTile.hasClass("flipped")) {
        //getting slow at end
        // return;
        //do nothing

      } else {
        chosenTile.addClass("flipped");
        const chosenUnit = _.sample(unitCollection);
        const friendly = chosenUnit.friendly;
        const chosenImg = "url('" + chosenUnit.imageSrc + "')";
        chosenTile.css("background", chosenImg);

        flippedTiles = $(".flipped");

        //update score
        $("#points").text(points);
      };

    }, flipSpeed); //setInterval end

    setInterval(function() {
      console.log(tileCountdownArray.length);
      if (tileCountdownArray.length > 3) {
        const oldestTile = _.head(tileCountdownArray);
        oldestTile.removeClass("flipped");
        oldestTile.css("background", "black");
        _.remove(tileCountdownArray, oldestTile);
        points--;
      }
    }, flipSpeed);


    //getting chaotic
    $(".tile").on("click", function() {
      console.log("flipped clicked");
      if (false) { //friendly?
        //lose game
        // else if powerup, execute modifier

      } else { //clicked on enemy
        //define this outside???
        //get target's health
        //if target's health===0
        if ($(this).hasClass("flipped")) {
          $(this).removeClass("flipped");
          $(this).css("background", "black");
          console.log(this, "enemy");
          points++;
          _.remove(tileCountdownArray, $(this));
        }
        //else target's health--
      };
    });

    //yoshi setInterval not working
    $("#yoshi-button").on("click", function() {
      let yoshi = true;
      while (yoshi) {
        for (let i = 0; i < 3; i++) {
          setInterval(function() {
            let yoshiFlip = _.sample(flippedTiles)
            $(yoshiFlip).removeClass("flipped");
            $(yoshiFlip).css("background", "green");
          }, 1000);
        };
        yoshi = false;
      }
    });


  });

});
