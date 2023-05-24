// canvas variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// audio
const audioEl = new Audio("./public/Song.mp3");
const audioCtx = new AudioContext();
const sourceNode = audioCtx.createMediaElementSource(audioEl);
const analyzerNode = audioCtx.createAnalyser();

// connecting the audio
sourceNode.connect(audioCtx.destination);

// wave data
const wave = {
	y: canvas.height / 2,
	length: 0.01,
	amplitude: 70,
	frequency: analyzerNode.frequencyBinCount,
};
const strokeColor = {
	h: 200,
	s: 50,
	l: 50,
};
const background = {
	r: 0,
	g: 0,
	b: 0,
	a: 0.01,
};

let increment = wave.frequency; //this will be the starting value of each increment
function draw() {
	requestAnimationFrame(draw);
	// analyzing audio
	const buffer = new Float32Array(analyzerNode.frequencyBinCount);

	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	//everytime the draw function runs, the line above clears everything - if we remove this it looks crazy cool!
	ctx.fillStyle = `rgba(${background.r},${background.g},${background.b}, ${background.a})`;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(0, canvas.height / 2);
	for (let i = 0; i < canvas.width; i++) {
		ctx.lineTo(
			i,
			wave.y +
				Math.sin(i * wave.length + increment) *
					wave.amplitude *
					Math.sin(increment)
		);
		// canvasCtx.lineTo(i * bucket * 2, (buffer[i] + 240) * 2);
	}
	ctx.stroke();
	ctx.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${
		strokeColor.s
	}%, ${strokeColor.l}%)`;
	increment += wave.frequency; //for every draw, we will add the value here onto itself
}
draw();
