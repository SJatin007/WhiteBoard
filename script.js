document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("whiteboard");
  const context = canvas.getContext("2d");

  // Set canvas size
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;

  let drawing = false;
  let eraserMode = false;
  let lastX = 0;
  let lastY = 0;
  let color = "#000";

  function startPosition(e) {
    drawing = true;
    if (eraserMode) {
      context.strokeStyle = "#FFF"; // Use white color to simulate eraser
      context.lineWidth = 20; // Wider line for eraser
    } else {
      context.strokeStyle = color;
      context.lineWidth = 5; // Normal line width
    }
    draw(e);
  }

  function endPosition() {
    drawing = false;
    context.beginPath();
  }

  function draw(e) {
    if (!drawing) return;
    context.lineCap = "round";
    
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  }

  function toggleEraser() {
    eraserMode = !eraserMode;
    if (eraserMode) {
      document.getElementById("eraser").textContent = "Draw";
    } else {
      document.getElementById("eraser").textContent = "Eraser";
    }
  }

  function changeColor(e) {
    color = e.target.value;
  }

  function saveDrawing() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "whiteboard_drawing.png";
    link.click();
  }

  function enableTouchDraw() {
    canvas.addEventListener("touchstart", function(e) {
      e.preventDefault();
      startPosition(e.touches[0]);
    });

    canvas.addEventListener("touchmove", function(e) {
      e.preventDefault();
      draw(e.touches[0]);
    });

    canvas.addEventListener("touchend", endPosition);
  }

  // Event listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);

  document.getElementById("eraser").addEventListener("click", toggleEraser);
  document.getElementById("colorPicker").addEventListener("change", changeColor);
  document.getElementById("save").addEventListener("click", saveDrawing);
  document.getElementById("mobile-draw").addEventListener("click", enableTouchDraw);
});