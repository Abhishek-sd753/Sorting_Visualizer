async function Selection_sort() {
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N^2)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    cancelSort = false;

    for (let i = 0; i < array_size - 1; i++) {
        if (cancelSort) return;

        let index_min = i;
        updateBar(i, div_sizes[i], "red");
        await sleep(getDelay());

        for (let j = i + 1; j < array_size; j++) {
            if (cancelSort) return;

            updateBar(j, div_sizes[j], "yellow");
            await sleep(getDelay());

            if (div_sizes[j] < div_sizes[index_min]) {
                if (index_min !== i) {
                    updateBar(index_min, div_sizes[index_min], "blue");
                }
                index_min = j;
                updateBar(index_min, div_sizes[index_min], "red");
            } else {
                updateBar(j, div_sizes[j], "blue");
            }

            await sleep(getDelay());
        }

        if (index_min !== i) {
            // Swap
            let temp = div_sizes[i];
            div_sizes[i] = div_sizes[index_min];
            div_sizes[index_min] = temp;

            updateBar(i, div_sizes[i], "red");
            updateBar(index_min, div_sizes[index_min], "blue");
            await sleep(getDelay());
        }

        updateBar(i, div_sizes[i], "green");
    }

    updateBar(array_size - 1, div_sizes[array_size - 1], "green");

    enable_buttons();
}
