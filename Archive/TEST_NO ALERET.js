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
// +++++++++++++++++++++

// **********
// Level 10: defining main variable and structre
// **********
let eror_log = [];
let moves_arr = [];
let num_of_rows = 3;
let game_array_baord = [];
let num_of_turns = 0;

let players = ["a", "b"];
let current_player = 0;
let numbers_of_players = players.length;

// **********
// Level 20: Main
// **********

// create_new_game();

// create_game_array_baord(num_of_rows);
const $board = document.getElementById("div_board");
const $main_buttons_div = document.getElementById("main_buttons_div");
$board.addEventListener("click", click_on_cell);
// show_current_player_in_span();
// set_board_of_cells();
set_buttons();

reset_game();

// **********
// Level 30: Primery Functions
// **********
function set_buttons() {
  const $reset_game = document.createElement("button");
  $reset_game.innerHTML = "reset game";
  $reset_game.className = "main_buttons";
  $reset_game.addEventListener("click", reset_game);
  $main_buttons_div.append($reset_game);

  const $delete_last_move = document.createElement("button");
  $delete_last_move.innerHTML = "delete last move";
  $delete_last_move.className = "main_buttons";
  $delete_last_move.addEventListener("click", delete_last_move);
  $main_buttons_div.append($delete_last_move);

  const $show_highest_score = document.createElement("button");
  $show_highest_score.innerHTML = "show highest score";
  $show_highest_score.className = "main_buttons";
  $show_highest_score.addEventListener("click", show_highest_score);
  $main_buttons_div.append($show_highest_score);

  const $save_game = document.createElement("button");
  $save_game.innerHTML = "save game";
  $save_game.className = "main_buttons";
  $save_game.addEventListener("click", save_game);

  $main_buttons_div.append($save_game);

  const $load_game = document.createElement("button");
  $load_game.innerHTML = "load game";
  $load_game.className = "main_buttons";
  $load_game.addEventListener("click", load_game);
  $main_buttons_div.append($load_game);
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

function reset_game() {}

function delete_last_move() {
  // TODO:
  // debugger;
  let last_cell_preesed = moves_arr.pop();
  if (last_cell_preesed) {
    reset_cell_value_and_text(last_cell_preesed[0], last_cell_preesed[1]);
    num_of_turns--;
  } else {
    alert("There is no turn to cancel");
  }
}

function show_highest_score() {
  // TODO:
}
function save_game() {
  // TODO:
}
function load_game() {
  // TODO:
}

function reset_game() {
  num_of_turns = 0;

  create_game_array_baord(num_of_rows);

  show_current_player_in_span();
  set_board_of_cells();
}

function click_on_cell(ev) {
  // TODO: fix the button theat moves down when prees
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
  }
  if (was_a_winner) {
    alert(`The winner is: ${players[current_player]}`);
  } else {
    if (check_if_game_finished()) {
      if (confirm("Game Over. No one Won\nDo you want to play another game?")) {
        reset_game();
        return;
      }
    }
    show_current_player_in_span();
  }
}

// **********
// Level 40: Suport Functions
// **********

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
  document.getElementById("span_player_name").innerHTML = `Player turn: ${
    players[calcuate_current_player()]
  }`;
}
// **********
// Level 50: Side functions
// **********
let flag_if_some_won = false;
function check_if_win_game() {
  // TODO: optinal- to set a local win flag. so we don;t neetd to use a gllobal flag
  flag_if_some_won = false;
  check_if_row_win();
  check_if_column_win();
  check_if_diagonal_right_won();
  check_if_diagonal_left_won();

  if (flag_if_some_won) {
    change_ability_to_press_cells(false);
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

// **********
// Level 60: Validation Functions
// *********
