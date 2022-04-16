const graphId = document.getElementById("graph");


const arr: number[] = Array(50).fill(0).map( () => Math.floor(Math.random() * 300));


const createGraphItems = (arr:number[]) => {
    arr.forEach( item => {
       const el =  document.createElement("div") as HTMLElement;
        el.style.height = `${item.toString()}px`;
        el.style.width = "5px";
        el.style.backgroundColor = "black";
        el.style.margin = "0, 5px";
        graphId!.append(el);
    })
}


const removeGraphItems = () => {
    graphId!.innerHTML = "";
}

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

createGraphItems(arr);

async function bubbleSort(inputArr:number[]){
    let len = inputArr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            await sleep(5);
            
            if (inputArr[j] > inputArr[j + 1]) {
                let tmp = inputArr[j];
                inputArr[j] = inputArr[j + 1];
                inputArr[j + 1] = tmp;
                removeGraphItems();
                    createGraphItems(inputArr);
                }

        }
    }
    return inputArr;
};


const buttonId = document.getElementById("btn")!.addEventListener("click",() => {
    bubbleSort(arr);
})