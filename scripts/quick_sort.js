async function Quick() {
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(log N)";

    cancelSort = false;

    await quick_sort(0, array_size - 1);

    if (!cancelSort) enable_buttons();
}
async function quick_sort(start, end) {
    if (cancelSort) return;
    if (start < end) {
        const piv_pos = await quick_partition(start, end);
        await quick_sort(start, piv_pos - 1);
        await quick_sort(piv_pos + 1, end);
    }
}

async function quick_partition(start, end) {
    if (cancelSort) return;

    let i = start + 1;
    let pivot = div_sizes[start];

    updateBar(start, div_sizes[start], "yellow");
    await sleep(getDelay());

    for (let j = start + 1; j <= end; j++) {
        if (cancelSort) return;

        if (div_sizes[j] < pivot) {
            updateBar(j, div_sizes[j], "yellow");
            await sleep(getDelay());

            updateBar(i, div_sizes[i], "red");
            updateBar(j, div_sizes[j], "red");
            await sleep(getDelay());

            // Swap
            let temp = div_sizes[i];
            div_sizes[i] = div_sizes[j];
            div_sizes[j] = temp;

            updateBar(i, div_sizes[i], "blue");
            updateBar(j, div_sizes[j], "blue");
            await sleep(getDelay());

            i++;
        }
    }

    updateBar(start, div_sizes[start], "red");
    updateBar(i - 1, div_sizes[i - 1], "red");
    await sleep(getDelay());

    // Final pivot swap
    let temp = div_sizes[start];
    div_sizes[start] = div_sizes[i - 1];
    div_sizes[i - 1] = temp;

    updateBar(start, div_sizes[start], "green");
    updateBar(i - 1, div_sizes[i - 1], "green");
    await sleep(getDelay());

    // Optional: mark sorted section green
    for (let t = start; t <= end; t++) {
        updateBar(t, div_sizes[t], "green");
    }

    return i - 1;
}
