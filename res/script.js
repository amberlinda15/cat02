const state = {
    xmlDoc:null,
    nodes:["STU-NAME","STU-UNIVERSITY","STU-PHONE","STU-EMAIL"]
}

function lockDigitKeyHandler(ev){
    const keys = /[0-9]/
    if(ev.key.match(keys)){
        ev.preventDefault()
    }
}

function lockCharKeyHandler(ev){
    const keys = /[a-zA-Z]/
    const regex = /^[0-9]{10}$/;
    if(ev.key.match(keys) || ev.target.value.match(regex)){
        ev.preventDefault()
    }
}

const emailValidator = (value) => {
    if(!value || value == null){return false}
    const cont = document.getElementById("email-cont")
    const regex = /[a-zA-Z0-9]@christuniversity.in/;
    if(regex.test(value)){
        cont.classList.remove("input_error")
        return true
    }else{    
        cont.classList.add("input_error")
      return false
    }
}

const phoneNumValidator = value => {
    if(!value || value == null){return false}
    const cont = document.getElementById("phone-cont")
    const regex = /[0-9]{9}/
    if(regex.test(value)){
        cont.classList.remove("input_error")
        return true
    }else{    
        cont.classList.add("input_error")
        return false
    }
  }

const passwordValidator = value => {
    if (!value || value == null){return false}
    const cont = document.getElementById("phone-cont")
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/
    if(regex.test(value)){
      cont.classList.remove("input_error")
      return true
    }else{    
        cont.classList.add("input_error")
      return false
    }
}

function passwordValidationHandler(ev){
    
}

const ageValidator = value => {
    if (!value || value == null){return false}
    const cont = document.getElementById("age-cont")
    if(value > 0){
      cont.classList.remove("input_error")
      return true
    }else{    
        cont.classList.add("input_error")
      return false
    }
}

const submitFormHandler = () => {
    event.preventDefault()
    let email,phone,password,email_val,phone_val,user_val,college_val,name_val;
    email=phone=password=false;
    const form_elements = document.getElementById("reg-form").elements
    for(let i=0;i<form_elements.length;i++){
        if(form_elements[i].name == "email"){
            email = emailValidator(form_elements[i].value)
            email_val = form_elements[i].value
        }else if(form_elements[i].name == "phone_number"){
            phone = phoneNumValidator(form_elements[i].value)
            phone_val = form_elements[i].value
        }else if(form_elements[i].name == "password"){
            password = passwordValidator(form_elements[i].value)
        }else if(form_elements[i].name == "username"){
            user_val = form_elements[i].value
        }else if(form_elements[i].name == "college"){
            college_val = form_elements[i].value
        }else if(form_elements[i].name == "name"){
            name_val = form_elements[i].value
        }
    }
    if(email && phone && password){
        document.cookie = `username=${user_val};expires=Mon, 07 Jan 2022 12:00:00 UTC; path=/`
        document.cookie = `email=${user_val};expires=Mon, 07 Jan 2022 12:00:00 UTC; path=/`
        localStorage.setItem("phone number",phone_val)
        localStorage.setItem("email",email_val)
        addNewNodeHandler(name_val,college_val,phone_val,email_val)
        document.getElementById("reg-form").reset()
        alert("Form submitted successfully")
    }
}

const loadXml = () => {
    let xhttp;
    if(window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    }else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            showTable(xhttp.responseXML)
        }
    }

    xhttp.open('GET','data.xml',true);
    xhttp.send();
}

const showTable = (xmlRes) => {
    if(!xmlRes){return;}
    state.xmlDocObj = xmlRes;
    let table;
    table = `<tr style='background:#36304a;color:#fff;'>
        <th>Student name</th>
        <th>Student university</th>
        <th>Student phone</th>
        <th>Student email</th>
        </tr>`;
    const x = xmlRes.getElementsByTagName("COMPUTER-SCIENCE");
    for(let i=0;i<x.length;i++){
        table += `
        <tr>
            <td>${xmlRes.getElementsByTagName("STU-NAME")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("STU-UNIVERSITY")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("STU-PHONE")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("STU-EMAIL")[i].childNodes[0].nodeValue}</td>
            
            </tr>
        `;
    }
    document.getElementById("xml-table").innerHTML = table;
}

const addNewNodeHandler = (name,college,phone,email) => {
    event.preventDefault();
    const newnode = state.xmlDocObj.createElement("COMPUTER-SCIENCE")
    state.nodes.map((el,i) => {
        let newTitle = state.xmlDocObj.createElement(el)
        let newText;
        if(el == "STU-NAME"){
            newText = state.xmlDocObj.createTextNode(name)
        }else if(el == "STU-UNIVERSITY"){
            newText = state.xmlDocObj.createTextNode(college)
        }else if(el == "STU-PHONE"){
            newText = state.xmlDocObj.createTextNode(phone)
        }else if(el == "STU-EMAIL"){
            newText = state.xmlDocObj.createTextNode(email)
        }
        newTitle.appendChild(newText)
        newnode.appendChild(newTitle);
    });

    state.xmlDocObj.documentElement.insertBefore(newnode,null)
    showTable(state.xmlDocObj)
}

loadXml()

