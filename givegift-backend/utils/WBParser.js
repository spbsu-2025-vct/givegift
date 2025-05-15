// Build the market link for a given product
function generateMarketLink(title, minBudget, maxBudget) {
    const encodedTitle = encodeURIComponent(title);
    return `https://www.wildberries.ru/catalog/0/search.aspx?page=1&sort=popular&search=${encodedTitle}&priceU=${minBudget}00%3B${maxBudget}00`;
}

// Build the Wildberries search URL for a given query and price range
function getSearchLink(query, minBudget, maxBudget) {
    const encodedQuery = encodeURIComponent(query);
    return [
        'https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1',
        `&curr=rub&dest=-1257786`,
        `&priceU=${minBudget}00;${maxBudget}00`,
        `&page=1&query=${encodedQuery}`,
        `&resultset=catalog&sort=popular&spp=24`,
        `&suppressSpellcheck=false`
    ].join('');
}

// Fetch the search results JSON from Wildberries
async function getQueryData(queryLink) {
    const rawResponse = await fetch(queryLink);
    return await rawResponse.json();
}

// Extract the first product ID & name from the response
function getFirstProductIdAndName(response, adult = false) {
    try {
        const products = response?.data?.products;

        if (!Array.isArray(products) || products.length === 0) return null;

        const product = adult ? products[0] : (products.find(p => !p.isAdult) || null)
        return [product?.id, product?.name]
    } catch {
        return null;
    }
}


// TODO: their way to store images has changed. Need to look through
// Build the image URL for a given product ID
function getImageLink(productId) {
    try {
        const shortId = Math.floor(productId / 100000);
        // Determine basket based on shortId range
        let basket;
        if (shortId <= 143) basket = '01';
        else if (shortId <= 287) basket = '02';
        else if (shortId <= 431) basket = '03';
        else if (shortId <= 719) basket = '04';
        else if (shortId <= 1007) basket = '05';
        else if (shortId <= 1061) basket = '06';
        else if (shortId <= 1115) basket = '07';
        else if (shortId <= 1169) basket = '08';
        else if (shortId <= 1313) basket = '09';
        else if (shortId <= 1601) basket = '10';
        else if (shortId <= 1655) basket = '11';
        else if (shortId <= 1919) basket = '12';
        else basket = '13';

        const vol = shortId;
        const part = Math.floor(productId / 1000);
        return `https://basket-${basket}.wb.ru/vol${vol}/part${part}/${productId}/images/big/1.jpg`;
    } catch {
        return null;
    }
}

/* interface IProduct {
    market_link: string;
    title: string;
    img_link: string
} */
async function getProductInfo(productName, minBudget, maxBudget, adult = false) {
    try {
        const productQueryLink = getSearchLink(productName, minBudget, maxBudget);
        const response = await getQueryData(productQueryLink);
        const productIDName = getFirstProductIdAndName(response, adult);
        if (!productIDName) return null;

        const [id, title] = productIDName;
        const imgLink = getImageLink(id);

        return {
            market_link: generateMarketLink(title, minBudget, maxBudget),
            title,
            img_link: imgLink
        }
    } catch (err) {
        console.error(err)
        return null;
    }
}


export { getProductInfo };
