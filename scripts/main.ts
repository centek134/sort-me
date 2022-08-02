const graphId = document.getElementById("graph");
const btnBubbleSort = document.getElementById("btn_bubble") as HTMLButtonElement;
const btnInsertSort = document.getElementById("btn_insertion") as HTMLButtonElement;
const btnSelectionSort = document.getElementById("btn_selection") as HTMLButtonElement;
const btnQuickSort = document.getElementById("btn_quick") as HTMLButtonElement;
const arrSizeInput = document.getElementById("arr_size_input") as HTMLInputElement;
const arrSortSpeedInput = document.getElementById("arr_speed_input") as HTMLInputElement;
const btnHeapSort = document.getElementById("btn_heap") as HTMLButtonElement;
const buttons:NodeListOf<HTMLButtonElement> = document.querySelectorAll(".nav_btn");

let arr:number[] = [];
let sortSpeed = 75;

// function that generates our random array
const generateArray = (arr_size:number) => {
    arr = Array(arr_size).fill(0,0).map( () => Math.floor(Math.random() * 300));
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

const disableMenuBtns = (props:boolean) => {
    if(props){
        buttons.forEach(el => el.disabled = true);
        arrSizeInput.disabled = true;
    }
    else{
        buttons.forEach(el => el.disabled = false);
        arrSizeInput.disabled = false;
    };
};


// ========= SORTING FUNCTIONS ===============

//------------Bubble Sort ---------------------
async function bubbleSort(inputArr:number[]){
    let len: number = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len -1 ; j++) {
            //colorize(j,j+1)
            await sleep();
            if (inputArr[j] > inputArr[j+1]){
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j+1];
                inputArr[j+1] = tmp;
                removeGraphItems();
                createGraphItems(inputArr);
            };
        };
    };
};
// ----------- Insertion Sort ------------------
async function insertionSort(inputArr:number[]) {
    for (let i = 1; i < inputArr.length; i++){
        let current = inputArr[i];
        let j = i-1; 
        while ((j > -1) && (current < inputArr[j])) {
            await sleep();
            removeGraphItems();
            createGraphItems(inputArr);
            inputArr[j+1] = inputArr[j];
            j--;
        };
        inputArr[j+1] = current;
    };
};
// ------------- Selection Sort --------------------
async function selectionSort (arr:number[]){
    for(let i = 0; i < arr.length; i++){
        let min:number = i;
        for(let j = i+1; j < arr.length; j++){
           // colorize(min,j);
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
    };
  };

//---------------- Quick Sort -----------------------
async function quickSort(arr:number[],left:number,right:number){
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
        await sleep()
        i++;
    };
    x = arr[j];
    arr[j] = arr[right];
    arr[right] = x;
    if (left < j - 1){
        quickSort(arr, left, j - 1);
    };
    if (j + 1 < right){
        quickSort(arr, j+1, right);
    };
};

//============== heap sort ==============================

async function heapSort(array:number[]) {
    let size = array.length;
    for (let i = Math.floor(size / 2 - 1); i >= 0; i--){
        await heapify(array, size, i)
    };
    for (let i = size - 1; i >= 0; i--) {
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        await heapify(array, i, 0);
    };
  };
  
  async function heapify(array:number[], size:number, i:number) {
    let max = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    removeGraphItems();
    createGraphItems(arr);
    await sleep();
    if (left < size && array[left] > array[max]){
        max = left;
    };
    if (right < size && array[right] > array[max]){
        max = right;
    };
    if (max != i) {
      let temp = array[i];
      array[i] = array[max];
      array[max] = temp;
      await heapify(array, size, max);
    };
  };

// ======================================================

generateArray(200);
btnBubbleSort!.addEventListener("click",async () => {
    disableMenuBtns(true);
    await bubbleSort(arr);
    disableMenuBtns(false);
});
btnInsertSort!.addEventListener("click",async () => {
    disableMenuBtns(true);
    await insertionSort(arr);
    disableMenuBtns(false);
});
btnSelectionSort!.addEventListener("click", async () => {
    disableMenuBtns(true);
    await selectionSort(arr);
    disableMenuBtns(false);
});
btnQuickSort.addEventListener("click", async () => {
    disableMenuBtns(true);
    await quickSort(arr,0,arr.length-1);
    disableMenuBtns(false);

});
arrSizeInput!.addEventListener("change", (event:any) => {
    generateArray(parseInt(event.target.value));

});
arrSortSpeedInput!.addEventListener("change", (event:any) => {
    sortSpeed = parseInt(event.target.value);
});
btnHeapSort!.addEventListener("click", async () => {
    disableMenuBtns(true);
    await heapSort(arr);
    disableMenuBtns(false);
});
//============================================