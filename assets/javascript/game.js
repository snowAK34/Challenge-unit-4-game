// For the initial setup of the game, all 4 characters are at the top of the screen and their initial values of health, attack power, and counter attack power set in their respective objects
// At the start, the player clicks on a character button- that character moves to the player-spot and the other three move to the enemies-avail group.
// When a player clicks an enemy in the enemies-avail group and there's no enemy in the defender group, that character moves to the current-enemy spot.
// If a character is in the current-enemy spot and the player clicks the attack button, defender health decreases by player AP and player's health goes down by enemy counter attack power.
// When defender health reaches zero, current-enemy spot will empty and player can click another defender to move to current-enemy to attack.
// When defender health reaches 0 and enemies-avail spot is empty, player wins
// If player health reaches 0, game ends as a loss
// restart button pops up to restart game

let isCharSelected = false;
let isDefenderSelected = false;
let playerChar;
let defender;

// Make an object for each character
let lion = {}
let snake = {}
let eagle = {}
let badger = {}

// Place characters at top of page for game start
function initialSetup() {

    // reset variables
    lion = {
        health: 150,
        basePower: 12,
        attackPower: 12,
        counterAttackPower: 20
    }
    snake = {
        health: 180,
        basePower: 16,
        attackPower: 16,
        counterAttackPower: 25
    }
    eagle = {
        health: 120,
        basePower: 8,
        attackPower: 8,
        counterAttackPower: 10
    }
    badger = {
        health: 100,
        basePower: 4,
        attackPower: 4,
        counterAttackPower: 5
    }
    $("#lion-health").text(lion.health);
    $("#snake-health").text(snake.health);
    $("#eagle-health").text(eagle.health);
    $("#badger-health").text(badger.health);
}

function mapToObject(valStr) {
    if (valStr === "lion") {
        return lion;
    }
    if (valStr === "snake") {
        return snake;
    }
    if (valStr === "eagle") {
        return eagle;
    }
    if (valStr === "badger") {
        return badger;
    }
}

// To start the game, player clicks a character to move it to empty player-spot
// Rest of characters move to enemies available
function initialRoles() {
    if (isCharSelected === false) {
        $("#lion-pic").on("click", function () {
            playerChar = mapToObject($(this).val());
            $("#lion-pic").detach().appendTo("#player-spot");
            $("#snake-pic").detach().appendTo("#enemies-avail");
            $("#eagle-pic").detach().appendTo("#enemies-avail");
            $("#badger-pic").detach().appendTo("#enemies-avail");
        });
        $("#snake-pic").on("click", function () {
            playerChar = mapToObject($(this).val());
            $("#snake-pic").detach().appendTo("#player-spot");
            $("#lion-pic").detach().appendTo("#enemies-avail");
            $("#eagle-pic").detach().appendTo("#enemies-avail");
            $("#badger-pic").detach().appendTo("#enemies-avail");
        });
        $("#eagle-pic").on("click", function () {
            playerChar = mapToObject($(this).val());
            $("#eagle-pic").detach().appendTo("#player-spot");
            $("#lion-pic").detach().appendTo("#enemies-avail");
            $("#snake-pic").detach().appendTo("#enemies-avail");
            $("#badger-pic").detach().appendTo("#enemies-avail");
        });
        $("#badger-pic").on("click", function () {
            playerChar = mapToObject($(this).val());
            $("#badger-pic").detach().appendTo("#player-spot");
            $("#lion-pic").detach().appendTo("#enemies-avail");
            $("#snake-pic").detach().appendTo("#enemies-avail");
            $("#eagle-pic").detach().appendTo("#enemies-avail");
        });
        isCharSelected = true;
    }
    if (isCharSelected === true) {
        chooseDefender();
    }
    console.log(isCharSelected);
    console.log(playerChar);
}

function chooseDefender() {
    if (isDefenderSelected === false) {
        $(".character").on("click", function () {
            defender = mapToObject($(this).val());
            $($(this).val()).detach().appendTo("#current-enemy");
        });
    }
    isDefenderSelected = true;
    fight();

    if ($("#enemies-avail").is(":empty") && ("#current-enemy").is(":empty")) {
        $("#player-spot").html("<h3>You Won!</h3>");
    }
    $("#reset").html("<button>Reset</button>");
}

function fight() {
    if (isDefenderSelected === true) {
        $("#attack").on("click", function () {
            playerChar.health = playerChar.health - defender.counterAttackPower;
            defender.health = defender.health - playerChar.attackPower;
            playerChar.attackPower = playerChar.attackPower + playerChar.basePower;
        });
    } else {
        $("#current-enemy").html("<p>No enemy here</p>");
    }
    gameEnd();
    $("#reset").html("<button>Reset</button>");
}

function gameEnd() {
    if (playerChar.health <= 0) {
        $("#player-spot").html("<h3>Game Over</h3>");
    }
    else if (defender.health <= 0) {
        $("#current-enemy").empty();
        isDefenderSelected = false;
        chooseDefender();
    }
    else {
        fight();
    }
}

initialSetup();
initialRoles();

$("#reset").on("click", function () {
    initialSetup();
    initialRoles();
});