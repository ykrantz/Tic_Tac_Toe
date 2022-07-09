// ++++++++++++++++++++++++
// content:
// 10: defining main variable and structre
// 20: Main
// 30: Primery Functions
//  31: Event Functions
// 40: Suport Functions
// 50: Side functions
// 55: help functions
//  56: style set Functions
// 60: Validation Functions
// ++++++++++++++++++++++
//

// **********
// Level 10: defining main variable and structre
// **********
let eror_log = [];
let moves_arr = [];
let num_of_rows = 3;
let game_array_baord = [];
let num_of_turns = 0;

let players = ["Player A", "Player B"];
let current_player = 0;
let numbers_of_players = 2;

let timer_seconds = 0;
let $span_timer = document.getElementById("span_timer");

let timer_interval = "";

// **********
// Level 20: Main
// **********

const $board = document.getElementById("div_board");
const $main_buttons_div = document.getElementById("main_buttons_div");
const $span_main_messege = document.getElementById("span_main_messege");
const $span_player_name = document.getElementById("span_player_name");
const $span_secondery_messege = document.getElementById(
  "span_secondery_messege"
);

$board.addEventListener("click", click_on_cell);

set_buttons();
set_number_of_rows_buttton();
reset_game();
show_current_player_in_span();

// if want to define name in satrt of game.
//  so define alsotimeout so the board will load before prompt
// by defult, there is name of player a and player b

// setTimeout(() => {
//   get_players_names();
// }, 500);
// players.push(player);

// **********
// Level 30: Primery Functions
// **********

function set_number_of_rows_buttton() {
  const $input_number_of_rows = document.createElement("INPUT");
  $input_number_of_rows.type = "number";
  $input_number_of_rows.min = 3;
  $input_number_of_rows.max = 10;
  $input_number_of_rows.value = 3;
  $input_number_of_rows.id = "input_number_of_rows";

  const $div_number_of_rows = document.getElementById("div_number_of_rows");
  $div_number_of_rows.append($input_number_of_rows);

  let $button_number_of_rows = document.createElement("BUTTON");
  $button_number_of_rows.innerHTML = "Change number of rows/columns";
  $button_number_of_rows.className = "main_buttons changeRowsButton";
  $button_number_of_rows.style.backgroundColor = "cadetblue";
  $button_number_of_rows.addEventListener("click", change_row_on_board);

  $div_number_of_rows.append($button_number_of_rows);
}
function set_buttons() {
  const $div1 = document.createElement("div1");

  const $reset_game = document.createElement("button");
  $reset_game.innerHTML = "reset game";
  $reset_game.style.backgroundColor = "yellow";
  $reset_game.className = "main_buttons";
  $reset_game.addEventListener("click", reset_game);
  $div1.append($reset_game);

  const $delete_last_move = document.createElement("button");
  $delete_last_move.innerHTML = "delete last move";
  $delete_last_move.style.backgroundColor = "pink";
  $delete_last_move.id = "delete_last_move";
  // $delete_last_move.style.display = "inline";
  $delete_last_move.className = "main_buttons";
  $delete_last_move.addEventListener("click", delete_last_move);
  $div1.append($delete_last_move);
  $div1.className = "class_buttons";

  const $div_playres = document.getElementById("div_playres");

  const $change_players_name = document.createElement("button");
  $change_players_name.innerHTML = "change players name";
  $change_players_name.style.backgroundColor = "darkgoldenrod";
  $change_players_name.className = "main_buttons";
  $change_players_name.addEventListener("click", change_players_name);

  $div_playres.append($change_players_name);
  $div_playres.className = "class_buttons";

  const $div3 = document.createElement("div2");
  const $show_highest_score = document.createElement("button");
  $show_highest_score.innerHTML = "show highest score";
  $show_highest_score.style.backgroundColor = "cadetblue";
  $show_highest_score.className = "main_buttons";
  $show_highest_score.addEventListener("click", show_highest_score);
  $div3.append($show_highest_score);

  const $reset_highest_score = document.createElement("button");
  $reset_highest_score.innerHTML = "reset highest score";
  $reset_highest_score.className = "main_buttons";
  $reset_highest_score.addEventListener("click", reset_highest_score);
  $div3.append($reset_highest_score);
  $div3.className = "class_buttons";

  const $div4 = document.createElement("div4");
  const $save_game = document.createElement("button");
  $save_game.innerHTML = "save game";
  $save_game.style.backgroundColor = "cyan";
  $save_game.className = "main_buttons";
  $save_game.addEventListener("click", save_game);

  $div4.append($save_game);

  const $load_game = document.createElement("button");
  $load_game.innerHTML = "load game";
  $load_game.style.backgroundColor = "coral";
  $load_game.className = "main_buttons";
  $load_game.addEventListener("click", load_game);
  $div4.append($load_game);
  $div4.className = "class_buttons";

  $main_buttons_div.append($div1, $div3, $div4);
}

function create_game_array_baord(num_of_rows) {
  game_array_baord = [];
  for (i = 0; i < num_of_rows; i++) {
    let temp_row_array = [];
    for (j = 0; j < num_of_rows; j++) {
      temp_row_array.push("");
    }
    game_array_baord.push(temp_row_array);
  }
}

function set_board_of_cells() {
  clear_elements_from_div("div_board");
  game_array_baord.forEach((row, idx_row) => {
    let $div_row_on_board = document.createElement("div");
    $div_row_on_board.id = `row_${idx_row}`;
    $div_row_on_board.dataset.row = idx_row;
    $div_row_on_board.style.display = "flex";
    row.forEach((v, idx_column) => {
      let $cell_on_board = document.createElement("button");
      $cell_on_board.className = "cells";
      $cell_on_board.innerHTML = v;
      $cell_on_board.id = `row_${idx_row}_column_${idx_column}`;
      $cell_on_board.dataset.row = idx_row;
      $cell_on_board.dataset.column = idx_column;

      $div_row_on_board.append($cell_on_board);
    });
    document.getElementById("div_board").append($div_row_on_board);
  });
}

// **********
// Level 31: Event Functions
// **********
function get_players_names() {
  players = [];
  for (i = 0; i < 2; i++) {
    let player = get_string(`your name player number ${i + 1}:`);
    players.push(player);
    show_current_player_in_span();
  }
}
function change_row_on_board() {
  if (num_of_rows != document.getElementById("input_number_of_rows").value) {
    alert(`Board will reset and change to ${num_of_rows} rows/columns`);
    num_of_rows = document.getElementById("input_number_of_rows").value;
    reset_game();
  } else {
    alert(
      `Board already has ${num_of_rows}  rows/columns.\n if you want to change it please change the number with the arrows `
    );
  }
}

function delete_last_move() {
  let last_cell_preesed = moves_arr.pop();

  reset_cell_value_and_text(last_cell_preesed[0], last_cell_preesed[1]);
  num_of_turns--;
  current_player = calcuate_current_player();
  show_current_player_in_span();

  console.log(current_player);
  if (moves_arr.length == 0) {
    change_ability_to_delete_last_move(false);
  }
}

function show_highest_score() {
  if (get_local_highest_score() != Infinity) {
    alert(`The heighest score is: ${get_local_highest_score()} turns`);
  } else {
    alert("No score yet");
  }
}
function reset_highest_score() {
  if (localStorage.local_highest_score) {
    alert(`The score : ${localStorage.local_highest_score}  was reset`);
    localStorage.local_highest_score = "";
  } else {
    alert("No score yer to reset");
  }
}

function save_game() {
  localStorage.saved_game = JSON.stringify([
    game_array_baord,
    players,
    num_of_turns,
    moves_arr,
    timer_seconds,
  ]);
  alert("Game was saved");
}
function load_game() {
  if (!localStorage.saved_game) {
    alert("No game was saved");
    return;
  }
  let last_game = JSON.parse(localStorage.saved_game);

  game_array_baord = last_game[0];
  players = last_game[1];
  num_of_turns = last_game[2];
  moves_arr = last_game[3];
  timer_seconds = last_game[4];
  // $span_main_messege.innerHTML = "Welcome to game";
  $span_main_messege.innerHTML = "";
  $span_main_messege.style.color = "black";
  show_current_player_in_span();
  set_board_of_cells();
  alert("Game was loaded");
}

function reset_game() {
  num_of_turns = 0;
  current_player = 0;
  // in the first turn can;t delete last move. after presing cells it wil be eneble
  change_ability_to_delete_last_move(false);
  $span_main_messege.innerHTML = "";
  // $span_main_messege.innerHTML = "Welcome to game";
  $span_main_messege.style.color = "black";
  $span_secondery_messege.innerHTML = "";
  $span_secondery_messege.style.color = "black";
  create_game_array_baord(num_of_rows);

  // players.push(aleret);
  show_current_player_in_span();
  set_board_of_cells();

  clearInterval(timer_interval);
  reset_timer();
}

function change_players_name() {
  get_players_names();
  reset_game();
}

function click_on_cell(ev) {
  let $button_clicked = ev.target;
  try {
    if ($button_clicked.tagName != "BUTTON")
      throw "you didn't press a spesific button";
    if ($button_clicked.innerHTML != "")
      throw "You can't click twice on the same cell";
  } catch (err) {
    console.log(err);
    eror_log.push([err, "press eror"]);
    return false;
  }

  num_of_turns++;
  change_ability_to_delete_last_move(true);
  moves_arr.push([
    Number($button_clicked.dataset.row),
    Number($button_clicked.dataset.column),
  ]);
  if (num_of_turns % 2 == 1) {
    $button_clicked.innerHTML = "X";
    game_array_baord[$button_clicked.dataset.row][
      $button_clicked.dataset.column
    ] = "X";
  } else {
    $button_clicked.innerHTML = "O";
    game_array_baord[$button_clicked.dataset.row][
      $button_clicked.dataset.column
    ] = "O";
  }
  let was_a_winner = false;
  if (num_of_turns > 2) {
    was_a_winner = check_if_win_game();

    if (was_a_winner) {
      $span_main_messege.innerHTML = `The winner is: ${players[current_player]}`;
      if (update_score_if_neccecery()) {
        $span_secondery_messege.innerHTML = `\nCongratulation <b> ${players[current_player]} </b>. You made a new record. Your record is:<b> ${num_of_turns}  turns </b>`;
      }
      $span_main_messege.style.color = "blue";
      $span_secondery_messege.style.color = "darkmagenta";

      clearInterval(timer_interval);

      game_was_finished();
      return;
    } else {
      if (check_if_game_finished()) {
        $span_main_messege.innerHTML = "Game over!";
        change_ability_to_press_cells(false);
        change_ability_to_delete_last_move(false);
        clearInterval(timer_interval);

        game_was_finished();
        return;
      }
    }
  }

  current_player = calcuate_current_player();

  show_current_player_in_span();
}

// **********
// Level 40: Suport Functions
// **********

function game_was_finished() {
  setTimeout(() => {
    let ans = confirm("Game finised. Do you want to play again?");
    if (ans) {
      reset_game();
    }
  }, 100);
}
function reset_timer() {
  timer_interval = setInterval(() => {
    $span_timer.innerHTML = `<b>Timer:</b> <br/>${timer_seconds}  (sec)`;
    timer_seconds++;
  }, 1000);
  timer_seconds = 0;
}

function reset_cell_value_and_text(row, column) {
  game_array_baord[row][column] = "";
  console.log(row, column);
  document.getElementById(`row_${row}_column_${column}`).innerHTML = "";
}

function clear_elements_from_div(id_to_clear) {
  id_to_clear = document.getElementById(id_to_clear);
  while (id_to_clear.firstChild) {
    id_to_clear.removeChild(id_to_clear.firstChild);
  }
}

function show_current_player_in_span() {
  if (players.length > 0) {
    $span_player_name.innerHTML = `<b>Player ${current_player + 1} turn:</b> ${
      players[current_player]
    }`;
  } else {
    $span_player_name.innerHTML = `<b>Player turn:</b>`;
  }
}
// **********
// Level 50: Side functions
// **********

function update_score_if_neccecery() {
  if (num_of_turns < get_local_highest_score()) {
    update_local_highest_score(num_of_turns);
    return true;
  } else {
    return false;
  }
}

function get_local_highest_score() {
  if (localStorage.local_highest_score) {
    return JSON.parse(localStorage.local_highest_score);
  } else {
    return Infinity;
  }
}

function update_local_highest_score(score_to_update) {
  localStorage.local_highest_score = JSON.stringify(score_to_update);
}

let flag_if_some_won = false;
function check_if_win_game() {
  flag_if_some_won = false;
  check_if_row_win();
  check_if_column_win();
  check_if_diagonal_right_won();
  check_if_diagonal_left_won();

  if (flag_if_some_won) {
    change_ability_to_press_cells(false);
    change_ability_to_delete_last_move(false);
  }
  return flag_if_some_won;
}

function check_if_game_finished() {
  return num_of_turns == num_of_rows ** 2;
}
function calcuate_current_player() {
  return num_of_turns % numbers_of_players;
}
// **********
// Level 55: help functions
// **********
function check_if_row_win() {
  for (row of game_array_baord) {
    let falg_win = true;
    let value_to_comper = row[0];
    if (value_to_comper == "") {
      continue;
    }

    for (cell of row) {
      falg_win &= value_to_comper == cell;
    }
    if (falg_win) {
      console.log("WIN row");

      let row_won = game_array_baord.indexOf(row);
      for (idx in game_array_baord[row_won]) {
        set_style_for_win_cells(row_won, idx);
      }
      flag_if_some_won ||= true;
      return true;
    }
  }
  return false;
}

function check_if_column_win() {
  for (let column = 0; column < num_of_rows; column++) {
    let falg_win = true;
    let value_to_comper = game_array_baord[0][column];
    if (value_to_comper == "") {
      continue;
    }

    for (row of game_array_baord) {
      falg_win &= value_to_comper == row[column];
    }
    if (falg_win) {
      console.log("WIN column");
      let column_won = column;
      for (idx in game_array_baord) {
        set_style_for_win_cells(idx, column);
      }
      flag_if_some_won ||= true;
      return true;
    }
  }
  return false;
}

function check_if_diagonal_right_won() {
  let falg_win = true;
  let value_to_comper = game_array_baord[0][0];
  if (value_to_comper == "") {
    return false;
  }
  for (row in game_array_baord) {
    falg_win &= value_to_comper == game_array_baord[row][row];
  }
  if (falg_win) {
    console.log("WIN diagonal_right");
    for (row in game_array_baord) {
      set_style_for_win_cells(row, row);
    }
    flag_if_some_won ||= true;
    return true;
  }
  return false;
}

function check_if_diagonal_left_won() {
  let falg_win = true;

  let value_to_comper = game_array_baord[0][num_of_rows - 1];
  if (value_to_comper == "") {
    return false;
  }
  for (row in game_array_baord) {
    falg_win &= value_to_comper == game_array_baord[row][num_of_rows - 1 - row];
  }
  if (falg_win) {
    console.log("WIN diagonal_left");
    for (row in game_array_baord) {
      set_style_for_win_cells(row, num_of_rows - 1 - row);
    }
    flag_if_some_won ||= true;
    return true;
  }
  return false;
}

// **********
// Level 56: style set Functions
// **********
function set_style_for_win_cells(row_index, column_index) {
  let btn_to_style = document.getElementById(
    `row_${row_index}_column_${column_index}`
  );

  btn_to_style.className = "winning_cells";
}

function change_ability_to_press_cells(flag_enabling = true) {
  let cells_to_modify = document.getElementsByClassName("cells");

  if (flag_enabling) {
    for (cell of cells_to_modify) {
      cell.disabled = false;
    }
  } else {
    for (cell of cells_to_modify) {
      cell.disabled = true;
    }
  }
}

function change_ability_to_delete_last_move(flag_enabling = true) {
  let $delete_last_move = document.getElementById("delete_last_move");

  if (flag_enabling) {
    $delete_last_move.disabled = false;
  } else {
    $delete_last_move.disabled = true;
  }
}

// **********
// Level 60: Validation  and prompt Functions
// *********

function get_string(str_type) {
  let str = "";
  let flag = true;
  do {
    str = prompt(
      `${
        flag !== true ? `Eror: ` + flag + `` + "\n\n" : ""
      } Please enter ${str_type}`
    );
    flag = check_valid_string(str);
  } while (flag !== true);
  return str;
}

function check_valid_string(str) {
  try {
    if (String(str).trim() == "" || str == null || str == undefined)
      throw "empty";
    if (String(str).search(/\d/) >= 0) throw "contain a number";
    // only letters or space allowed
    if (String(str).search(/^[a-zA-Z ]+$/) < 0)
      throw "contain char that isn't an english letter";
    if (String(str).length > 20) throw "string more than 20 char";
  } catch (err) {
    console.log(err);
    eror_log.push([err, "string eror"]);
    // return false;
    return err;
  }
  return true;
}
