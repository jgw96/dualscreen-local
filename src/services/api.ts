const subscriptionKey = '546f48803dbb4d428bdcd38ccc4f6440';

const host = 'api.cognitive.microsoft.com/bing';
const path = '/v7.0/localbusinesses/search';

let mkt = 'en-US';

export async function search(query: string) {
  const response = await fetch(`https://${host}${path}?q=${query}&mkt=${mkt}`, {
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    }
  });
  const data = await response.json();
  console.log(data);
  return data.places.value;
}