// Input: user clicks the button
// process: increase riser by 1
// Output: Update text element by riser

//The Input
let counter = 1;
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const count = document.getElementById("count");
const message = document.getElementById("message");

function renderUI() {
  count.textContent = counter;

  if (counter === 0) {
    decrease.disabled = true;
    increase.disabled = false;
    message.textContent = "minimum reached";
  } else if (counter === 10) {
    decrease.disabled = false;
    increase.disabled = true;
    message.textContent = "maximum reached";
  } else {
    decrease.disabled = false;
    increase.disabled = false;
    message.textContent = "Press👌";
  }
}
renderUI();

function bubble(button) {
  button.classList.add("bubble");

  setTimeout(function () {
    button.classList.remove("bubble");
  }, 600);
}

increase.addEventListener("click", function () {
  counter += 1;
  bubble(increase);
  renderUI();
});

decrease.addEventListener("click", function () {
  if (counter > 0) {
    counter -= 1;
  }
  bubble(decrease);
  renderUI();
});
