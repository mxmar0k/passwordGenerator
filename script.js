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



// 8. this was the last step, we selected the button with the id generate to call the generatePassword() function, then we added and event listener to a click to callback that function and then we display it in the "id=password" text area, using the value of the generated password  and setting it or copying it to the passwordTextArea.value

// 9. if the user does not chooses a character, then it will display in the text area to select a character type and it will display an alert also. I think it looks cool, but I know we should not repeat ourselves.


const generateButton = document.getElementById('generate');
const passwordTextarea = document.getElementById('password');

generateButton.addEventListener('click', () => {
  const password = generatePassword();
  
  if (password === null) {
    alert("Please select at least one character type.");
    passwordTextarea.value=("Error: Please select at least one character type.")
  } else {
    passwordTextarea.value = password;
  }
});


// 0. In this step we created an object called passChar, with a getter function, to get the value for random lower, upper, number and symbol. We get the value with the return function

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


/* This is the function, we will break it here:

1. In first place we created a variable passLength with a function to get the length of the password, all with an alert to use numbers between 8 and 128, in case the return of the getLength() is null*/


function generatePassword() {
  let passLength= getLength()
  while(passLength===null){
      alert("Must be a number between 8 and 128!")
      passLength=getLength()
  }

 

 /*

 2. This was the initial code to use lower, upper, number and symbols. It is a very simple code, we created a variable called password and with the += operator we add a random character (lower, upper, number, symbol)

 Then we used a while function, with the variable passLength and password.length. As long as the first is greater than the second it will keep adding more.

 There is a mini-bug, but we will address it later regarding the return of the password; for example if is ask for 10 it will give me 12 char, because of the while hehehehehe (sad computer noises)

 let password= "";
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




 /*
 3. This is try number 2, adding the confirm  to a variable to include upper, lower, number, symbol.

 the we added if statements to the +=, if the user chooses not to include certain case, number or symbol, it will not display. Then we copied that if statement to the additional lenght.


 
 */

 let password = "";
 
 const includeLower = confirm("Include lowercase characters?")
 const includeUpper = confirm("Include uppercase characters?")
 const includeNumber = confirm("Include number characters?")
 const includeSymbol = confirm("Include symbol characters?")

 if (!includeLower && !includeUpper && !includeNumber && !includeSymbol) {
  return null; //this is in case there is no char selected, because i tried it and the page exploded (sad computer noises again)
}

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


/*
4. We use this fisher yates alg, to shuffle the password, because i didn't like that the password has a structure of aA3#aA3#aA3# infinite. Somehow it doesn't feel quite secure. 


first we create a variable of the password into an array separated with ''.
Then we get a for loop with an i variable where we get the index of the password array with -1, we run the loop as long as i is greater than 0, and every time we run the loop we substract one from the index, it means we go from the last to the first 

Next we created a j variable which creates a random index, where we can swap between i and j. This is importat because when we multiply the random float times (i+1) we ensure that j includes the current index of i.
the next line is used for the swap between those indexes

and finally we return the password array and we cut it or slice between 0 and the passLenght so when we used 10 chars, it does not give us 12 (this is the minibug I talked on line 58)
*/

const passwordArray = password.split('');
for (let i = passwordArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
}

return passwordArray.slice(0, passLength).join('');


}

//console.log(generatePassword()) this was just for checking, but I will leave it there


//this is the end of the main code



//now we will take a look at the other functions:

//6. the getLenght function makes us choose just a number between 8 and 128, we convert the string to integer with parseInt and the we add the parameters, if it does not comply with them it returns null and makes you try a valid number


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

/*7. this is the random lower case, upper, number and symbol functions. With this code we get a string value from the char sets https://www.w3schools.com/html/html_charset.asp

we multiply times 26, 10 or 15 to the get the index of the charset and then we add 97, 65, 48 or 33 to move the index between the desired characters, this prevents us from using an array of the alphabet in lower case, then another in upper, then another of num...(***Falls asleep)


*/






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

//this logs are just for checking i did not messes up hahahaha console.log is friend

console.log(randomLowerCase())
console.log(randomUpperCase())
console.log(randomNumber())
console.log(randomSymbol())

