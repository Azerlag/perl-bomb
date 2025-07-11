const spinDuration = 10000;
const minRotations = 20;
const textSwapSpeedFactor = 0.02; 	// more - slower
const smoothBrakeCurve = 4.0; 		// Экспоненциальная кривая торможения (<1 - медленнее, >1 - быстрее)

const WheelMaxSizePx = 450; 		
const WheelCenterCircleSize = 0.06; // in % from canvas.height

const perls_0 = [
  "Вы конченный.",
  "Чуть не сдох пока читал.",
  "Вам нельзя писать.",
  //
  "Очевидный нейрослоп.",
  "Огрызок размером с абзац.",
  "Статья нечитаема.",
  "Написано настолько плохо, что вызывает смех.",
  "Топорная политота.",
  "По статье видно, что автор не читал правила сайта.",
  "По статье видно, что автор не закончил среднюю школу.",
  "Написано ужасно.",
  "Статья неуместна в контексте сайта.",
  "Лор в статье сам себе глобально противоречит.",
  "Описывается какая-то выдуманная сходу организация, по которой до этого никаких статей не было.",
  "Текст написан вопиюще неграмотно.",
  "Статья представляет собой нереальную духоту, не имеющую художественной ценности.",
];

const perls_1 = [
  "Заметная нейронка, но с какими-то попытками творческой обработки и своими дополнениями.",
  "Идея нереально банальна и плохо реализована (супир-крутой нож, прорезающий мультивселенную / страшный теневой гуманоид-убийца / сьюха-фурри-спецназовец и вот эти вот все).",
  "Статья читабельная, но она размером с буравчик и в ней практически ничего не происходит.",
  "Статья из-за неграмотности и корявого языка с трудом читается.",
  "Статья читабельная, но в ней есть логические дыры размером с Око Ужаса, из-за которых сюжет просто не работает вообще.",
  "Лор в статье во многих местах сам себе противоречит.",
  "Текст написан неграмотно, из-за чего возникают серьёзные проблемы с его пониманием.",
  "Статья душная и читать её саму по себе не интересно.",
];

const perls_2 = [
  "Банальная и плохо реализованная идея в духе худших проявлений первой тысячи (перевыполнялки, сьюхи, жестокие убивцы).",
  "Статья читабельная, но ни о чём — сюжет рудиментарный, персонажи картонные, заинтересовать читателя она не может.",
  "В основе статьи есть оригинальная или не слишком избитая идея, но она написана так коряво, что читается с трудом.",
  "Статья читабельная, но в ней есть серьёзные логические дыры, из-за которых сюжет перестаёт работать.",
  "Статья сама по себе неплохая, но в сюжете и тексте есть несколько серьёзных огрех, которые не дают посчитать её подходящей для Основы (провисающий сюжет / слабая концовка / сумбурность повествования).",
  "Статья написана хорошо, но она слишком вторична для того, чтобы пройти на Основу.",
  "Лор в статье нелогичный или банальный, но хотя бы складывается в какую-то непротиворечивую картину.",
  "Текст плохо написан, его трудно воспринимать из-за количества ошибок или корявости формулировок.",
  "В статье есть интересные с художественной точки зрения моменты, но чтобы до них дойти, приходится продираться через окружающую псевдодокументальную духоту.",
];

const perls_3 = [
  "В основе статьи лежит оригинальная интересная идея, но она написана коряво или с таким количеством ошибок, что они серьёзно затрудняют чтение.",
  "В основе статьи лежит оригинальная интересная идея и она хорошо написана, но в сюжете присутствуют логические дыры, мешающие подавлению недоверия.",
  "За основу статьи взята банальная или распространённая идея, однако автор её творчески переосмысляет в степени, достаточной для прорыва, но недостаточной для более высокой оценки.",
  "Шутка, на мой взгляд, под пиво.",
  "Недожата, но если остальным пользователям сайта нравится, то пусть будет.",
  "Лор в статье достаточно интересный, чтобы статью хотелось читать, но звёзд с неба не хватает.",
  "Текст в целом читабелен, но корявые формулировки, стилистика или ошибки мешают чтению.",
  "Статья написана в целом хорошо, но всё портит вода или душные перебивки.",
];

const perls_4 = [
  "В основе статьи лежит оригинальная интересная идея, но она написана со стилистическими огрехами или ошибками, затрудняющими чтение.",
  "В основе статьи лежит оригинальная интересная идея и она хорошо написана, но в сюжете присутствуют бросающиеся в глаза условности или допущения, мешающие подавлению недоверия.",
  "За основу статьи взята распространённая идея, но она грамотно и интересно творчески переосмыслена автором, хоть и не идеально.",
  "Статья написана хорошо, но ей как будто чего-то не хватает (слабая концовка / незакрытые дополнительные сюжетные линии).",
  "В статье приводится интересный лор, который воспринимается как целостное художественное произведение.",
  "Текст хорошо написан, но встречаются стилистические заскоки или ошибки, не мешающие чтению.",
  "В статье есть некоторые душные места, от вычитания которых статья ничего особенно не потеряет.",
];

const perls_5 = [
  "Отлично написанная статья, построенная на оригинальной и интересной идее, у которой нет заметных недостатков.",
  "практически идеально написанная статья, творчески осмысляющая какую-то распространённую концепцию или идею.",
  "Шутка технически и содержательно выполнена отлично, хотел бы её видеть в основном пространстве.",
  "Отлично написанная лорная статья с интересным повествованием, которую приятно читать и перечитывать.",
];

const segments = [
	{ text: "★★★★★", color: '#af38a9', perls: perls_5 },
	{ text: "★★★★☆", color: '#43b95d', perls: perls_4 },
	{ text: "★★★☆☆", color: '#d1c62f', perls: perls_3 },
	{ text: "★★☆☆☆", color: '#df9f28', perls: perls_2 },
	{ text: "★☆☆☆☆", color: '#c21e1e', perls: perls_1 },
	{ text: "☆☆☆☆☆", color: '#292222', perls: perls_0 }
];

function setupCanvas() {
  const canvas = document.getElementById('wheelCanvas');
  const container = canvas.parentElement;
  
  // Определяем размер на основе доступного пространства
  const maxSize = Math.min(
    window.innerWidth * 0.8,
    window.innerHeight * 0.7,
    WheelMaxSizePx
  );
  
  canvas.width = maxSize;
  canvas.height = maxSize;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) / 2 - 10;
  
  return { canvas, ctx: canvas.getContext('2d'), centerX, centerY, radius };
}

function initCanvas() {
  ({canvas, ctx, centerX, centerY, radius} = setupCanvas());
  drawWheel();
}
// setupCanvas();

window.addEventListener('load', initCanvas);
window.addEventListener('resize', debounce(initCanvas, 200));

function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// const canvas = document.getElementById('wheelCanvas');
const selectedText = document.getElementById("selected-text");
const estimationText = document.getElementById("estimation-text");
const spinBtn = document.getElementById("spinBtn");

let canvas, ctx, centerX, centerY, radius;

let currentRotation = 0;
let isSpinning = false;
let currentSegment = 0;

// Рисуем колесо
function drawWheel() {
	if (!canvas) return;
	
	// console.log('canvas.height ', canvas.height);
	// console.log('canvas.width ', canvas.width);
	
	const segmentAngle = (2 * Math.PI) / segments.length;
	
	// Рисуем сегменты
	segments.forEach((segment, index) => {
		const startAngle = segmentAngle * index + currentRotation;
		const endAngle = segmentAngle * (index + 1) + currentRotation;
		
		// Рисуем сегмент
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.closePath();
		ctx.fillStyle = segment.color;
		ctx.fill();
		
		// Рисуем границу
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 2;
		ctx.stroke();
		
		// Добавляем текст
		ctx.save();
		ctx.translate(centerX, centerY);
		ctx.rotate((startAngle + endAngle) / 2);
		ctx.textAlign = 'center';
		ctx.fillStyle = '#fff';
		ctx.font = 'bold 20px Arial';
		ctx.fillText(segment.text, radius * 0.6, 10);
		ctx.restore();
	});
	
	// Центральный круг
	ctx.beginPath();
	ctx.arc(centerX, centerY, canvas.height * WheelCenterCircleSize, 0, 2 * Math.PI);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 3;
	ctx.stroke();
	
	// Указатель
	ctx.beginPath();
	ctx.moveTo(centerX + radius + canvas.height * 0.04, centerY);
	ctx.lineTo(centerX + radius, centerY - 15);
	ctx.lineTo(centerX + radius, centerY + 15);
	ctx.closePath();
	ctx.fillStyle = '#ff0000';
	ctx.fill();
}

// Функция вращения
function spinWheel() {
	if (isSpinning) return;
	
	isSpinning = true;
	spinBtn.disabled = true;
	
	const spinRotations = minRotations + Math.random() * minRotations;

	const startTime = Date.now();
	const startRotation = currentRotation;
	
	let prevProgress = 0;
	
	function animate() {
		const elapsed = Date.now() - startTime;
		const progress = Math.min(elapsed / spinDuration, 1);
		const easeProgress = easeOutCubic(progress);
		
		currentRotation = startRotation + easeProgress * spinRotations * Math.PI * 2;
		
		drawWheel();
		
		if (progress < 1) {

			if (easeProgress-textSwapSpeedFactor >= prevProgress) {
				selectedText.textContent = getRandomPerl();
				prevProgress = easeProgress;
			}
			
			requestAnimationFrame(animate);
		} else {
			finishSpin();
		}
	}
	
	animate();
}

function getRandomPerl() { 
	const selectedIndex = getSegmentIndex();
	const perls = segments[selectedIndex].perls;
	return perls[Math.floor(Math.random() * perls.length)];
}

function getSegmentIndex() { 
	const normalizedRotation = (currentRotation % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
	const segmentAngle = (2 * Math.PI) / segments.length;
	const selectedIndex = Math.floor((2 * Math.PI - normalizedRotation) / segmentAngle) % segments.length;
	return selectedIndex;
}

function getYearsText(num) {
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${num} лет`;
  }

  switch (lastDigit) {
    case 1:
      return `${num} год`;
    case 2:
    case 3:
    case 4:
      return `${num} года`;
    default:
      return `${num} лет`;
  }
}

function finishSpin() {
	isSpinning = false;
	spinBtn.disabled = false;
	
	const selectedIndex = getSegmentIndex();
	currentSegment = selectedIndex;
	estimationText.innerHTML = `Вам ровно: ${segments[currentSegment].text} (${getYearsText(segments.length-1-currentSegment)})<br>Вердикт:`;
	selectedText.textContent = getRandomPerl();
}

// Функция для плавного замедления
function easeOutCubic(t) {
	return 1 - Math.pow(1 - t, smoothBrakeCurve);
}

// Инициализация
initCanvas();
spinBtn.addEventListener('click', spinWheel);
setTimeout(function() {
   spinWheel()
}, 500);