const appID = 'f87c5cdd7ae34707a7169f5fb0c8b2c1';

/**
 * Function for getting the latest exchange rates from the European
 * Central Bank. The function takes a base parameter, and will return
 * the rates for other currencies corresponding to that base.
 * @param		{string}	base	The base currency for the rates
 * @returns	{json}					Returns a json object with the rates
 */
export function getLatestExchangeRates(base) {
	return fetch(`https://api.exchangeratesapi.io/latest?base=${base}`, {
		method: 'GET',
	}).then(async (response) => {
		const json = await response.json();
		return (json);
	}).catch((error) => {
		console.log(error);
		return ('TypeError');
	});
}

/**
 * Function for converting a floating point value from one currency to another.
 * The function takes three parameters with the path params required by the
 * API endpoint. After making a HTTP GET request, it returns the respnonse
 * recived by the endpoint.
 * @param		{float}		value	The value to convert
 * @param		{string}	from	The currency to convert from
 * @param		{string}	to		The currency to convert to
 * @returns	{float}					Returns the floating point converted value
 */
export function convertBetweenCurrencies(value, from, to) {
	return fetch(`https://openexchangerates.org/api/convert/${value}/${from}/${to}?app_id=${appID}`, {
		method: 'GET',
	}).then(async (response) => {
		const json = await response.json();
		return (json);
	}).catch((error) => {
		return ({ error });
	});
}
