function display(){
    console.log("press");
    let ss = document.getElementById("toggle")
    if(ss.style.display==="none"){
        ss.style.display="block"
    }else {
        ss.style.display="none"
    }
}

function mobile(){
    console.log("press");
    let ss = document.getElementById("mobile")
    if(ss.style.display==="none"){
        ss.style.display="block"
    }else {
        ss.style.display="none"
    }
}


let _id = 0;
function input(id){

    console.log("press");
    let parent = document.getElementById("file")
    let label = document.createElement("label");
    let input = document.createElement("input");
    let label2 = document.createElement("label");
    let input2 = document.createElement("input");
    let button = document.createElement("input");
    label.name="fileUpload"
    label.id = "f_id"+_id
    input.type="file"
    input.id = "my_File"+_id
    input.name="filename"
    label2.name="fileUrl"
    label2.id="url_id"+_id
    input2.type="text"
    input2.placeholder="FileUrl"
    input2.id="furl_id"+_id
    input2.name="fileUrl"
    button.type="submit"
    button.id="b_id"+_id
    button.value="Submit"
    parent.appendChild(label)
    parent.appendChild(input)
    parent.appendChild(label2)
    parent.appendChild(input2)
    parent.appendChild(button)
    _id +=1
}