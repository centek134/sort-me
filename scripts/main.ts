const graphId = document.getElementById("graph");
let arr:number[] = [];
let sorted_arr_copy:number[] = [];
let sortSpeed = 5;

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
            nodes[i].style.backgroundColor = "yellow";
        };
    };
};
// ========= SORTING FUNCTIONS ===============

//------------Bubble Sort ---------------------
async function bubbleSort(inputArr:number[]){
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
};
// ----------- Insertion Sort ------------------
async function insertionSort(inputArr:number[]) {
        for (let i = 1; i < inputArr.length; i++) {
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
};
// ======================================================
generateArray(50);
const btnBubblesort = document.getElementById("btn_bubble")!.addEventListener("click",() => {
    bubbleSort(arr);
});
const btnInsertsort = document.getElementById("btn_insertion")!.addEventListener("click",() => {
    insertionSort(arr);
});
const arrSizeInput = document.getElementById("arr_size_input")!.addEventListener("change", (event:any) => {
    generateArray(parseInt(event.target.value));
});
const arrSortSpeed = document.getElementById("arr_speed_input")!.addEventListener("change", (event:any) => {
    sortSpeed = parseInt(event.target.value);
});