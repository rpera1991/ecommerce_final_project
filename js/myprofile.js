function getDataProfile() {
    let username = document.getElementById("username").value;
    let nombre = document.getElementById("nombreuser").value;
    let apellidos = document.getElementById("apellidosuser").value;
    let correo = document.getElementById('emailuser').value;
    let telefono = document.getElementById("celluser").value;
    let edad = document.getElementById("edad").value;
    let profile = JSON.parse(localStorage.getItem('profile'))
    let img = profile !== null && profile !== undefined ? profile.img ? profile.img : 'img/avatar.png' : 'img/avatar.png'
    return { usuario: username, nombre, apellidos, correo, telefono, edad, img };

}

function saveInfoLS(profiledata) {
    const profileData = {
        usuario: profiledata.usuario,
        nombre: profiledata.nombre,
        apellidos: profiledata.apellidos,
        correo: profiledata.correo,
        telefono: profiledata.telefono,
        edad: profiledata.edad,
        img: profiledata.img ? profiledata.img : null
    }
    localStorage.setItem('profile', JSON.stringify(profileData))
    window.location = window.location
}

function setElementsInput(profileData) {
    document.getElementById("username").value = profileData.usuario
    document.getElementById("nombreuser").value = profileData.nombre;
    document.getElementById("apellidosuser").value = profileData.apellidos;
    document.getElementById('emailuser').value = profileData.correo;
    document.getElementById("celluser").value = profileData.telefono;
    document.getElementById("edad").value = profileData.edad;
    if (profileData.img) {
        document.getElementById('imgprofile').src = profileData.img
    }
}

function onFileSelected() {
    const file = document.getElementById('selectfile').files[0]
    let fileReader = new FileReader()
    fileReader.onload = () => {
        const profileData = JSON.parse(localStorage.getItem('profile'))
        if (profileData) {
            profileData.img = fileReader.result
            saveInfoLS(profileData)
        } else {
            document.getElementById('imgprofile').src = profileData.img
        }
    }
    fileReader.readAsDataURL(file)
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('imgprofile').src == "" || document.getElementById('imgprofile').src == undefined || document.getElementById('imgprofile').src == null) {
        document.getElementById('imgprofile').src = 'img/avatar.png'
    }
    document.getElementById('imgprofile')
    let profileData = localStorage.getItem('profile')
    if (profileData) {
        profileData = JSON.parse(profileData)
        setElementsInput(profileData)
    }
    document.getElementById('butperfil').addEventListener('click', function(e) {
        var datasave = getDataProfile();
        saveInfoLS(datasave);
    });
});