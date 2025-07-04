async function Bubble() {
    cancelSort = false;

    // Set complexities
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    for (let i = 0; i < array_size - 1; i++) {
        for (let j = 0; j < array_size - i - 1; j++) {
            if (cancelSort) return;

            // Highlight comparing bars
            updateBar(j, div_sizes[j], "yellow");
            updateBar(j + 1, div_sizes[j + 1], "yellow");

            await sleep(getDelay());

            if (div_sizes[j] > div_sizes[j + 1]) {
                if (cancelSort) return;

                // Highlight before swap
                updateBar(j, div_sizes[j], "red");
                updateBar(j + 1, div_sizes[j + 1], "red");
                await sleep(getDelay());

                // Swap logic
                let temp = div_sizes[j];
                div_sizes[j] = div_sizes[j + 1];
                div_sizes[j + 1] = temp;

                // Update visuals and tooltip
                updateBar(j, div_sizes[j], "red");
                updateBar(j + 1, div_sizes[j + 1], "red");
                await sleep(getDelay());
            }

            // Reset back to default
            updateBar(j, div_sizes[j], "#007bff");
            updateBar(j + 1, div_sizes[j + 1], "#007bff");
        }

        // Sorted element
        updateBar(array_size - i - 1, div_sizes[array_size - i - 1], "green");
    }

    // Final bar
    updateBar(0, div_sizes[0], "green");

    enable_buttons();
}
