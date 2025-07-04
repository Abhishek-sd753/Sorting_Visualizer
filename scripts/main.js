
var inp_as = document.getElementById('a_size');
var array_size = inp_as.value;
var inp_gen = document.getElementById("a_generate");
var inp_aspeed = document.getElementById("a_speed");
var butts_algos = document.querySelectorAll(".algos button");
var div_sizes = [];
var divs = [];
var margin_size;
var cont = document.getElementById("array_container");
cont.style = "flex-direction: row";
let isPaused = false;
let pauseResolve = null;
var pauseResumeBtn = document.getElementById("pause-resume-button");
var restartBtn = document.getElementById("restart-button");
let cancelSort = false;

// Constants
const CONTAINER_HEIGHT = 200;  // px

// Events
inp_gen.addEventListener("click", generate_array);
inp_as.addEventListener("input", update_array_size);

function generate_array() {
    cancelSort = true;
    divs = [];
    div_sizes = [];
    cont.innerHTML = "";

    for (let i = 0; i < array_size; i++) {
        let rawValue = Math.floor(Math.random() * 190) + 10;  // Logical value
        let scaledHeight = (rawValue / 100) * CONTAINER_HEIGHT;

        div_sizes[i] = scaledHeight;
        divs[i] = document.createElement("div");

        divs[i].classList.add("array-bar");

        margin_size = 0.05;
        let barWidth = Math.max(0.2, (100 / array_size - 2 * margin_size));

        divs[i].style.margin = `0 ${margin_size}%`;
        divs[i].style.width = `${barWidth}%`;
        divs[i].style.display = "inline-block";
        divs[i].style.verticalAlign = "bottom";

        // ✅ set rawValue for tooltip (not pixel height)
        divs[i].setAttribute("data-value", rawValue);

        cont.appendChild(divs[i]);

        // 🟦 update height and color using updateBar
        updateBar(i, scaledHeight, "green");  // blue default
    }
}



function updateBar(index, height, color = null) {
    divs[index].style.height = height + "px";

    
    let rawValue = Math.round((height / CONTAINER_HEIGHT) * 100);
    divs[index].setAttribute("data-value", rawValue);

    if (color) {
        divs[index].style.backgroundColor = color;
    }
}

async function sleep(ms) {
    while (isPaused) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getDelay() {
    const speed = document.getElementById("a_speed").value;
    return 10 / speed; // You can adjust this multiplier
}


function update_array_size() {
    array_size = inp_as.value;
    generate_array();
}

window.onload = function () {
    update_array_size();
    pauseResumeBtn.disabled = true;
    restartBtn.disabled = true;
    // Attach Restart button event
   document.getElementById("restart-button").addEventListener("click", () => {
     cancelSort = true;
    // ⛔ Disable pause and restart buttons
    pauseResumeBtn.disabled = true;
    restartBtn.disabled = true;

    isPaused = false;
    document.getElementById("pause-resume-button").textContent = "Pause";

    // ✅ Re-enable algorithm dropdown and sort button
    document.getElementById("algo-select").disabled = false;
    document.getElementById("sort").disabled = false;

    // ✅ Re-enable all buttons
    for (let btn of butts_algos) {
        btn.disabled = false;
        btn.classList.remove("butt_locked", "butt_selected");
    }

    // ✅ Re-enable input sliders and array generator
    inp_as.disabled = false;
    inp_gen.disabled = false;
    inp_aspeed.disabled = false;

    // ✅ Clear time/space complexity display
    document.getElementById("Time_Best").innerText = "";
    document.getElementById("Time_Average").innerText = "";
    document.getElementById("Time_Worst").innerText = "";
    document.getElementById("Space_Worst").innerText = "";

      for (let bar of divs) {
        if (bar) {
            bar.style.backgroundColor = "green"; 
        }
    }
    // ✅ Regenerate a fresh random array
    generate_array();
});


    // Sort buttons
    for (var i = 0; i < butts_algos.length; i++) {
        butts_algos[i].addEventListener("click", runalgo);
    }
};




// Disable controls during sorting
function disable_controls() {
    document.getElementById("sort").disabled = true;
    document.getElementById("algo-select").disabled = true;
    inp_as.disabled = true;
    inp_gen.disabled = true;
    inp_aspeed.disabled = true;
}
function waitWhilePaused() {
    return new Promise((resolve) => {
        if (!isPaused) {
            resolve();
        } else {
            pauseResolve = resolve;
        }
    });
}
// Sorting trigger
document.getElementById("sort").addEventListener("click", function () {
    let selectedAlgo = document.getElementById("algo-select").value;
    disable_controls();
    
        pauseResumeBtn.disabled = false;
        restartBtn.disabled = false;

    switch (selectedAlgo) {
        case "Bubble":
            Bubble();
            break;
        case "Selection":
            Selection_sort();
            break;
        case "Insertion":
            Insertion();
            break;
        case "Merge":
            Merge();
            break;
        case "Quick":
            Quick();
            break;
        case "Heap":
            Heap();
            break;
        default:
            alert("Please select a valid sorting algorithm.");
    }
});

document.getElementById("pause-resume-button").addEventListener("click", () => {
    isPaused = !isPaused;

    const button = document.getElementById("pause-resume-button");
    button.textContent = isPaused ? "Resume" : "Pause";

    if (!isPaused && pauseResolve) {
        pauseResolve(); // Resume waiting animations
        pauseResolve = null;
    }
});

