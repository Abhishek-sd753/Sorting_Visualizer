async function Merge() {
    document.getElementById("Time_Worst").innerText = "O(N log N)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(N)";

    cancelSort = false;

    await merge_partition(0, array_size - 1);

    if (!cancelSort) enable_buttons();
}
async function merge_partition(start, end) {
    if (cancelSort) return;
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        divs[mid].style.backgroundColor = "yellow";
        await sleep(getDelay());

        await merge_partition(start, mid);
        await merge_partition(mid + 1, end);

        await merge_sort(start, mid, end);
    }
}

async function merge_sort(start, mid, end) {
    if (cancelSort) return;

    let p = start, q = mid + 1;
    let Arr = [], k = 0;

    while (p <= mid && q <= end) {
        if (cancelSort) return;

        if (div_sizes[p] < div_sizes[q]) {
            Arr[k++] = div_sizes[p];
            updateBar(p, div_sizes[p], "red");
            await sleep(getDelay());
            p++;
        } else {
            Arr[k++] = div_sizes[q];
            updateBar(q, div_sizes[q], "red");
            await sleep(getDelay());
            q++;
        }
    }

    while (p <= mid) {
        if (cancelSort) return;
        Arr[k++] = div_sizes[p];
        updateBar(p, div_sizes[p], "red");
        await sleep(getDelay());
        p++;
    }

    while (q <= end) {
        if (cancelSort) return;
        Arr[k++] = div_sizes[q];
        updateBar(q, div_sizes[q], "red");
        await sleep(getDelay());
        q++;
    }

    for (let t = 0; t < k; t++) {
        if (cancelSort) return;
        div_sizes[start + t] = Arr[t];
        updateBar(start + t, Arr[t], "green");
        await sleep(getDelay());
    }
}
