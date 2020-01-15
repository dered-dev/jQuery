/*$.ajax({
    url: "https://rickandmortyapi.com/api/character",
    data: data,
    success: success,
    dataType: dataType
  });*/
  /*
Verbos de http
Operaciones CRUD
    C reate
    R ead
    U pdate
    D elete
Get : traer datos
Post : enviar datos
Delete : eliminar datos
Patch : actualizar datos
*/
$(document).on('click','.delete-user',(event) => {
  let userKey = $(event.target).data("user-key");
  console.log(userKey)
  $.ajax({
      url:`https://jquerycrud-ed8dc.firebaseio.com/users/${userKey}.json`,
      method:"DELETE",
      success:(response)=>{
        printUsers();
      }
  })
})


const postUser = (userData) => {
  $.ajax({
      url: "https://jquerycrud-ed8dc.firebaseio.com/users/.json",
      method: "POST",
      data: JSON.stringify(userData),
      success: (response) => {
          console.log(response);
          printUsers();
      }
  });
}
const getUserData = () => {
  let userName = $("#user-name").val()
  let userAge = $("#user-age").val()
  let userPhone = $("#user-phone").val()
  // validate empty form
  var validateForm = true
  $('.form__addKoder input').each(function(){
    if($(this).val() === ""){
      $(this).addClass('is-invalid')
      validateForm = false;
    }
  });
  if(validateForm == true){
    let userObject = {userName, userAge, userPhone}
    postUser(userObject);
  }
}
$('.form__addKoder input').keyup(function(){
  if($(this).hasClass('is-invalid')){
    if($(this).val() !== ""){
      $(this).removeClass('is-invalid')
    }else{
      $(this).addClass('is-invalid')
    }
  }
})

const printUsers = () => {
  let usersCollection = {};
  $("#users-table tbody").empty();
  $.ajax({
      url:"https://jquerycrud-ed8dc.firebaseio.com/users/.json",
      method:"GET",
      success:(response) => {
          usersCollection = response;
          let i = 1;
          $.each(usersCollection, (key, value) => {
              $("#users-table tbody").append(`
              <tr>
                  <td scope="row" data-val="${i}">${i}</th>
                  <td data-val="${key}">${key}</td>
                  <td class="editable__td name" data-val="${value.userName}">${value.userName}</td>
                  <td class="editable__td age" data-val="${value.userAge}">${value.userAge} años</td>
                  <td class="editable__td phone" data-val="${value.userPhone}">${value.userPhone}</td>
                  <td class="options__table">
                    <button class="btn btn-danger delete-user normal__button" data-user-key=${key}>Eliminar</button>
                    <button class="btn btn-primary btnUpdate-user normal__button" data-user-key=${key} data-id="${i}">Editar</button>
                    <button class="btn btn-light btnCancel__edit edited__button" data-user-key=${key} data-id="${i}">Cancelar</button>
                    <button class="btn btn-primary btnUpdate__edit edited__button" data-user-key=${key} data-id="${i}">Guardar</button>
                  </td>
              </tr>
              `)
              i++
          })
      }
  })
}

printUsers()

var dataOldEdited = {}
$(document).on('click','.btnUpdate-user',function(e){
  e.preventDefault()
  var userKey = $(this).data('user-key')
  var idRow = $(this).data('id')
  var btnUpdate = $(this)
  $.ajax({
    url:`https://jquerycrud-ed8dc.firebaseio.com/users/${userKey}.json`,
    method:"GET",
    success:(response)=> {
      console.log(userKey)
      console.log(response)
      //return response
      dataOldEdited = response;
      $('#table__body tr').eq(idRow-1).find('td.name').html(`<input type="text" value="${response.userName}">`)
      $('#table__body tr').eq(idRow-1).find('td.age').html(`<input type="text" value="${response.userAge}">`)
      $('#table__body tr').eq(idRow-1).find('td.phone').html(`<input type="text" value="${response.userPhone}">`)
      $('#table__body tr').eq(idRow-1).find('td.name').find('input').focus()
      btnUpdate.closest('.options__table').addClass('is-edited')
    }
  })
})

$(document).on('click','.btnCancel__edit', (e)=>{
  var idRow = e.target.dataset.id
  $('#table__body td.editable__td').each((e)=> {
    console.log($(event))
    //console.log($(this).data('val'))
    var name= $('#table__body tr').eq(idRow-1).find('td.name').data('val')
    var age= $('#table__body tr').eq(idRow-1).find('td.age').data('val')
    var phone= $('#table__body tr').eq(idRow-1).find('td.phone').data('val')
    $('#table__body tr').eq(idRow-1).find('td.name').html(name)
    $('#table__body tr').eq(idRow-1).find('td.age').html(age)
    $('#table__body tr').eq(idRow-1).find('td.phone').html(phone)
  })

  $('#table__body td.editable__td input').remove()
  $('.options__table').removeClass('is-edited')
})
$(document).on('click','.btnUpdate__edit', (e)=>{
  var idRow = e.target.dataset.id
  var key = $(e.target).data('user-key')
  var userName = $('#table__body tr').eq(idRow-1).find('td.name').find('input').val()
  var userAge = $('#table__body tr').eq(idRow-1).find('td.age').find('input').val()
  var userPhone = $('#table__body tr').eq(idRow-1).find('td.phone').find('input').val()
  let userObject = JSON.stringify({userName, userAge, userPhone})
  console.log(userObject)
  $.ajax({
    url:`https://jquerycrud-ed8dc.firebaseio.com/users/${key}.json`,
    method:"PUT",
    data: userObject,
    success:(response)=>{
      $('#editModal').modal('hide')
      $('.options__table').removeClass('is-edited')
      printUsers();
    }
  })
  
  
})


$('.saveModalEdit').click(function(){
  var key = $(this).data('user-key')
  let userName = $("#user-name_edited").val()
  let userAge = $("#user-age_edited").val()
  let userPhone = $("#user-phone_edited").val()
  let userObject = JSON.stringify({userName, userAge, userPhone})
  $.ajax({
    url:`https://jquerycrud-ed8dc.firebaseio.com/users/${key}.json`,
    method:"PUT",
    data: userObject,
    success:(response)=>{
      $('#editModal').modal('hide')
      printUsers();
    }
  })
})


$('#editModal').on('hidden.bs.modal', function (e) {
  $('#user-name_edited').val('')
  $('#user-age_edited').val('')
  $('#user-phone_edited').val('')
})

const getUSer = (userKey) =>{
  $.ajax({
    url:`https://jquerycrud-ed8dc.firebaseio.com/users/${userKey}.json`,
    method:"GET",
    success:(response)=>{
      
      // $('#user-name_edited').val(response.userName)
      // $('#user-age_edited').val(response.userAge)
      // $('#user-phone_edited').val(response.userPhone)
      // $('.saveModalEdit').data('user-key',userKey)
      // $('#editModal').modal('show')

      console.log(userKey)
      console.log(response)
      return response
    }
  })
}

$('.saveModalEdit').click(function(e){
  e.preventDefault()
  console.log($(this).data('user-key'))
  
})