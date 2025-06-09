window.onload = () =>{
    const input = document.querySelector('#buscar');
    const btnBuscar = document.querySelector('#btn_buscar');
    const resultado = document.querySelector('#resultado')
    const apikey = 'Src8pW3M4bO8qhFtITSj1L8FjTwWSZwG'


    btnBuscar.addEventListener('click', () =>{
        const gif= input.value.toLowerCase().trim();

        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${encodeURIComponent(gif)}&limit=10`


        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log('datos recibidos', data);

            if (data.data.length === 0){
                resultado.innerHTML = '<h1>No se encontraron resultados</h1>';
                return;
            }

            data.data.forEach(gif => {
                
                const imagen = document.createElement('img');
                imagen.src = gif.images.fixed_height.url;
                imagen.alt = gif.title;
                resultado.appendChild(imagen)
            });

        })
    } )

}