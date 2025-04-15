document.addEventListener("DOMContentLoaded",(event)=>{
    // Runs the code once the content is loaded.
    const register = document.getElementById("registrate-form")
    const cancel = document.getElementById("cancelbutton")

    if (!register || !cancel) {
        console.error("Form or cancel button not found in the DOM")
        return
    }

// Listens for the register form being submitted then puts the values into their variables
    register.addEventListener("submit", (event)=>{
        event.preventDefault()

        const FName = document.getElementById("fname").value.trim()
        const LName= document.getElementById("lname").value.trim()
        const DOB= document.getElementById("dob").value
        const gender= document.getElementById("gender").value
        const celphone= document.getElementById("cel").value.trim()
        const email= document.getElementById("email").value.trim()
        const trnID= document.getElementById("trn").value.trim()
        const password= document.getElementById("passwrd").value
        


// Settting the date of birth
    const DateofBirth= new Date(DOB)
    const currentYear= new Date().getFullYear()
    

// Making sure the password is the correct length
    function passwordValid(password){
        if (password.length < 8){
            alert ("Password must be 8 characters or more long")
            return
        }
    }

    // Calculating the age
    const birthDate = new Date(DOB);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
    if (age< 18){
        alert("You must be 18 years or older to register")
        return
    }

    
    // This changes the registration information in local storage into a JS object.
    let registration= JSON.parse(localStorage.getItem("RegistrationData")) || []
    
    
    

    // Basically this maps the trn in local storage to the variable UserTrn.
    // This is so we can make an array of the TRNs to cycle through and check they are unique.
    let UserTRN= registration.map (user => user.trn)
    

// This function checks the TRNs uniqueness by cycling through the array and checking if the TRN entered exists.
    if (UserTRN.includes(trnID)){
        alert("TRN not unique")
        return
    }
    

    // Saves all the entered data
    const userData={
        FName,
        LName,
        DOB,
        age,
        gender: gender.toLowerCase(),
        celphone,
        trn: trnID.replace(/-/g,""),
        password,
        cart: {},
        invoices: []
            
    }

    // This basically sends and saves the data before resetting the form.
    registration.push(userData)
    // stringify changes JS objects into JSON objects for saving purposes.
    // The double lines and brackets makes sure it isn't empty.
    localStorage.setItem("RegistrationData", JSON.stringify(registration)) || []
    alert("Registration Successful")

    register.reset()
    window.location.href="products.html"

})

    // The cancel button resets the form.
    cancel.addEventListener("click", ()=>{
        register.reset()
    })

})
