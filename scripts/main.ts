const graphId = document.getElementById("graph");
const btnBubbleSort = document.getElementById("btn_bubble") as HTMLButtonElement;
const btnInsertSort = document.getElementById("btn_insertion") as HTMLButtonElement;
const btnSelectionSort = document.getElementById("btn_selection") as HTMLButtonElement;
const btnQuickSort = document.getElementById("btn_quick") as HTMLButtonElement;
const arrSizeInput = document.getElementById("arr_size_input") as HTMLInputElement;
const arrSortSpeedInput = document.getElementById("arr_speed_input") as HTMLInputElement;

let arr:number[] = [];
let sorted_arr_copy:number[] = [];
let sortSpeed = 150;

// function that generates our random array
const generateArray = (arr_size:number) => {
    arr = Array(arr_size).fill(0,0).map( () => Math.floor(Math.random() * 300));
    sorted_arr_copy = JSON.parse(JSON.stringify(arr));
    sorted_arr_copy.sort((a,b)=> a-b);
    removeGraphItems();
    createGraphItems(arr);
};
// function that takes an array as argument, creates div elements with height = arr[i] value, and appends them to  our graphId div
const createGraphItems = (arr:number[]):void => {
    arr.forEach( item => {
       const el =  document.createElement("div") as HTMLElement;
        el.style.height = `${item.toString()}px`;
        el.classList.add("item");
        graphId!.append(el);
    });
};
// function that removes our columns in graph, so we can reder the once more later
const removeGraphItems = ():void => {
    graphId!.innerHTML = "";
};
// function that returns promise, we are using it to control render time
const sleep = () => {
    return new Promise(resolve => setTimeout(resolve, sortSpeed));
};
// functions that colors our actual compared numbers, it takes 2 numbers (array indexes of compared numbers) and then we are adding styles to them 
const colorize = (num_1:number,num_2:number):void => {
    const nodes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".item");
    nodes.forEach(el => {
        el.classList.remove("compare");
    });
    nodes[num_1].classList.add("compare");
    nodes[num_2].classList.add("compare");
};
// function thath compare positions of sorted array with unsorted one.
// If we sort unsorted array and one of the number is in the correct spot i.e. number is sorted its beign highlighted on yellow
const compare_pos = () => {
    const nodes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".item");
    for(let i = 0; i < sorted_arr_copy.length; i++){
        if(sorted_arr_copy[i] === arr[i]){
            nodes[i].style.backgroundColor = "#FFD12A";
        };
    };
};
// ========= SORTING FUNCTIONS ===============

//------------Bubble Sort ---------------------
async function bubbleSort(inputArr:number[]){
    disableMenu(true);
    let len: number = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len -1 ; j++) {
            colorize(j,j+1)
            await sleep();
            if (inputArr[j] > inputArr[j+1]){
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j+1];
                inputArr[j+1] = tmp;
                removeGraphItems();
                createGraphItems(inputArr);
            };
            compare_pos();
        };
    };
    compare_pos();
    disableMenu(false);
};
// ----------- Insertion Sort ------------------
async function insertionSort(inputArr:number[]) {
    disableMenu(true);
    for (let i = 1; i < inputArr.length; i++){
        let current = inputArr[i];
        let j = i-1; 
        while ((j > -1) && (current < inputArr[j])) {
            colorize(i,j)
            await sleep();
            removeGraphItems();
            createGraphItems(inputArr);
            compare_pos();
            inputArr[j+1] = inputArr[j];
            j--;
        };
        inputArr[j+1] = current;
    };
    compare_pos();
    disableMenu(false);
};
// ------------- Selection Sort --------------------
async function selectionSort (arr:number[]){
    disableMenu(true);
    for(let i = 0; i < arr.length; i++){
        let min:number = i;
        for(let j = i+1; j < arr.length; j++){
            colorize(min,j);
            await sleep();
            if(arr[j] < arr[min]){
                min = j;
            };
        };
        
        let temp:number = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
        removeGraphItems();
        createGraphItems(arr);
        compare_pos();
    };
    disableMenu(false);
  };

//---------------- Quick Sort -----------------------
async function quickSort(arr:number[],left:number,right:number){
    if(arr.length <= 1){
        return arr;
    };
    removeGraphItems();
    createGraphItems(arr);
    let i, j, x;
    i = j = left;
    await sleep();
    while(i < right) {
        if (arr[i] <= arr[right]) { 
            x = arr[j]; 
            arr[j] = arr[i];
            arr[i] = x;
            j++;
        };
        removeGraphItems();
        createGraphItems(arr);
        colorize(i,j)
        await sleep()
        i++;
    };
    x = arr[j];
    arr[j] = arr[right];
    arr[right] = x;
    if (left < j - 1){
        quickSort(arr, left, j - 1);
    };
    if (j+1 < right){
        quickSort(arr, j+1, right);
    };
};
// ======================================================

// functions responsible for disabling navigation buttons
const disableMenu = (isSorted:boolean):void => {
    if(isSorted){
        btnBubbleSort.disabled = true;
        btnBubbleSort.classList.add("disabled");
        btnInsertSort.disabled = true;
        btnInsertSort.classList.add("disabled");
        btnSelectionSort.disabled = true;
        btnSelectionSort.classList.add("disabled");
        arrSizeInput.disabled = true;
        arrSizeInput.classList.add("disabled");
    }
    else{
        btnBubbleSort.disabled = false;
        btnBubbleSort.classList.remove("disabled");
        btnInsertSort.disabled = false;
        btnInsertSort.classList.remove("disabled");
        btnSelectionSort.disabled = false;
        btnSelectionSort.classList.remove("disabled");
        arrSizeInput.disabled = false;
        arrSizeInput.classList.remove("disabled");
    };
};
generateArray(150);
btnBubbleSort!.addEventListener("click",() => {
    bubbleSort(arr);
});
btnInsertSort!.addEventListener("click",() => {
    insertionSort(arr);
});
btnSelectionSort!.addEventListener("click", () => {
    selectionSort(arr);
});
btnQuickSort.addEventListener("click", () => {
    console.log(quickSort(arr,0,arr.length-1));
});
arrSizeInput!.addEventListener("change", (event:any) => {
    generateArray(parseInt(event.target.value));
});
arrSortSpeedInput!.addEventListener("change", (event:any) => {
    sortSpeed = parseInt(event.target.value);
});
