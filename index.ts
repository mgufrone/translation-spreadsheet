import * as fs from "fs";

require('dotenv').config();
import {
    getAuthToken,
    getSpreadSheetValues
} from './service';

const spreadsheetId = process.env.SPREADSHEET_ID;
const sheetName = process.env.SHEET_NAME;
const output = process.env.OUTPUT;

async function exportTranslations() {
    try {
        const auth = await getAuthToken();
        const { data: { values }} = await getSpreadSheetValues({
            spreadsheetId,
            sheetName,
            auth
        })
        const headers = values.splice(0, 1);
        const languageKey =  [];
        const translations: Map<string, any> = headers[0].slice(1).reduce((all, item) => {
            all.set(item, {});
            languageKey.push(item);
            return all;
        }, new Map());
        values.forEach((value) => {
            const key = value[0];
            if (!!key) {
                value.slice(1).forEach((item, index) => {
                    if (index < languageKey.length) {
                        translations.set(languageKey[index], {
                            ...translations.get(languageKey[index]),
                            [key]: item.replace(/\\n/g, '\n'),
                        })
                    }
                });
            }
        });
        translations.forEach((value, key) => {
            const outputFile = output + "/" + key + ".json";
            console.log(`exporting ${Object.keys(value).length} translation keys for`, key);
           fs.writeFile(outputFile, `${JSON.stringify(value, Object.keys(value).sort(), 2)}`, (err) => {
               if (!err) {
                   console.log('file written in ', outputFile);
               } else {
                   console.error(err);
               }


           });
        });


    } catch(error) {
        console.log(error.message, error.stack);
    }
}

function main() {
    exportTranslations();
}

main()
