(function (window) {
	'use strict';
})(window); 

document.getElementById('beginGame').addEventListener('click', () => game_vs_human());

function game_vs_human() {
	let pl_1 = prompt("Введите имя 1-го игрока:");
	let pl_2 = prompt("Введите имя 2-го игрока:");
	let attempt, first;
																				
	while (pl_1 === pl_2) {		// Проверка, чтобы у игроков были разные имена
		alert("Имена совпадают. Введите, пожалуйста, разные имена!");
		let pl_1 = prompt("Введите имя 1-го игрока:");
		let pl_2 = prompt("Введите имя 2-го игрока:");
			}
	do {
		first = prompt("Кто будет начинать?");
	} while (first == "");																
			
	do {
		attempt = +prompt("Сколько Вы хотите сыграть раундов?");
	} while (attempt == "");

	if (first == pl_1) {
		for (var i = 1; i <= attempt; i++) {
			if (i % 2 != 0) {
				player_1();
			} else {
				player_2();
			}
		}
	}

	if (first == pl_2) {
		for (var i = 1; i <= attempt; i++) {
			if (i % 2 != 0) {
				player_2();
			} else {
				player_1();
			}
		}
	}
			
	function player_1() {
		alert(pl_1 + ", Вы начинаете!");
		var numb1 = +prompt(pl_1 + ", загадывайте число!");
		var numb2 = +prompt(pl_2 + ", какое число загадал " + pl_1 + "?");
		if (numb2 === numb1) {
			alert(pl_2 + ", поздравляю, Вы угадали!");
		} else {
			alert(pl_2 + ", Вы не угадали!");
		}
	}

	function player_2() {
		alert(pl_2 +", Вы начинаете!");
		var numb2 = +prompt(pl_2 + ", загадывайте число!");
		var numb1 = +prompt(pl_1 + ", какое число загадал " + pl_2 + "?");
		if (numb1 === numb2) {
			alert(pl_1 + ", поздравляю, Вы угадали!");
		} else {
			alert(pl_1 + ", Вы не угадали!");
		}
	}

	alert("Игра окончена! Всего доброго!");
}