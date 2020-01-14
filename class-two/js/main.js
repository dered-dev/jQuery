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
          console.log(response)
          printUsers();
      }
  })
})
const getUsers = () => {
  $.ajax({
      url: "https://jquerycrud-ed8dc.firebaseio.com/users/.json",
      method: "GET",
      success: (response) => {
          console.log(response)
          console.log(typeof response)
          $.each(response, (key, value) => {
              $("body").append(`
                  <p><b>User key: ${key}</b> <i>User Name: ${value.userName}</i></p>
              `)
          })
      }
  });
}
var userObject = {
  userName: "Fernanda",
  userAge: "23",
  userPhone: "5554545455"
}
const patchUser = () => {
  $.ajax({
      url: "https://jquerycrud-ed8dc.firebaseio.com/users/-LyWw5mZ9bCv9Q-YrEUK.json",
      method: "PATCH",
      data: JSON.stringify({userName:"Fernanda Palacios"}),
      success: (response) => {
          console.log(response);
          printUsers();
      }
  });
}
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
  let userObject = {userName, userAge, userPhone}
  postUser(userObject);
}
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
                  <th scope="row">${i}</th>
                  <td>${key}</td>
                  <td>${value.userName}</td>
                  <td>${value.userAge}</td>
                  <td>${value.userPhone}</td>
                  <td>
                    <button class="btn btn-danger delete-user" data-user-key=${key}>Eliminar</button>
                    <button class="btn btn-primary btnUpdate-user" data-user-key=${key} >Editar</button>
                    
                  </td>
              </tr>
              `)
              i++
          })
      }
  })
}
printUsers()


$(document).on('click','.btnUpdate-user',function(e){
  e.preventDefault()
  var hash = $(this).data('user-key')
  var newData = getUSer(hash)
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
      console.log(response)
      $('#user-name_edited').val(response.userName)
      $('#user-age_edited').val(response.userAge)
      $('#user-phone_edited').val(response.userPhone)
      $('.saveModalEdit').data('user-key',userKey)
      $('#editModal').modal('show')
      //return response
    }
  })
}

$('.saveModalEdit').click(function(e){
  e.preventDefault()
  console.log($(this).data('user-key'))
  
})