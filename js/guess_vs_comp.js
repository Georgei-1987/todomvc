(function (window) {
	'use strict';
})(window); 

document.getElementById('beginGame').addEventListener('click', () => game_vs_comp());

function game_vs_comp() {
	let attempt;
	do {
		attempt = +prompt("Сколько Вы хотите сделать попыток?");
	} while (attempt === "");

	for (let i = 1; i <= attempt; i++) {
		let comp = parseInt(Math.random()*10);
		let human = parseInt(prompt("Введите число от 0 до 9, которое загадал компьютер: "));

		if (human > comp) {
			alert("Вы написали число бОльшее, чем компьютер!");
			human = parseInt(prompt("Напишите ЕЩЁ РАЗ число от 0 до 9, которое загадал компьютер: "));
				if (human == comp) {
					alert("Поздравляю, Вы угадали число! Это число было " + comp + "." + "\n\nКоличество оставшихся попыток = " + 
							(attempt-i) + ".");
				} else {
						alert("К сожалению, Вы не угадали! Компьютер загадал число " + comp + "." + "\n\nКоличество оставшихся попыток = " + (attempt-i) + ".");
						}
			} else  if (human < comp) {
						alert("Вы написали число меньшее, чем компьютер!");
						human = parseInt(prompt("Напишите ЕЩЁ РАЗ число от 0 до 9, которое загадал компьютер: "));
							if (human == comp) {
								alert("Поздравляю, Вы угадали число! Это число было " + comp + "." + "\n\nКоличество оставшихся попыток = " + (attempt-i) + "."); 
							} else {
								alert("К сожалению, Вы не угадали! Компьютер загадал число " + comp + "." + "\n\nКоличество оставшихся попыток = " + (attempt-i) + ".");
							}
			} else if (human == comp) {
				alert("Компьютер загадал число: " + comp + "\n\nПоздравляю, Вы угадали число!");
			}

	};
	alert("Спасибо за участие! Игра закончена! Всего хорошего! :)");
};