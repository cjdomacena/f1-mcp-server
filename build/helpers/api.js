export default async function makeF1Request(url) {
    try {
        const response = await fetch(`${url}?format=json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return (await response.json());
    }
    catch (error) {
        console.error("Error making Ergast API request", error);
        return null;
    }
}
