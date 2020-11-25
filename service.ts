const { google } = require('googleapis');
const sheets = google.sheets('v4');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getAuthToken() {
    const auth = new google.auth.GoogleAuth({
        scopes: SCOPES
    });
    return await auth.getClient();
}

async function getSpreadSheet({spreadsheetId, auth}) {
    const res = await sheets.spreadsheets.get({
        spreadsheetId,
        auth,
    });
    return res;
}

async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
    return await sheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range: sheetName
    });
}


export {
    getAuthToken,
    getSpreadSheet,
    getSpreadSheetValues
}
