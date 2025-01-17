import { json2csv, csv2json } from 'json-2-csv';
import { createToken } from "@/lib/encryption";
import { csvToJsonZod } from '@/script/validation';
import Certificates from "@/data/certificate.json";

const id = "sih-24-participation"
const certificate = Certificates[id]
const parentFolder = "./script/certificates"

const inputCSV = `${parentFolder}/data.csv`;


const csv = await Bun.file(inputCSV).text()

const json = csv2json(csv, {
    trimHeaderFields: true,
    trimFieldValues: true,
})

const validatedJson = csvToJsonZod.parse(json)

const outputJsonData = validatedJson.map(e => ({
    ...e,
    token: createToken({ id, email: e.email, type: "certificate" }),
}))

const outputCsv = `${parentFolder}/out.csv`;

const outputData = json2csv(validatedJson)

await Bun.write(
    outputCsv,
    outputData
)

const outputJson = `${parentFolder}/out.json`;
await Bun.write(
    outputJson,
    JSON.stringify(outputJsonData, null, 3)
)

console.log(`Data generated:\n ${outputCsv}\n ${outputJson}`)