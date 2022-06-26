
// get product from url paramters, return array of products
function getProducts(){
    const urlParams = new URLSearchParams(window.location.search);

    let products = []
    urlParams.forEach(function(p){
        products.push(p.toString());
    }); 

    return products;
}

// give user a feedback in form
function feedback(name, msg){
    document.getElementById(`feedback-${name}`).innerHTML = msg;
}

// validation functions
function validateCardNumber(number){
    const result = /^\d{4}(-|\s)\d{4}(-|\s)\d{4}(-|\s)\d{4}$/gm.test(number);
    if (result) return true;

    feedback("cardnumber", "Please use a correct card number like: 1234-1234-1234-1234");
    return false;
}

function validatePhoneNumber(number){
    const result = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/m.test(number);
    if (result) return true;
    feedback("mobile", "Please use a correct phonenumber like: 123 123 1234");
    return false;

}

function validatePostCode(postcode){
    const result = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/g.test(postcode);
    if (result) return true;
    feedback("postcode", "Please use a correct postcode like: N2C 1Y5");
    return false;  

}

function validateExpiry(expirty){
    const result = /\b[A-Z]{3}\/?([0-9]{4}|[0-9]{2})\b/.test(expirty);
    if (result) return true;
    feedback("expiry", "Please use a correct postcode like: MMM/yyyy (NOV/2011)");
    return false;  
}

// submit the form
function submit(event){

    // the form data which need to submit to next page
    const formData = new FormData();


    const products = getProducts();
    for(let i = 0; i < products.length; i++){
        formData.append(`products[${i}]`, products[i]);
    }

    // collect values from form
    const inputs = document.getElementsByClassName("field");
    for (let i = 0; i < inputs.length; i++) {
        const el = inputs[i];
        formData.append(el.getAttribute('name'), el.value);
    }

    // do validation here
    /// credit card number
    if (!validateCardNumber(formData.get("cardnumber"))){
        return event.preventDefault();
    }
    if (!validatePhoneNumber(formData.get("mobile"))){
        return event.preventDefault();
    }
    if (!validatePostCode(formData.get("postcode"))){
        return event.preventDefault();
    }
    if (!validateExpiry(formData.get("expiry"))){
        return event.preventDefault();
    }

    console.log(formData);
    
    // convert formdata to a querystring, so we can pass to next page
    const queryString = new URLSearchParams(formData).toString()
    window.location.href = "receipt.html?" + queryString;
    return event.preventDefault();
}

document.getElementById("checkout-form").addEventListener('submit', submit);