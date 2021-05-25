
  function addTask() {
    
      // get value from textarea, assign random ID, check if not empty
      const task = document.getElementById('task').value;
      let id = Math.random(1000000)
      if (task == '') {
        alert('note must be filled out');
        return false;
      }

      // save note list to memory
      var list = document.getElementById('note-list');
      
      // instantiate container for textarea and buttons
      var noteContainer = document.createElement('div');
      noteContainer.setAttribute('class', 'note-container');

      // instantiate container for button elements
      var buttonContainer = document.createElement('div');
      buttonContainer.setAttribute('class', 'button-container');

      // instantiate edit button
      editButton = createEditButton(id)

      // instantiate save button
      saveButton = createSaveButton(id)

      // instantiate delete button
      deleteButton = createDeleteButton(id)

      // add button elements to the button container
      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(saveButton);
      buttonContainer.appendChild(deleteButton);
      
      // instantiate text area
      noteText = createTextArea(id, task, list)

      // create a list element to store note container
      var entry = document.createElement('li');
      entry.setAttribute('id', id);

      //append the list item to the list
      list.appendChild(entry);

      //apprend note textarea and button elements to note container
      noteContainer.appendChild(noteText)
      noteContainer.appendChild(buttonContainer)

      //append the notecontainer to the list item
      entry.appendChild(noteContainer)
      
      document.getElementById('task').value = ""

      return false
    }

  function setDefaultBorder(note) {
    note.style.borderWidth = "2px";
    note.style.borderStyle = "inset";
    note.style.borderColor = "initial";
    note.style.borderImage = "initial";
  }

  function createEditButton(id) {
    var editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.className += 'edit';
    editButton.onclick = function(){
      const editElement = document.getElementById("t" + id);
      editElement.removeAttribute('readOnly')
      editElement.style.backgroundColor= 'white';
    }
    return editButton
  }

  function createSaveButton(id) {
    var saveButton = document.createElement('button');
    saveButton.innerHTML = 'Save';
    saveButton.className += 'save';
    saveButton.onclick = function(){
      const saveElement = document.getElementById("t" + id);
      saveElement.setAttribute('readOnly', true)
      saveElement.style.backgroundColor= 'rgb(189, 185, 185)';
    }
    return saveButton
  }

  function createDeleteButton(id) {
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.className += 'delete';
    deleteButton.onclick = function(){
      const deleteElement = document.getElementById(id);
      deleteElement.parentNode.removeChild(deleteElement);
    }
    return deleteButton
  }

  function createTextArea(id, task, list) {
    var noteText = document.createElement('textarea')    
    noteText.setAttribute('id', "t" + id)
    noteText.setAttribute('readOnly', true)
    noteText.setAttribute('class', 'note');
    noteText.onclick = function (){
       // on clicking text area loop through all list items and check if another has been selected 
         // if so, swap the values 
       if (noteText.style.border === "2px solid black") {
         setDefaultBorder(noteText)
       } else if (noteText.readOnly === true) {
         noteText.style.border = "2px solid black"
       }
  
       if(list.children[0].children.length > 0){
         for(note in list.children) {
           let noteDiv = list.children[note].children[0].children[0]

           if(noteDiv.style.border === "2px solid black" && noteText.style.border === "2px solid black" && noteDiv.id !== noteText.id) {
             let tempValue = noteText.value
             noteText.value = noteDiv.value
             noteDiv.value = tempValue
             setDefaultBorder(noteText)
             setDefaultBorder(noteDiv)
           }
         }
       }
     }
    noteText.appendChild(document.createTextNode(task));
    return noteText
  }