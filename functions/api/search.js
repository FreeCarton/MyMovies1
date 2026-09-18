export async function onRequestGet(context) {

    const url = new URL(context.request.url);

    const query = url.searchParams.get("query");

    if (!query) {

        return Response.json({
            error: "Aucun film indiqué"
        });

    }

    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=fr-FR`,
        {
            headers: {
                Authorization: `Bearer ${context.env.TMDB_TOKEN}`,
                Accept: "application/json"
            }
        }
    );

    const data = await response.json();

    return Response.json(data);

}
