var context, zx, zy, color, len;
var grid = [];
var field = [];
		
	//try{}catch(e){document.write(e);}
function main() {
	var div = document.createElement('canvas');
	var h = window.innerHeight, w = window.innerWidth;
	len = h > w ? w : h;
	var size = len / 4;
	var padding = size / 10;
	div.height = len;
	div.width = len;
	document.body.appendChild(div);
	div.style.align = 'center';
	document.body.style.background = '#ccf';
	context = div.getContext('2d');
	context.font = "bold " + Math.trunc(size/5)+ "px Arial";
	div.ontouchstart = touchStart;
	div.ontouchend = touchEnd;
	document.onkeydown = keyPress;
	color = {
		0: "#fff",
		1: "#fff",
		2: "#ffc",
		3: "#ff9",
		4: "#ff6",
		5: "#ff3",
		6: "#ff0",
		7: "#fc0",
		8: "#f90",
		9: "#f60",
		10: "#f30",
		11: "#f00",
		12: "#c00"
	};
	for(var i = 0; i < 4; i++) {
		field[i] = [];
		grid[i] = [];
		for(var j = 0; j < 4; j++){
			field[i][j] = 1;
			grid[i][j] = [];
			grid[i][j][0] = Math.trunc(i * size + padding);
			grid[i][j][1] = Math.trunc(j * size + padding);
			grid[i][j][2] = Math.trunc(size - 2 * padding);
			grid[i][j][3] = Math.trunc(size - 2 * padding);
			grid[i][j][4] = Math.trunc((i + 0.35) * size);
			grid[i][j][5] = Math.trunc((j + 0.55) * size);
		}
	}
	printField();
}
function touchStart(e){
	var t = e.touches[0];
	zx = t.clientX;
	zy = t.clientY;
	return false;
}
function touchEnd(e){
	var t = e.touches[0];
	var dir = getDirection(t.clientX - zx, t.clientY - zy);
	doAction(dir);
	return false;
}
function keyPress(e){
	var dir = e.which;
	//document.write(dir);
	switch(dir){
		case 39:case 76:case 68:case 100: dir = 1; break; // Right
		case 38:case 75:case 87:case 119: dir = 2; break; // Up
    	case 37:case 72:case 65:case 97: dir = 3; break; // Left
    	case 40:case 74:case 83:case 115: dir = 4; break; // Down
		default: return true;
	}
	doAction(dir);
	return false;
}
function getDirection(dx, dy){
	var l, r, u, d;
	if(dx < 0) l = 1;
	else r = 1;
	if(dy < 0) u = 1;
	else d = 1;
	dx *= l ? -1 : 1;
	dy *= u ? -1 : 1;
	if(dx == dy) return 0;
	if(dx > dy) {u = d = 0;}
	else {l = r = 0;}
	return r ? 1 : u ? 2 : l ? 3 : 4; // r u l d
}
function doAction(act){
	switch(act){
		case 1: rightClick(); break;
		case 2: upClick(); break;
		case 3: leftClick(); break;
		case 4: downClick();
	}
	printField();
}
function printField() {
	var a;
	context.clearRect(0, 0, len, len)
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {			
			context.fillStyle = color[field[i][j]];
			context.fillRect(grid[i][j][0], grid[i][j][1], grid[i][j][2], grid[i][j][3]);
			context.fillStyle = "#777";
			context.fillText((1 << field[i][j]).toString(), grid[i][j][4], grid[i][j][5]);
		}
	}
}
function test(){
	for(var a in CanvasRenderingContext2D){
		document.write(a.toString());
	}
}

function downClick(){
	for(var i = 0; i < 4; i++){
		var ar = [];
		for(var j = 0; j < 4; j++){
			ar[3 - j] = field[i][j];
		}
		ar = shiftArray(ar);
		for(var j = 0; j < 4; j++){
			field[i][j] = ar[3 - j];
		}
	}
}
function leftClick(){
	for(var i = 0; i < 4; i++){
		var ar = [];
		for(var j = 0; j < 4; j++){
			ar[j] = field[j][i];
		}
		ar = shiftArray(ar);
		for(var j = 0; j < 4; j++){
			field[j][i] = ar[j];
		}
	}
}
function upClick(){
	for(var i = 0; i < 4; i++){
		var ar = [];
		for(var j = 0; j < 4; j++){
			ar[j] = field[i][j];
		}
		ar = shiftArray(ar);
		for(var j = 0; j < 4; j++){
			field[i][j] = ar[j];
		}
	}
}
function rightClick(){
	for(var i = 0; i < 4; i++){
		var ar = [];
		for(var j = 0; j < 4; j++){
			ar[3 - j] = field[j][i];
		}
		ar = shiftArray(ar);
		for(var j = 0; j < 4; j++){
			field[j][i] = ar[3 - j];
		}
	}
}

function shiftArray(ar){
	var last = 0;
	ar[5] = 0;
	for(var i = 0; i < 3; i++)
		if(ar[i] == ar[i + 1]){
			ar[i]++;
			for(var j = i + 1; j < 4; j++)
				ar[j] = ar[j + 1];
		};
	for(var i = 0; i < 4; i++)
		if(!ar[i])
			ar[i] = 1;
	return ar;
}
