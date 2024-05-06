export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

export const geoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '45772b1930msh7c0cfd85fdd21b2p173a93jsn795fdfa99c14',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, geoApiOptions);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}