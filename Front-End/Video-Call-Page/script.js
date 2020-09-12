const uuidGenerator = require("./uuid-Generator");
function copyRoomId() {
  var copyText = document.getElementById("myInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
}

let generateIdButton = document.getElementsByClassName("generateId");
if(generateIdButton){
	console.log("its ok");
}
generateIdButton.addEventListener("click" , () => {
	let roomId = uuidGenerator();
	inputBar = document.getElementById("myInput");
	inputBar.value = roomId;
})