window.onload = () => {
    const input = document.querySelector('#buscar'); //apuntamos al input
    const btnBuscar = document.querySelector('#btn_buscar');//apuntamos al boton
    const resultado = document.querySelector('#resultado');//apuntamos al div
    const apikey = 'Src8pW3M4bO8qhFtITSj1L8FjTwWSZwG';

    btnBuscar.addEventListener('click', () => {//escuchamos el click
        const gif = input.value.toLowerCase().trim();//obtenemos lo que escribio el usuario y lo convertimos a minuscula eliminando espacios
        
        // Validación campo vacío
        if (!gif) {
            resultado.innerHTML = '<p class="error">Por favor ingresa un término de búsqueda</p>';
            input.focus();
            return;
        }

        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${encodeURIComponent(gif)}&limit=10`;
        resultado.innerHTML = '<p class="cargando">Buscando GIFs...</p>';

        fetch(url)//hacemos la peticion a la api
        .then((response) => response.json())//convertimos a json
        .then((data) => {//mostramos la data en la consola
            console.log('datos recibidos', data);

            // Limpiamos el mensaje de carga
            resultado.innerHTML = '';

            // Validación de resultados vacíos
            if (!data.data || data.data.length === 0) {
                resultado.innerHTML = `
                    <div class="sin-resultados">
                        <p>No encontramos GIFs para "${gif}"</p>
                        <p>escribe algo coherente por fa -_-</p>
                    </div>
                `;
                return;
            }

            // Mostrar resultados
            data.data.forEach(gif => {//recorremos el resultado
                const contenedorGif = document.createElement('div');//creamos un div que contenga a cada gif
                contenedorGif.className = 'gif-container';
                
                const imagen = document.createElement('img');
                imagen.src = gif.images.fixed_height.url;
                imagen.alt = gif.title;
                imagen.className = 'gif-img';
                
                contenedorGif.appendChild(imagen);//agregamos los divs al div resultado
                resultado.appendChild(contenedorGif);
            });

        })
        .catch(error => {
            console.error('Error:', error);
            resultado.innerHTML = `
                <p class="error">Ocurrió un error al buscar los GIFs. Intenta nuevamente.</p>
            `;
        });
    });
}