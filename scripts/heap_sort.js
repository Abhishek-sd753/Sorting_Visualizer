async function Heap() {
    document.getElementById("Time_Worst").innerText = "O(N log N)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    cancelSort = false;

    await heap_sort();

    if (!cancelSort) enable_buttons();
}

async function swap(i, j) {
    if (cancelSort) return;

    updateBar(i, div_sizes[i], "red");
    updateBar(j, div_sizes[j], "red");
    await sleep(getDelay());

    let temp = div_sizes[i];
    div_sizes[i] = div_sizes[j];
    div_sizes[j] = temp;

    updateBar(i, div_sizes[i], "red");
    updateBar(j, div_sizes[j], "red");
    await sleep(getDelay());

    updateBar(i, div_sizes[i], "#007bff"); // Neutral blue
    updateBar(j, div_sizes[j], "#007bff");
}

async function max_heapify(n, i) {
    if (cancelSort) return;

    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && div_sizes[l] > div_sizes[largest]) {
        if (largest !== i) updateBar(largest, div_sizes[largest], "#007bff");
        largest = l;
        updateBar(largest, div_sizes[largest], "red");
        await sleep(getDelay());
    }

    if (r < n && div_sizes[r] > div_sizes[largest]) {
        if (largest !== i) updateBar(largest, div_sizes[largest], "#007bff");
        largest = r;
        updateBar(largest, div_sizes[largest], "red");
        await sleep(getDelay());
    }

    if (largest !== i) {
        await swap(i, largest);
        await max_heapify(n, largest);
    }
}

async function heap_sort() {
    for (let i = Math.floor(array_size / 2) - 1; i >= 0; i--) {
        if (cancelSort) return;
        await max_heapify(array_size, i);
    }

    for (let i = array_size - 1; i > 0; i--) {
        if (cancelSort) return;

        await swap(0, i);

        updateBar(i, div_sizes[i], "green"); // Sorted
        await sleep(getDelay());

        await max_heapify(i, 0);

        updateBar(i, div_sizes[i], "green");
    }

    if (!cancelSort) updateBar(0, div_sizes[0], "green");
}
