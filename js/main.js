window.onload = () =>{
    const input = document.querySelector('#buscar'); 
    const btnBuscar = document.querySelector('#btn_buscar');
    const resultado = document.querySelector('#resultado')
    const apikey = 'Src8pW3M4bO8qhFtITSj1L8FjTwWSZwG'


    btnBuscar.addEventListener('click', () =>{ // escuchamos el click del boton buscar 
        const gif= input.value.toLowerCase().trim(); //obtenemos los que escribe el usuario

        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${encodeURIComponent(gif)}&limit=10`
        resultado.innerHTML = '';


        fetch(url) //hacemos la peticion a la api
        .then((response) => response.json()) // convertimos la respuesta a json
        .then((data) => {
            console.log('datos recibidos', data);

            if (data.data.length === 0){
                alert ('por favor rellena todos los campos');
                return;
            }

            data.data.forEach(gif => { //recorremos la lista de la api
                
                const imagen = document.createElement('img'); //creamos un elemento imagen 
                imagen.src = gif.images.fixed_height.url; // establecemos la url de la iamgen
                imagen.alt = gif.title;
                resultado.appendChild(imagen) // agregamos la imagen al contenedor resultado
            });

        })
    } )

}