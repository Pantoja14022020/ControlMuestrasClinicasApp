const loaderAnimation = document.getElementById('loader-animation');//Selecciono el loader que hice
const containerUnidades = document.getElementById('contenedor-carpetas');//Seleccino el contenedor que contendra las unidades
const searchComunidad = document.getElementById('search-comunidad');//Selecciono el search de tipo input
let urlGetMunicipios = 'https://clinicalserviceapi.onrender.com/api/paciente';



//ESTO REALIZA LA PETICION Y LO PINTA EN LA INTERFAZ
$.ajax({
    url: urlGetMunicipios,
    type: 'GET',
    success: function( {pacientes} ) {

        //borrar el localstorage de la carpeta seleccionada
        localStorage.removeItem('carpetaSeleccionada')

        const unidades = new Set();

        pacientes.forEach(paciente => {
            const {unidad} = paciente;
            unidades.add(unidad);
        });
        
        containerUnidades.innerHTML = '';

        unidades.forEach(unidad => {
            const unidadHTML = `
                <a class="carpeta" data-name-unidad="${unidad.toLowerCase().trim()}" href="personas.html">
                    <img src="./assets/folder.png" alt="folder" />
                    <p>${unidad.toLowerCase()}</p>
                </a>
            `;
            containerUnidades.innerHTML += unidadHTML;
        })

        loaderAnimation.classList.add('hide');






        //FUNCION PARA EL BUSCADOR
        //Creo un arreglo con los nombres de las unidades obtenidas
        const nombreUnidades = [];
        for(let i = 0; i < containerUnidades.children.length; i++){
            nombreUnidades.push(containerUnidades.children[i].getAttribute('data-name-unidad'));
        }
        const filtrosNombreUnidades = [...nombreUnidades];

        
        //Logica del buscador, aqui ya tiene sentido buscar las diferentes unidades
        searchComunidad.addEventListener('input', e => {
            let buscando = e.target.value.toLowerCase();
            const unidadesEncontradas = filtrosNombreUnidades.filter( nombre => nombre.includes(buscando));
            
            containerUnidades.innerHTML = '';

            filtrosNombreUnidades.forEach(nombre => {
                if(unidadesEncontradas.includes(nombre)){
                    const htmlCarpeta = `
                        <a class="carpeta" data-name-unidad="${nombre}"  href="personas.html">
                            <img src="./assets/folder.png" alt="folder" />
                            <p>${nombre}</p>
                        </a>
                    `;
                    containerUnidades.innerHTML += htmlCarpeta;
                }
            })


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
            })
            
        });
        //AQUI TERMINA CODIGO PARA HACER LA FUNCIONALIDAD DEL BUSCADOR





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
        })
      
    },
    error: function(xhr, status, error) {
      console.log("No se pudo hacer la peticion")
    }
});