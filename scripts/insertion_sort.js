async function Insertion() {
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    cancelSort = false;

    for (let j = 0; j < array_size; j++) {
        if (cancelSort) return;

        let key = div_sizes[j];
        let i = j - 1;

        updateBar(j, div_sizes[j], "yellow");
        await sleep(getDelay());

        while (i >= 0 && div_sizes[i] > key) {
            if (cancelSort) return;

            updateBar(i, div_sizes[i], "red");
            updateBar(i + 1, div_sizes[i + 1], "red");
            await sleep(getDelay());

            div_sizes[i + 1] = div_sizes[i];
            updateBar(i + 1, div_sizes[i + 1], "red");
            await sleep(getDelay());

            updateBar(i, div_sizes[i], "blue");
            updateBar(i + 1, div_sizes[i + 1], (i === j - 1) ? "yellow" : "blue");
            i--;
        }

        div_sizes[i + 1] = key;
        updateBar(i + 1, key, "yellow");
        await sleep(getDelay());

        // Mark sorted elements so far
        for (let t = 0; t <= j; t++) {
            updateBar(t, div_sizes[t], "green");
        }
    }

    enable_buttons();
}
