const pacienteSeleccionado = JSON.parse(localStorage.getItem('pacienteSeleccionado')).toUpperCase();
const urlGetCitasPaciente = `https://clinicalserviceapi.onrender.com/api/paciente-cita/citas/paciente/${pacienteSeleccionado}`;
const contenedorCitas = document.getElementById('contenedor-citas');
const loaderAnimation = document.getElementById('loader-animation');//Selecciono el loader que hice
const urlGetPaciente = `https://clinicalserviceapi.onrender.com/api/paciente/${pacienteSeleccionado}`;



//Esto es para cargar los datos del paciente que tiene citas
$.ajax({
    url: urlGetPaciente,
    type: 'GET',
    success: function( {paciente} ) {
        const containerInfoHeader = document.getElementById('container-info-header');
        
        const {nombre, a_paterno, a_materno, estatus} = paciente[0];

        const htmlInfo = `
            <div id="cih-nombre">
                <i class="fa-regular fa-user"></i>
                <h5>${nombre + ' ' + a_paterno + ' ' + a_materno}</h5>
            </div>
            <div id="cih-estatus">
                <i class="fa-solid fa-gear"></i>
                <h5>${estatus}</h5>
            </div>
        `;

        containerInfoHeader.innerHTML = htmlInfo;
        loaderAnimation.classList.add('hide');
        
    },
    error: function(xhr, status, error) {
        console.log("No se pudo hacer la peticion")
    }
});











//Esto es para cargar las citas de un determinado paciente
$.ajax({
    url: urlGetCitasPaciente,
    type: 'GET',
    success: function( {citas} ) {

        //borrar el localstorage de la carpeta seleccionada
        //localStorage.removeItem('citaSeleccionada')

        const citasPaciente = new Set();

        citas.forEach(cita => {
            const {id_cita, fecha} = cita;//Obtenemos solos los datos que queremos para pintarlos
            const newCita = {id_cita, fecha};//Creamos un objeto que guardaremos en un arreglo
            citasPaciente.add(newCita);
        });

        contenedorCitas.innerHTML = '';

        citasPaciente.forEach(cita => {
            const {id_cita, fecha} = cita;

            //Formatear fecha y hora
            // Crear un objeto Date a partir de la cadena de fecha
            const _fecha = new Date(fecha);
            // Obtener el día, mes y año en palabras
            const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
            const fechaEnPalabras = _fecha.toLocaleDateString('es-ES', opcionesFecha);
            // Obtener la hora, minutos y segundos
            const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const horaEnPalabras = _fecha.toLocaleTimeString('es-ES', opcionesHora);

            const citaHTML = `
                <div class="cita">
                    <i class="fa-regular fa-clock"></i>
                    <div class="cita-fechas">
                        <b>${fechaEnPalabras}</b>
                        <p>${horaEnPalabras}</p>
                    </div>
                    <button id="ver-cita" data-id="${id_cita}"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            `;
            contenedorCitas.innerHTML += citaHTML;
        })

        loaderAnimation.classList.add('hide');
        
    },
    error: function(xhr, status, error) {
    console.log("No se pudo hacer la peticion")
    }
});