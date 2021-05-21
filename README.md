# CHALLENGE BACKEND - NodeJs 🚀

## Objetivo

Desarrollar una API para explorar el mundo de Disney, la cual permitirá conocer y modificar los
personajes que lo componen y entender en qué películas estos participaron. Por otro lado, deberá
exponer la información para que cualquier frontend pueda consumirla.

👉 Utilizar NodeJs y Express.

👉 No es necesario armar el Frontend.

👉 Las rutas deberán seguir el patrón REST.

👉 Utilizar la librería Sequelize.

⚠️ ¡No es indispensable hacer todo!<br>
Mientras más completes, mayor puntaje obtendrás, pero puedes enviar la app hasta el estadío que la
tengas en base a tu conocimiento actual. Recuerda que el objetivo del challenge es entender tu nivel
de conocimiento actual.

## Requerimientos técnicos

<strong>1. Modelado de Base de Datos</strong>

- Personaje: deberá tener
  - Imagen.
  - Nombre.
  - Edad.
  - Peso.
  - Historia.
  - Películas o series asociadas.
- Película o Serie: deberá tener,
  - Imagen.
  - Título.
  - Fecha de creación.
  - Calificación (del 1 al 5).
  - Personajes asociados.
- Género: deberá tener,
  - Nombre.
  - Imagen.
  - Películas o series asociadas.

<strong>2. Autenticación de Usuarios</strong>

Para realizar peticiones a los endpoints subsiguientes el usuario deberá contar con un token que
obtendrá al autenticarse. Para ello, deberán desarrollarse los endpoints de registro y login, que
permitan obtener el token.

Los endpoints encargados de la autenticación deberán ser:

- /auth/login
- /auth/register

<strong>3. Listado de Personajes</strong>

El listado deberá mostrar:

- Imagen.
- Nombre.

El endpoint deberá ser:

- /characters

<strong>4. Creación, Edición y Eliminación de Personajes</strong>

Deberán existir las operaciones básicas de creación, edición y eliminación de personajes.

<strong>5. Detalle de Personaje</strong>

En el detalle deberán listarse todos los atributos del personaje, como así también sus películas o
series relacionadas.

<strong>6. Búsqueda de Personajes</strong>

Deberá permitir buscar por nombre, y filtrar por edad, peso o películas/series en las que participó.
Para especificar el término de búsqueda o filtros se deberán enviar como parámetros de query:

- /characters?name=nombre
- /characters?age=edad
- /characters?movies=idMovie

<strong>7. Listado de Películas</strong>

Deberá mostrar solamente los campos imagen, título y fecha de creación.

El endpoint deberá ser:

- /movies

<strong>8. Detalle de Película / Serie con sus personajes</strong>

Devolverá todos los campos de la película o serie junto a los personajes asociados a la misma

<strong>9. Creación, Edición y Eliminación de Película / Serie</strong>

Deberán existir las operaciones básicas de creación, edición y eliminación de películas o series.

<strong>10. Búsqueda de Películas o Series</strong>

Deberá permitir buscar por título, y filtrar por género. Además, permitir ordenar los resultados
por fecha de creación de forma ascendiente o descendiente.

El término de búsqueda, filtro u ordenación se deberán especificar como parámetros de query:

- /movies?name=nombre
- /movies?genre=idGenero
- /movies?order=ASC | DESC

<strong>11. Envío de emails</strong>

Al registrarse en el sitio, el usuario deberá recibir un email de bienvenida. Es recomendable, la
utilización de algún servicio de terceros como SendGrid.

## Documentación

Es deseable documentar los endpoints utilizando alguna herramienta como Postman o Swagger.

## Tests

De forma _opcional_, se podrán agregar tests de los diferentes endpoints de la APP, verificando
posibles escenarios de error:

- Campos faltantes o con un formato inválido en BODY de las peticiones
- Acceso a recursos inexistentes en endpoints de detalle

Los tests pueden realizarse utilizando Mocha + Chai.
