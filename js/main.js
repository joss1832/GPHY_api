window.onload = () => {
    const input = document.querySelector('#buscar'); 
    const btnBuscar = document.querySelector('#btn_buscar');
    const resultado = document.querySelector('#resultado');
    const apikey = 'Src8pW3M4bO8qhFtITSj1L8FjTwWSZwG';

    btnBuscar.addEventListener('click', () => {
        const gif = input.value.toLowerCase().trim();
        
        // Validación campo vacío
        if (!gif) {
            resultado.innerHTML = '<p class="error">Por favor ingresa un término de búsqueda</p>';
            input.focus();
            return;
        }

        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${encodeURIComponent(gif)}&limit=10`;
        resultado.innerHTML = '<p class="cargando">Buscando GIFs...</p>';

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('datos recibidos', data);

            // Limpiar el mensaje de carga
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
            data.data.forEach(gif => {
                const contenedorGif = document.createElement('div');
                contenedorGif.className = 'gif-container';
                
                const imagen = document.createElement('img');
                imagen.src = gif.images.fixed_height.url;
                imagen.alt = gif.title;
                imagen.className = 'gif-img';
                
                contenedorGif.appendChild(imagen);
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