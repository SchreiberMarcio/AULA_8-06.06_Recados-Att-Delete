// Lista os recados
const tableBody = document.getElementById("tbody-recados");
const buttonEditar = document.getElementById("buttonEditar");
const pageNumberElement = document.getElementById("pageNumber");
const previousPageButton = document.getElementById("previousPage");
const nextPageButton = document.getElementById("nextPage");

let currentPage = 1;
const registrosPorPagina = 10;


async function listarRecados(pagina = 1, registrosPorPagina = 10) {
  try {
    // const getRecados = await api.get(`/recados`, {
    //   headers: { Authorization: userLoggedId },
    // });

    // api.METHOD('enpoint')

    // GET => api.get('endipont', configurações )  configurações = { header: {}, ... }
    // POST => api.post('enpoint', dadosBody, configurações )

    const getRecados = await api.get(`/recados`, {
      params: {
        page: pagina,
        limit: registrosPorPagina,
      },
    });

    console.log(getRecados.data);

    const listarRecado = getRecados.data.data.recados;

    tableBody.innerHTML = "";

    for (let indice = 0; indice < listarRecado.length; indice++) {
      tableBody.innerHTML += `
        <tr>
          <td>${listarRecado[indice].id}</td>
          <td>${listarRecado[indice].title}</td>
          <td>${listarRecado[indice].description}</td>
          <td class="td-actions">
            <button id="buttonEditar" class="btn btn-att">Editar</button>
            <button class="btn btn-delete">Excluir</button>
          </td>
        </tr>
        <br>
      `;
    }

    pageNumberElement.textContent = pagina;

    
    previousPageButton.disabled = pagina === 1;

    
    const totalRecados = getRecados.data.data.totalRecados;
    const totalPaginas = Math.ceil(totalRecados / registrosPorPagina);
    nextPageButton.disabled = pagina >= totalPaginas;


  } catch (error) {
    console.error(error.message);
  }
}

previousPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    listarRecados(currentPage, registrosPorPagina);
  }
});

nextPageButton.addEventListener('click', () => {
  currentPage++;
  listarRecados(currentPage, registrosPorPagina);
});

window.onload = () => listarRecados(currentPage, registrosPorPagina);

window.onload = listarRecados();
