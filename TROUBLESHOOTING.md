# STEP-BY-STEP GOOGLE SHEETS TROUBLESHOOTING

## Problem: Orders not appearing in Google Sheets

## SOLUTION - Follow these EXACT steps:

### Step 1: Update Your Google Apps Script

1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1bZnC_B-q_VybEYdNwxYOs35EsfDixWj5AAjdl4erjQA/edit
2. **Go to Extensions → Apps Script**
3. **DELETE all existing code**
4. **Copy the ENTIRE code from `updated-google-script.js`** (in this project folder)
5. **Paste it in the Apps Script editor**
6. **Click Save** (Ctrl+S)

### Step 2: Test the Script

1. **In Apps Script, click the function dropdown** (next to Run button)
2. **Select "testOrderSubmission"**
3. **Click Run**
4. **Check your Google Sheet - you should see a test order appear**
5. **If test works, proceed to Step 3**

### Step 3: Redeploy the Web App

1. **Click Deploy → Manage deployments**
2. **Click the edit icon (pencil)** next to your existing deployment
3. **Change the version to "New version"**
4. **Click Deploy**
5. **Copy the new Web App URL** (it might be the same as before)

### Step 4: Verify the URL in Your Website

The URL should be exactly:
```
https://script.google.com/macros/s/AKfycbwuoYQ7BsAFhGTJOk8rJ3ZmiUlmfRXjPbi84R6bvdjbzjh33qkLoAzphow_GjERdW17/exec
```

### Step 5: Test Again

1. **Go to your live website**: https://s-cube-akufziy7b-srikaanths-projects.vercel.app
2. **Place a test order**
3. **Check your Google Sheet immediately**

### Step 6: Debug if Still Not Working

1. **In Google Apps Script, go to Executions** (left sidebar)
2. **Look for recent executions when you placed orders**
3. **Click on any execution to see logs**
4. **Check for error messages**

### Alternative Quick Fix

If nothing works, try this **simple version**:

1. **Replace your entire Google Apps Script with this minimal code**:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date().getTime(),
    data.name,
    data.number, 
    data.address,
    data.mailid,
    data.orderId,
    data.utr,
    data.items,
    data.total,
    new Date().toLocaleString()
  ]);
  
  return ContentService.createTextOutput('OK');
}
```

2. **Save and redeploy**
3. **Test again**

### Common Issues:

- ❌ **Script not saved properly** → Make sure to save (Ctrl+S)
- ❌ **Old deployment still active** → Always create "New version" when redeploying  
- ❌ **Wrong permissions** → Make sure Web App has "Anyone" access
- ❌ **Sheet headers missing** → Ensure row 1 has proper column headers

### Need Help?
If still not working, check the "Executions" tab in Google Apps Script to see error messages.