import * as xml2js from "xml2js";
export default function parseXML(xml) {
    const parser = new xml2js.Parser();
    return parser.parseStringPromise(xml);
}
