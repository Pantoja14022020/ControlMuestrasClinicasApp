let urlGetMunicipios = 'https://clinicalserviceapi.onrender.com/api/paciente';
const unidadSeleccionada = JSON.parse(localStorage.getItem('carpetaSeleccionada')).toUpperCase();
console.log(localStorage.getItem('carpetaSeleccionada'))
const contenedorPersonas = document.getElementById('contenedor-personas');
const loaderAnimation = document.getElementById('loader-animation');//Selecciono el loader que hice
const searchPersona = document.getElementById('search-persona');//Selecciono el input de buscador

//ESTO REALIZA LA PETICION Y LO PINTA EN LA INTERFAZ
$.ajax({
    url: urlGetMunicipios,
    type: 'GET',
    success: function( {pacientes} ) {
       
        //borrar el localstorage de la carpeta seleccionada
        //localStorage.removeItem('carpetaSeleccionada')

        const pacientesDeUnidad = new Set();

        pacientes.forEach(paciente => {
            const {id_paciente,unidad,nombre,a_paterno,a_materno,edad} = paciente;
            if(unidad == unidadSeleccionada){//Solo guardo los pacientes que coincidad con la unidad seleccionada
                const newPaciente = {id_paciente,nombre,a_paterno,a_materno,edad};
                pacientesDeUnidad.add(newPaciente);
            }
        });

        contenedorPersonas.innerHTML = '';

        pacientesDeUnidad.forEach(paciente => {
            const {id_paciente,nombre,a_paterno,a_materno,edad} = paciente;
            const pacienteHTML = `
                <div class="persona" href="#" data-id="${id_paciente}" data-name-paciente="${nombre.toLowerCase() + a_paterno.toLowerCase() + a_materno.toLowerCase()}">
                    <div class="persona-left">
                    <i class="fa-solid fa-user-large" id="person-icon"></i>
                    <div class="persona-info">
                        <h2>${nombre + ' ' + a_paterno + ' ' + a_materno}</h2>
                        <p>${edad}</p>
                    </div>
                    </div>
                    <div class="actividad-persona">
                    <div class="status"></div>
                    <a href="citas-form.html"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>
                </div>
            `;
            contenedorPersonas.innerHTML += pacienteHTML;
        })

        loaderAnimation.classList.add('hide');





        
        //FUNCION PARA EL BUSCADOR
        //Creo un arreglo con los nombres de loss pacientes obtenidas
        const nombrePacientes = [];
        for(let i = 0; i < contenedorPersonas.children.length; i++){
            nombrePacientes.push(contenedorPersonas.children[i].getAttribute('data-name-paciente'));
        }
        const filtrosNombrePersonas = [...nombrePacientes];

        
        //Logica del buscador, aqui ya tiene sentido buscar las diferentes unidades
        searchPersona.addEventListener('input', e => {
            let buscando = e.target.value.toLowerCase();
            const pacientesEncontradas = filtrosNombrePersonas.filter( nombre => nombre.includes(buscando));
            
            contenedorPersonas.innerHTML = '';

            filtrosNombrePersonas.forEach(nombre => {
                if(pacientesEncontradas.includes(nombre)){
                    
                    
                    const loquePintare = pacientes.filter(paciente => (paciente.nombre + paciente.a_paterno + paciente.a_materno).toLowerCase() == nombre);
                    
                    loquePintare.forEach(pac => {
                        const {id_paciente, nombre, a_paterno, a_materno,edad} = pac;
                        const htmlPaciente = `
                            <div class="persona" href="#" data-id="${id_paciente}" data-name-paciente="${nombre.toLowerCase() + a_paterno.toLowerCase() + a_materno.toLowerCase()}">
                                <div class="persona-left">
                                <i class="fa-solid fa-user-large" id="person-icon"></i>
                                <div class="persona-info">
                                    <h2>${nombre + ' ' + a_paterno + ' ' + a_materno}</h2>
                                    <p>${edad}</p>
                                </div>
                                </div>
                                <div class="actividad-persona">
                                <div class="status"></div>
                                <a href="citas-form.html"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                                </div>
                            </div>
                        `;
                        contenedorPersonas.innerHTML += htmlPaciente;
                    })
                    
                    
                }
            })
            
        });
        //AQUI TERMINA CODIGO PARA HACER LA FUNCIONALIDAD DEL BUSCADOR




        /*
        //CAPTURAR EVENTO CUANDO SE DE CLICK EN UNA CARPETA Y GUARDAR EL DATO EN EL LOCAL STORAGE
        containerUnidades.childNodes.forEach(carpeta => {
            carpeta.addEventListener('click', e => {

                let valorSeleccionado = "";
                if(!e.target.getAttribute('data-name-unidad')){
                    valorSeleccionado = e.target.parentNode.getAttribute('data-name-unidad')
                }else{
                    valorSeleccionado = e.target.getAttribute('data-name-unidad')
                }
                localStorage.setItem('carpetaSeleccionada', JSON.stringify(valorSeleccionado));

            });
        })*/
      
    },
    error: function(xhr, status, error) {
      console.log("No se pudo hacer la peticion")
    }
});