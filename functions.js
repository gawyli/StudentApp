/////////////////////////////////////////////////////////////////////////////
// ##---------------------> Local variables <------------------------------##

/* ##------------------------------------------------------->NOT FINISH YET (Calculator)<----------------------------------------------##

// ##----------------------> Calculator variables <------------------------##
let wage = parseFloat(localStorage.getItem("studentWage"));
//console.log(wage);

let month = 1;
if (localStorage.getItem("countMonths") != null)
{
	month = localStorage.getItem("countMonths");
}

let listOfMonthsNew = [];
let listOfMonths = JSON.parse(localStorage.getItem("monthData"));
//console.log(listOfMonths);
let totalHours = 0;
if (localStorage.getItem("tH") != null)
{
	totalHours = parseInt(localStorage.getItem("tH"));
}
//console.log(totalHours);
*/


let adminUser = {};

let usersList = JSON.parse(localStorage.getItem("users"));

// admin
if (usersList == null) {
	let tempAdmin = [];
	adminUser.userName = "admin";
	adminUser.pwd = "123";
	adminUser.email = "admin@gmail.com";
	tempAdmin.push(adminUser);
	localStorage.setItem("users", JSON.stringify(tempAdmin));
}
else
{
	let isExist = false;
	for (let i = 0; usersList.length > i; i++)
	{
		if (usersList[i].userName == "admin")
		{
			isExist = true;
        }
	}

	if (!isExist)
	{
		adminUser.userName = "admin";
		adminUser.pwd = "123";
		adminUser.email = "admin@gmail.com";
		userList.push(adminUser);
		localStorage.setItem("users", JSON.stringify(userList));
    }
}




// ##----------------------> Notes variables <------------------------------##
let noteListNew = [];
let noteList = JSON.parse(localStorage.getItem("notes"));		//Assign to variable noteList the stored JSON string in
																//localStorage and convert it to JS object
																
let paragraph;				//Variable for create an element when user wants display notes
let noteDisplayed = 0;		//Count how many notes are displayed at the moment

/////////////////////////////////////////////////////////////////////////////
// ##-------------------------> FUNCTIONS <--------------------------------##

/////////////////////////////////////////////////////////////////////////////
// ##----------------------> Back function <-------------------------------##
function backWeb()
{
	window.history.back();
}

/////////////////////////////////////////////////////////////////////////////
// ##---------------------> Login function <-------------------------------##
function login()
{ 
	let userNumber = 0;

	usersList = JSON.parse(localStorage.getItem("users"));
	let isMatch = false;

	userName = document.getElementById("userName").value;
	pwd = document.getElementById("pwd").value;

	if (usersList == null)
	{
		alert("Login or Password incorrect!");
    }

	for (let i = 0; usersList.length > i; i++)
	{
		storedUserName = usersList[i].userName;
		storedPwd = usersList[i].pwd;

		if (userName == storedUserName && pwd == storedPwd) {
			isMatch = true;
			userNumber = i;
		}
	}

	localStorage.setItem("uN", userNumber);

	if (!isMatch) {
		alert("Login or Password incorrect!");
	}
	else
	{
		alert("Login success!");
		window.open("menu.html", "_self");
    }
	
}

/////////////////////////////////////////////////////////////////////////////
// ##---------------------> Reg-page function <-------------------------------##
function regmove()
{
	window.open("reg.html", "_self");
}

/////////////////////////////////////////////////////////////////////////////
// ##---------------------> Login function <-------------------------------##
function reg() {
	
	let newUser = {};

	if (userName.value == "") {
		alert("Username cannot be empty!");
	}
	else if (pwd.value == "") {
		alert("Password cannot be empty!");
	}
	else if (email.value == "") {
		alert("E-mail cannot be empty!");
	}
	else
	{
		newUser.userName = userName.value;
		newUser.pwd = pwd.value;
		newUser.email = email.value;

		usersList.push(newUser)
		localStorage.setItem("users", JSON.stringify(usersList));

		alert("Account created!");
		window.open("index.html", "_self");
    }
	
}

/////////////////////////////////////////////////////////////////////////////
// ##---------------------> Logout function <-------------------------------##
function signout()
{
	window.open("index.html", "_self");
}

/////////////////////////////////////////////////////////////////////////////
// ##-----------------> Forgot password function <-------------------------##
function forgotPwd()
{
	let userEmail = prompt("Enter your e-mail:");
	let isCorrect = false;
	let numberOfUser = 0;
	for (let i = 0; usersList.length > i; i++)
	{
		if (userEmail == usersList[i].email)
		{
			isCorrect = true;
			numberOfUser = i;
		}
	}

	if (isCorrect) {
		alert(usersList[numberOfUser].pwd);
	}
	else
	{
		alert("Incorrect email!");
    }
}

/////////////////////////////////////////////////////////////////////////////
// ##-------------------------> Show username on the top <-----------------##
window.onload = function userName()
{
	userNumber = localStorage.getItem("uN");
	document.getElementById("user").innerHTML = usersList[userNumber].email;
}

/////////////////////////////////////////////////////////////////////////////
// ## =========================> CALENDAR <================================##
/////////////////////////////////////////////////////////////////////////////
// ##---------------> upload calendar function <---------------------------##
/*function changeUrl(event)
{
	var noImage = "/img/noimg.svg";
	var image = document.getElementById("pic");
	var isCalendar = false;
	var aUrl;
	var imgUrl;
	
	if (event.files[0].name.match(/.(jpg|jpeg|png|gif)$/i))
	{
		isCalendar = true;
	}
	
	if (isCalendar)
	{
		aUrl = document.getElementById("imgUrl");
		imageUrl = URL.createObjectURL(event.files[0]);
		image.src = imageUrl;
		aUrl.href = imageUrl;
	}
	
	else if (!isCalendar)
	{
		aUrl = document.getElementById("imgUrl");
		imageUrl = URL.createObjectURL(noImage);
		image.src = imageUrl;
		aUrl.href = imageUrl;
	}
}
*/

function upload()
{
	const recentImageDataUrl = localStorage.getItem("recent-image");
	
	if (recentImageDataUrl) 
	{
		document.querySelector(".imgPreview").setAttribute("src", recentImageDataUrl)
	}
}

/////////////////////////////////////////////////////////////////////////////
// ## =========================> NOTES <===================================##
/////////////////////////////////////////////////////////////////////////////
// ##--------------------------> Save note <-------------------------------##
function saveNote()
{
	let newNote = {};	//Set up empty list take user values
															
	// input id="title"
	newNote.title = title.value;	//Assing wherever is in <input> with id "title", to the list with prefix title
	
	//	textarea id="notes"
	newNote.note = notes.value;		//Assing wherever is in <textarea> with id "notes", to the list with prefix notes
	
	// ## --->Debugging check - see value of title and notes
	//console.log(title.value);
	//console.log(notes.value);
	
	// Validation if any of field are empty
	// If title or note is empty display
	// an alert with infomration that fields cannot be empty
	if (newNote.title == "" || newNote.note == "")
	{
		alert("Fields cannot be empty!");
	}
	else
	{
		if(noteList != null)
		{
			noteList.push(newNote);
			localStorage.setItem("notes", JSON.stringify(noteList));
		}
		else
		{
			noteListNew.push(newNote);
			localStorage.setItem("notes", JSON.stringify(noteListNew));
		}
	}
	
	// ## --->Debugging check - see what is stored in lists.
	//console.log(noteListNew);
	//console.log(noteList);
	
	title.value = "";	//Set up title field for empty string
	notes.value = "";	//Set up notes field for empty string


}

/////////////////////////////////////////////////////////////////////////////
// ##--------------------------> Display notes <---------------------------##
function displayNotes()
{
	if (noteList == null)
	{
		noteList = JSON.parse(localStorage.getItem("notes"));
	}
	//Chcek if list with notes is empty
	//If it is empty, display alert with information
	//That user has not any saved notes
	if (noteList == 0 || noteList == null)
	{
		alert("Empty notes!");
	}
	
	//Check if user display already any notes
	//If not then display all notes that are saved in localStorage
	else if (noteDisplayed == 0)
	{
		for (let i = 0; i < noteList.length; i++)		//Execute loop as long as i is less than
														//amount of item in noteList
		{
			let inputCheck = document.createElement("input");		//Create an input in HTML code
			inputCheck.setAttribute("type", "checkbox");			//Set up a type of input to checkbox
			inputCheck.setAttribute("class", "chk");				//Set up a class name to "chk"
			
			paragraph = document.createElement("p");				//Create a paragraph in HTML code
			paragraph.setAttribute("class", "n");					//Set up a class name to "n"
			paragraph.setAttribute("id", "n" + i);					//Set up id name to "n" and to avoid the same id
																	//each note that is displayed, we add a number to id
			paragraph.appendChild(inputCheck);						//Insert checkbox to paragraph
			
			document.getElementById("notesDiv").appendChild(paragraph);		//Take container div id "notesDiv" and insert paragraph
																			//with checkbox inside
			
			let notesText = document.createTextNode(noteList[i].title + " -> " + noteList[i].note);
			
			document.getElementById("n" + i).appendChild(notesText);
			noteDisplayed++;
			//console.log(noteDisplayed);
			
		}
		//console.log(noteList.length);
	}
	
	else if (noteDisplayed > 0 && noteDisplayed < noteList.length)
	{
		let counter = noteDisplayed;
		//console.log(counter);
		
		
		for (counter; counter < noteList.length; counter++)
		{
			let inputCheck = document.createElement("input");
			inputCheck.setAttribute("type", "checkbox");
			inputCheck.setAttribute("class", "chk");
			paragraph = document.createElement("p");
			paragraph.setAttribute("class", "n");
			paragraph.setAttribute("id", "n" + counter);
			paragraph.appendChild(inputCheck);
			
			document.getElementById("notesDiv").appendChild(paragraph);
			
			let notesText = document.createTextNode(noteList[counter].title + " -> " + noteList[counter].note);
			
			document.getElementById("n" + counter).appendChild(notesText);
			noteDisplayed++;
		}
	}
}

/////////////////////////////////////////////////////////////////////////////
// ##--------------------------> Delete notes <----------------------------##
function deleteNote()
{
	let boxes = document.getElementsByClassName("chk");
	paragraph = document.getElementsByClassName("n");
	
	for (let counter = 0; counter < boxes.length; counter++)
	{
		
		let box = boxes[counter];
		paraText = paragraph[counter];
		//console.log(paragraph[counter].textContent)
		let nn = noteList[counter].title + " -> " + noteList[counter].note;
		
		//console.log(nn);
		if (box.checked)
		{
			if (nn == paraText.textContent)
			{
				document.getElementById("notesDiv").removeChild(paraText);
				noteList.splice(counter, 1);
				let NewNoteList = noteList;
				localStorage.setItem("notes", JSON.stringify(NewNoteList));
				noteDisplayed--;
			}
		}
	}
	
	//console.log(noteDisplayed);
	//localStorage.clear();
	//console.log(noteList);
}

/*
/////////////////////////////////////////////////////////////////////////////
// ## ======================> PAY CALCULATOR <=============================##
/////////////////////////////////////////////////////////////////////////////
// ##----------------------------> Summary <-------------------------------##
function summary()
{
	for (let counter = 0; counter < listOfMonths.length; counter++)
	{
		paragraph = document.createElement("p");
		paragraph.setAttribute("id", "m" + counter)
		paragraph.setAttribute("onclick", "summaryMonth(event)");
		document.getElementById("summaryDiv").appendChild(paragraph);
		
		let monthsText = document.createTextNode("Month " + (counter+1));
		document.getElementById("m" + counter).appendChild(monthsText);
	}
	
}

/////////////////////////////////////////////////////////////////////////////
// ##--------------------> Summary display alert <-------------------------##
function summaryMonth(monthID)
{	
	let message = "";
	let totalHours = 0;
	//console.log(e.target.id);
	let idMonth = monthID.target.id;
	
	for (let i = 0; i < listOfMonths.length; i++)
	{
		//console.log(idMonth);
		//message += "Month: " + (i+1) + "\n";
		if (idMonth == "m" + i)
		{
			for (let j = 0; j < listOfMonths[i].length; j++)
			{
				message += "Day: " + (j+1) + " " + "Hours: " + listOfMonths[i][j] + "\n";
				totalHours += parseInt(listOfMonths[i][j]);
			}
			
			message += "Total work hours: " + totalHours + "\n";
			message += "Your wage: " + wage + "\n";
			let earn = totalHours * wage;
			message += "Earn this month: " + earn;
			
		}
		
		
	}
	
	alert(message);
}

/////////////////////////////////////////////////////////////////////////////
// ##--------------------------> Add hours <-------------------------------##
function addHours()
{
	let daysHours = [];
	let days = prompt("How many days you worked in month " + month + " ? ");
	//console.log(days);
	let daysCounter = 1;
	
	for (let counter = 0; counter < days; counter++)
	{
		daysHours.push(prompt("Day " + daysCounter + " hours: "));
		daysCounter++;
		console.log(daysHours);
		
	}
	if (listOfMonths != null)
	{
		listOfMonths.push(daysHours);
		localStorage.setItem("monthData", JSON.stringify(listOfMonths));
	}
	else
	{
		listOfMonthsNew.push(daysHours);
		localStorage.setItem("monthData", JSON.stringify(listOfMonthsNew));
	}
	
	//console.log(listOfMonths);
	//console.log(listOfMonthsNew);
	month++;
	localStorage.setItem("countMonths", month)
}

/////////////////////////////////////////////////////////////////////////////
// ##---------------------------> Add wage <-------------------------------##
function addWages() 
{
	wage = window.prompt("Enter you wage: ");
	//alert("Your wage is: " + wage);
	localStorage.setItem("studentWage", wage);
	
}

/////////////////////////////////////////////////////////////////////////////
// ##---------------------------> Add wage <-------------------------------##
function clearData() 
{
	
	localStorage.clear();
}
*/
/* ##----------------------> extras <----------------------------------------##

function storeUser()
{
	var userName = document.getElementById("userName").value;
	//alert(userName);
	var pwd = document.getElementById("pwd").value;
	//alert(pwd);
	var cnfPwd = document.getElementById("cnfPwd").value;
	
	if (pwd == cnfPwd)
	{
		alert("checking storage");
		if (typeof(Storage) !== "undefined")
		{
			localStorage.setItem("userName", userName);
			localStorage.setItem("pwd", pwd);
			alert("Username and Password stored!");
		} 
		else
		{
			alert("Not allowed to store on this browser");
		}
	}
	else
	{
		alert("Passowrd does not match!");
	}
	
	document.getElementById("createUserForm").reset();
}
*/
