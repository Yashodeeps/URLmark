let myURL =[]
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ulEl")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

//now we have to fetch the strings we saved in a local storage
//the data will be in string and we need to convert it into an array using parse method

const markedURL = JSON.parse(localStorage.getItem("myURL"))

if(markedURL){ //if there are markedURL exists means there are some values in it then run the below code
    myURL = markedURL
    render(myURL)
}

 

tabBtn.addEventListener("click", function(){

    //using chrome extension API 
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myURL.push(tabs[0].url)
        localStorage.setItem("myURL", JSON.stringify(myURL)) //saving in localstorage
        render(myURL) 
    });

})

function render(URL){

    let listItems =""
    for(let i=0; i< URL.length; i++){
        //listItems += "<li><a target = _blank href= '"+ myURL[i]+ "'>" + myURL[i] + "</a></li>"
        listItems += `
        <li>
            <a target = '_blank' href= '${URL[i]}'>
                ${URL[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems

}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myURL = []
    render(myURL)
})

inputBtn.addEventListener("click", function(){
    myURL.push(inputEl.value)
    inputEl.value = ""

    //local storage can only store strings so to store a JS array we first need to stringify it
    localStorage.setItem("myURL", JSON.stringify(myURL))
    render(myURL)
})







