# Simple Translation JSON Export from Spreadsheet

This tools will helps you to export translation from spreadsheet to a key-based json file.

## Guide
- Create google service account and download the json file. Refer to this [page](https://cloud.google.com/iam/docs/creating-managing-service-accounts#iam-service-accounts-list-console)
- Copy `.env.example` to `.env`
- Change `SPREADSHEET_ID` with the id of your spreadsheet. for example: `https://docs.google.com/spreadsheets/d/1ZBML46KPXWmSMoNyDTw-DVThdSusJASACWL1-OeLTy8/edit#gid=174521092`, the id should be `1ZBML46KPXWmSMoNyDTw-DVThdSusJASACWL1-OeLTy8`
- Change `SHEET_NAME` to the sheet name in the spreadsheet
- Change `OUTPUT` to a directory you want the files to be exported at. Make sure the directory exists.
- Change `GOOGLE_APPLICATION_CREDENTIALS` to location of the service account json file you have just downloaded.
- Once all set up, Run `yarn ts-node .`
