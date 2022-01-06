let move_selector = document.getElementById('move_selector');
let g = document.getElementById('game');
var score = 0;
var playerChoice = 0;
var houseChoice = 0;
var playerLocked = 0;

gamePlayerSelect();

function gamePlayerSelect(){
	move_selector.innerHTML = '';
	houseChoice = Math.floor(Math.random() * 3) + 1;
	document.getElementById('score').innerText = score;

	let joinTop = document.createElement('div');
	joinTop.id = 'join_top';
	move_selector.appendChild(joinTop);

	let joinLeft = document.createElement('div');
	joinLeft.id = 'join_left';
	move_selector.appendChild(joinLeft);

	let joinRight = document.createElement('div');
	joinRight.id = 'join_right';
	move_selector.appendChild(joinRight);

	let paper = document.createElement('i');
	paper.className = 'icon icon_paper icon_paper_select icon-icon-paper';
	paper.id = 'paper';
	paper.addEventListener("click", function(){
		if(playerLocked == 0){
			this.removeEventListener('click', arguments.callee, false);
			iconSelect('paper');
		}
	});
	move_selector.appendChild(paper);

	let scissors = document.createElement('i');
	scissors.className = 'icon icon_scissors icon_scissors_select icon-icon-scissors';
	scissors.id = 'scissors';
	scissors.addEventListener("click", function(){
		if(playerLocked == 0){
			iconSelect('scissors');
			this.removeEventListener('click', arguments.callee, false);
		}
	});
	move_selector.appendChild(scissors);

	let rock = document.createElement('i');
	rock.className = 'icon icon_rock icon_rock_select icon-icon-rock';
	rock.id = 'rock';
	rock.addEventListener("click", function(){
		if(playerLocked == 0){
			this.removeEventListener('click', arguments.callee, false);
			iconSelect('rock');
		}
	});
	move_selector.appendChild(rock);

	let rules = document.createElement('span');
	rules.id = 'btn_rules';
	rules.addEventListener("click", function(){
		showRules(move_selector);
	});
	rules.innerText = 'RULES';
	move_selector.appendChild(rules);
}

function showRules(){
	let shadowBox = document.createElement('div');
	shadowBox.id = 'shadow_box';
	move_selector.appendChild(shadowBox);

	let rulesBlock = document.createElement('div');
	rulesBlock.id = 'rules_block';

	let iconClose = document.createElement('i');
	iconClose.className = 'icon-icon-close';
	iconClose.addEventListener("click", function(){
		shadowBox.remove();
		rulesBlock.remove();
	});
	rulesBlock.appendChild(iconClose);

	let rulesHead = document.createElement('div');
	rulesHead.className = 'rules_head';
	rulesHead.innerText = 'RULES';
	rulesBlock.appendChild(rulesHead);
	
	let rulesImage = document.createElement('img');
	rulesImage.src = './assets/images/image-rules.svg';
	rulesBlock.appendChild(rulesImage);	
	
	move_selector.appendChild(rulesBlock);
}

function iconSelect(type){
	playerLocked = 1;
	let joinTop = document.getElementById('join_top');
	let joinLeft = document.getElementById('join_left');
	let joinRight = document.getElementById('join_right');
	let rock = document.getElementById('rock');
	let paper = document.getElementById('paper');
	let scissors = document.getElementById('scissors');
	
	let ppt = document.createElement('span');
	ppt.id = 'player_pick_txt';
	ppt.innerText = 'YOU PICKED';
	move_selector.appendChild(ppt);

	let houseEmpty = document.createElement('div');
	houseEmpty.id = 'house_empty';
	move_selector.appendChild(houseEmpty);
	
	let hpt = document.createElement('span');
	hpt.id = 'house_pick_txt';
	hpt.innerText = 'THE HOUSE PICKED';
	move_selector.appendChild(hpt);

	if(joinTop){
		joinTop.remove();
		joinLeft.remove();
		joinRight.remove();
	}
	
	playerChoice = (type == 'rock')? 1 : ((type == 'paper')? 2 : 3);
	if(window.innerWidth < 1365){
		rock.style.cssText = (type == 'rock')? 'z-index:5;margin-top: 81px;margin-left:0;' : 'margin-top: 81px;margin-left:0;';
		scissors.style.cssText = (type == 'scissors')? 'z-index:5;margin-top: 81px;margin-left:0;' : 'margin-top: 81px;margin-left:0;';
	}else{
		rock.style.cssText = (type == 'rock')? 'z-index:5;margin-top: 81px;margin-left:-100px;' : 'margin-top: 81px;margin-left:-100px;';
		scissors.style.cssText = (type == 'scissors')? 'z-index:5;margin-top: 81px;margin-left:-100px;' : 'margin-top: 81px;margin-left:-100px;';
	}
	paper.style.cssText = (type == 'paper')? 'z-index:5;' : '';

	setTimeout(function(){
		hpt.style.cssText = 'opacity:1';
		ppt.style.cssText = 'opacity:1';
		houseEmpty.style.cssText = 'opacity:1';
	}, 250);

	setTimeout(function(){
		if(type == 'rock'){
			scissors.remove();
			paper.remove();
			if(window.innerWidth > 1364){
				rock.style.cssText = 'padding: 62px 68px;font-size: 109px;margin-top: 135px;margin-left: -211px;';
			}
		}
		if(type == 'paper'){
			scissors.remove();
			rock.remove();
			if(window.innerWidth > 1364){
				paper.style.cssText = 'padding: 62px 75px;font-size: 109px;margin-top: 135px;margin-left: -211px;';
			}
		}
		if(type == 'scissors'){
			paper.remove();
			rock.remove();
			if(window.innerWidth > 1364){
				scissors.style.cssText = 'padding: 62px 75px;font-size: 109px;margin-top: 135px;margin-left: -211px;';
			}
		}
		
		playerLocked = 0;
	}, 1050);

	setTimeout(function(){
		selectionRoll(paper, rock, scissors, type);
	}, 1750);
}

function selectionRoll(p, r, s, type){
	let houseEmpty = document.getElementById('house_empty');
	let a = playerChoice.toString();
	let b = houseChoice.toString();
	let c = a + b;
	setTimeout(function(){
		houseEmpty.remove();
		let classAtt = (houseChoice == 1)? 'icon_rock icon-icon-rock' : ((houseChoice == 2)? 'icon_paper icon-icon-paper' : 'icon_scissors icon-icon-scissors');
		let icon = document.createElement('i');
		icon.className = 'house_icon ' + classAtt;
		icon.id = 'house_full';
		
		if(window.innerWidth < 1365){
			icon.style.cssText = (houseChoice == 1)? 'padding: 25px 27px !important;font-size: 44px !important;' : '';
			move_selector.appendChild(icon);
		}else{
			move_selector.appendChild(icon);
			icon.style.cssText = (houseChoice == 1)? 'padding: 62px 68px !important;font-size: 109px !important;margin-left: 331px !important;' : 'margin-left: 331px !important;';
			p.style.cssText = (type == 'paper')? 'padding: 62px 75px;font-size: 109px;margin-top: 135px;margin-left: -295px;' : '';
			r.style.cssText = (type == 'rock')? 'padding: 62px 68px;font-size: 109px;margin-top: 135px;margin-left: -295px;' : '';
			s.style.cssText = (type == 'scissors')? 'padding: 62px 75px;font-size: 109px;margin-top: 135px;margin-left: -295px;' : '';
			document.getElementById('player_pick_txt').style.cssText = 'margin-left: -204px;opacity:1';
			document.getElementById('house_pick_txt').style.cssText = 'margin-left: 380px;opacity:1';
		}
		
		
		if(c == 13 || c == 21 || c == 32){
			showResult('w');
			if(window.innerWidth > 1364){
				p.style.cssText = (type == 'paper')? 'padding: 62px 75px;font-size: 109px;margin-top: 135px;margin-left: -295px;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 8px 2px rgba(0,0,0,0.3);' : '';
				r.style.cssText = (type == 'rock')? 'padding: 62px 68px;font-size: 109px;margin-top: 135px;margin-left: -295px;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 8px 2px rgba(0,0,0,0.3);' : '';
				s.style.cssText = (type == 'scissors')? 'padding: 62px 75px;font-size: 109px;margin-top: 135px;margin-left: -295px;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 8px 2px rgba(0,0,0,0.3);' : '';
			}else{
				p.style.cssText = (type == 'paper')? 'margin-top: 81px;margin-left:0;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 4px 5px rgba(0,0,0,0.3);' : '';
				r.style.cssText = (type == 'rock')? 'margin-top: 81px;margin-left:0;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 4px 5px rgba(0,0,0,0.3);' : '';
				s.style.cssText = (type == 'scissors')? 'margin-top: 81px;margin-left:0;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 4px 5px rgba(0,0,0,0.3);' : '';
			}
		}
		
		else if(c == 31 || c == 12 || c == 23){
			showResult('l');
			if(window.innerWidth > 1364){
				icon.style.cssText = (houseChoice == 1)? 'padding: 62px 68px !important;font-size: 109px !important;margin-left: 331px !important;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 8px 2px rgba(0,0,0,0.3);' : 'padding: 62px 68px !important;font-size: 109px !important;margin-left: 331px !important;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 8px 2px rgba(0,0,0,0.3);';
			}else{
				icon.style.cssText = (houseChoice == 1)? 'padding: 25px 27px !important;font-size: 44px !important;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 4px 5px rgba(0,0,0,0.3);' : 'padding: 25px 27px !important;font-size: 44px !important;box-shadow: 0 0 0 48px rgba(255,255,255,0.05), 0 0 0 96px rgba(255,255,255,0.04), inset 0px 4px 5px rgba(0,0,0,0.3);';
			}
		}

		else if(c == 11 || c == 22 || c == 33){
			showResult('d');
		}
	}, 500);
}

function showResult(type){
	score = (type == 'w')? score + 1 : ((type == 'l' && score != 0)? score - 1 : score);
	document.getElementById('score').innerText = score;
	let msg = (type == 'w')? 'YOU WIN' : ((type == 'l')? 'YOU LOSE' : 'DRAW');
	let resultBlock = document.createElement('div');
	resultBlock.className = 'result_block';

	let resultMessage = document.createElement('span');
	resultMessage.className = 'result_message';
	resultMessage.innerText = msg;
	resultBlock.appendChild(resultMessage);

	let extraSpace = document.createElement('p');
	extraSpace.className = 'extra_space';
	let btnPlayAgain = document.createElement('span');
	btnPlayAgain.className = 'btn_play_again';
	btnPlayAgain.innerText = 'PLAY AGAIN';
	btnPlayAgain.addEventListener("click", function(){
		gamePlayerSelect();
	});

	extraSpace.appendChild(btnPlayAgain);
	resultBlock.appendChild(extraSpace);
	move_selector.appendChild(resultBlock);
}
