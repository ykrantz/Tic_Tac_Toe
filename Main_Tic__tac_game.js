// ++++++++++++++++++++++++
// content:
// 10: defining main variable and structre
// 20: Main
// 30: Primery Functions
// 40: Suport Functions
// 50: Side functions
// 55: help functions
// 60: Validation Functions
// +++++++++++++++++++++

// **********
// Level 10: defining main variable and structre
// **********
let eror_log = [];
let num_of_rows = 3;
let game_array_baord = [];
let num_of_turns = 0;

let players = ["a", "b"];
let current_player = 0;
let numbers_of_players = players.length;

// **********
// Level 20: Main
// **********

create_game_array_baord(num_of_rows);
const $board = document.getElementById("div_board");

show_current_player_in_span();
$board.addEventListener("click", click_on_cell);
set_board_of_cells();
// **********
// Level 30: Primery Functions
// **********
function click_on_cell(ev) {
  // TODO: fix the button theat moves down when prees
  let $button_clicked = ev.target;
  try {
    if ($button_clicked.tagName != "BUTTON")
      throw "you didn't press a spesific button";
    if ($button_clicked.innerText != "")
      throw "You can't click twice on the same cell";
  } catch (err) {
    console.log(err);
    eror_log.push([err, "press eror"]);
    return false;
  }

  num_of_turns++;
  if (num_of_turns % 2 == 1) {
    $button_clicked.innerText = "X";
    game_array_baord[$button_clicked.dataset.row][
      $button_clicked.dataset.column
    ] = "X";
  } else {
    $button_clicked.innerText = "O";
    game_array_baord[$button_clicked.dataset.row][
      $button_clicked.dataset.column
    ] = "O";
  }
  //   TODO:
  num_of_turns > 2 && check_if_win_game();

  if (check_if_game_finished()) {
    if (confirm("Game Over. No one Won\nDo you want to play another game?")) {
      reset_game();
    } else {
    }
  }
  // }
  show_current_player_in_span();
  //   } else {
  //     console.log("you didn't press a button");
  //   }
}

function create_game_array_baord(num_of_rows) {
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
      $cell_on_board.innerText = v;
      $cell_on_board.id = `row_${idx_row}_column_${idx_column}`;
      $cell_on_board.dataset.row = idx_row;
      $cell_on_board.dataset.column = idx_column;

      $div_row_on_board.append($cell_on_board);
    });
    document.getElementById("div_board").append($div_row_on_board);
  });
}
// **********
// Level 40: Suport Functions
// **********

function reset_game() {
  clear_elements_from_div("div_board");
  set_board_of_cells();
  num_of_turns = 0;
}
function clear_elements_from_div(id_to_clear) {
  id_to_clear = document.getElementById(id_to_clear);
  while (id_to_clear.firstChild) {
    id_to_clear.removeChild(id_to_clear.firstChild);
  }
}

function show_current_player_in_span() {
  document.getElementById("span_player_name").innerText = `Player turn: ${
    players[calcuate_current_player()]
  }`;
}
// **********
// Level 50: Side functions
// **********
function check_if_win_game() {
  let cells_that_won = [];
  //   check if row is the same
  //   TODO:
  check_if_row_win();
  //   TODO:
  check_if_diagonal_right_won();
  check_if_diagonal_left_won();
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
  let falg_win = true;
  //   TODO:

  for (row of game_array_baord) {
    let value_to_comper = row[0];
    if (value_to_comper == "") {
      continue;
    }

    for (cell of row) {
      falg_win &= value_to_comper == cell;
    }
    if (falg_win) {
      console.log("WIN row");
      //   TODO: fix waat to do when win .color cell
      let row_won = game_array_baord.indexOf(row);
      //   document
      //     .getElementById(`row_${row_won}_column_2`)
      //     .setAttribute("className", "winning_cells");

      //   document
      //     .getElementById(`row_${row_won}_column_2`)
      //     .setAttribute("className", "winning_cells");
      document
        .getElementById(`row_${row_won}`)
        .setAttribute("className", "winning_cells");
    }
  }
}

function check_if_diagonal_right_won() {
  let falg_win = true;
  //   TODO:
  let value_to_comper = game_array_baord[0][0];
  if (value_to_comper == "") {
    return false;
  }
  for (row in game_array_baord) {
    falg_win &= value_to_comper == game_array_baord[row][row];
  }
  if (falg_win) {
    console.log("WIN diagonal_right");
    //   TODO: what to do when win
  }
}

function check_if_diagonal_left_won() {
  let falg_win = true;
  //   TODO:

  let value_to_comper = game_array_baord[0][num_of_rows - 1];
  if (value_to_comper == "") {
    return false;
  }
  for (row in game_array_baord) {
    falg_win &= value_to_comper == game_array_baord[row][num_of_rows - 1 - row];
  }
  if (falg_win) {
    console.log("WIN diagonal_left");
    //   TODO: what to do when win
  }
}

// **********
// Level 60: Validation Functions
// **********
