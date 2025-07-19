export default async function makeF1Request<T>(url: string): Promise<T | null> {
  try {
    let finalUrl = new URL(url);
    finalUrl.searchParams.set("format", "json");
    const response = await fetch(finalUrl.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making Ergast API request", error);
    return null;
  }
}
