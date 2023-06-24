/*GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page*/




// In this step we created an object called passChar, with a getter function, to get the value for random lower, upper, number and symbol. We get the value with the return function

const passChar = {
  get lower() {
    return randomLowerCase();
  },
  get upper() {
    return randomUpperCase();
  },
  get number() {
    return randomNumber();
  },
  get symbol() {
    return randomSymbol();
  }
};


// This is the function 


function generatePassword() {
  let passLength= getLength()
  while(passLength===null){
      alert("Must be a number between 8 and 128!")
      passLength=getLength()
  }

 



 /*
 let password= " ";
 password += passChar.lower;
 password += passChar.upper;
 password += passChar.number;
 password += passChar.symbol;

 while(passLength>password.length){
  password += passChar.lower;
  password += passChar.upper;
  password += passChar.number;
  password += passChar.symbol;
 }
 return password*/

 let password = " ";
 
 const includeLower = confirm("Include lowercase characters?")
 const includeUpper = confirm("Include uppercase characters?")
 const includeNumber = confirm("Include number characters?")
 const includeSymbol = confirm("Include symbol characters?")

 if (includeLower){
  password += passChar.lower
 }
 if (includeUpper){
  password += passChar.upper
 }
 if (includeNumber){
  password += passChar.number
 }
 if (includeSymbol){
  password += passChar.symbol
 }
 
 while (passLength>password.length){   if (includeLower){
  password += passChar.lower
 }
 if (includeUpper){
  password += passChar.upper
 }
 if (includeNumber){
  password += passChar.number
 }
 if (includeSymbol){
  password += passChar.symbol
 }
}

return password




}

console.log(generatePassword())



function getLength() {
  const length = prompt("Choose the length of the password");
  if (length === null) {
    return null;
  }
  let parsedLength = parseInt(length);
  if (isNaN(parsedLength) || parsedLength < 8 || parsedLength > 128) {
    return null;
  }
  return parsedLength;
}




function randomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random()*26)+97);
}


function randomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function randomSymbol() {
  return String.fromCharCode(Math.floor(Math.random()*15)+33);
}

console.log(randomLowerCase())
console.log(randomUpperCase())
console.log(randomNumber())
console.log(randomSymbol())

