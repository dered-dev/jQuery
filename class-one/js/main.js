/*sujeto,verbo,predicado*/
$('#flex-btn').on('click', () => {
  $('#square-wrapper').toggleClass("d-flex");
  /* question ? if true : if false*/
  $('#square-wrapper').hasClass('d-flex') ? $('#flex-btn').text('Go Block!') : $('#flex-btn').text('Go Flex!')

})
$('.toggleFlex').change(function () {
  var newClass = 'd-flex square-wrapper ' + $(this).val()
  $('#square-wrapper').removeClass().addClass(newClass)
})


/*Escribir una tarea
Presionar el botón para agregarla
    debe escuchar un click
    obtener el valor del input
    limpiar el input
    crear un li
    agregamos el valor obtenido como texto del li
    insertar en la lista*/

var taskArray = JSON.parse(localStorage.getItem("taskArray"));

$('.to-do-wrapper .btn').on('click', () => {
  let task = $('#task-input').val();
  if (task !== "") {
    $('#task-input').val("");
    let taskLi = `<li class="list-group-item">${task} <button type="button" class="btn btn-danger js__deleteTask">X</button> </li>`
    $('.task-list').append(taskLi);
    taskArray.push(task);
    localStorage.setItem("taskArray", JSON.stringify(taskArray))
  } else {
    $('#task-input').addClass('is-invalid').focus()
  }
})

// remove item for list and localStorage
const removeLocalTasks = (arr,index) =>{
  arr.splice(index, 1)
  localStorage.setItem("taskArray", JSON.stringify(arr))
}

$(function () {

  // fill list local storage
  var previousTasks = JSON.parse(localStorage.getItem("taskArray"))
  if (previousTasks !== null) {
    previousTasks.forEach((task) => {
      let taskLi = ` <li class="list-group-item">${task} <button type="button" class="btn btn-danger js__deleteTask">X</button>
      </li>`
      $('.task-list').append(taskLi);
    })
  }

  // Delete item task
  $(document).on('click','.js__deleteTask', (event) => {
    var index = $(event.target).closest('.list-group-item').index()
    $(event.target).closest('.list-group-item').remove()
    removeLocalTasks(taskArray,index)
  })

})