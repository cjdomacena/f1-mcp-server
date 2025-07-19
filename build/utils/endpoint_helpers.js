const VERSION = "ergast/f1/";
export const BASE_API_URL = `https://api.jolpi.ca/${VERSION}`;
// const availableRoutes = {
//   season: "https://api.jolpi.ca/ergast/f1/seasons",
//   circuit: "https://api.jolpi.ca/ergast/f1/circuits",
//   race: "https://api.jolpi.ca/ergast/f1/{year}/races",
//   constructor: "https://api.jolpi.ca/ergast/f1/{year}/constructors",
//   driver: "https://api.jolpi.ca/ergast/f1/{year}/drivers",
//   result: "https://api.jolpi.ca/ergast/f1/{year}/results",
//   sprint: "https://api.jolpi.ca/ergast/f1/{year}/sprint",
//   qualifying: "https://api.jolpi.ca/ergast/f1/{year}/qualifying",
//   //   pitstop: "https://api.jolpi.ca/ergast/f1/{year}/1/pitstops",
//   lap: "https://api.jolpi.ca/ergast/f1/{year}/1/laps",
//   driverstanding: "https://api.jolpi.ca/ergast/f1/{year}/driverstandings",
//   constructorstanding:
//     "https://api.jolpi.ca/ergast/f1/{year}/constructorstandings",
//   status: "https://api.jolpi.ca/ergast/f1/status",
// };
export function getSeasons(season) {
    if (!season)
        return `${BASE_API_URL}seasons/?offset=50`;
    return `${BASE_API_URL}${season}/seasons/`;
}
export function getCircuit(season = "current") {
    return `${BASE_API_URL}${season}/circuits/`;
}
export function getRaces(season = "current", round) {
    let url = `${BASE_API_URL}${season}/`;
    if (round) {
        url += `/${round}`;
    }
    return `${url}/races/`;
}
export function getDrivers(arg) {
    let url = `${BASE_API_URL}`;
    if (!arg) {
        return `${url}/drivers`;
    }
    // Get list of drivers for given season
    if (!Number.isNaN(arg) || arg === "current")
        return `${url}${arg}/drivers`;
    // If arg is given but not convertable to string or !== 'current', we can just assume that it's asking for a specific driver information
    return `${url}drivers/${arg}`;
}
