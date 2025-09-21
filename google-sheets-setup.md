# Google Sheets Integration Setup

To enable order data to be automatically sent to Google Sheets, follow these steps:

## 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "S-CUBE Orders" or similar
4. Set up the first row with these column headers:
   - A1: Srno
   - B1: Name
   - C1: Number
   - D1: Address
   - E1: mailid
   - F1: Order ID
   - G1: UTR Number
   - H1: Items
   - I1: Total Amount
   - J1: Order Date

## 2. Create Google Apps Script

1. In your Google Sheet, go to `Extensions > Apps Script`
2. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    let data;
    
    // Handle both JSON and FormData
    if (e.postData.type === 'application/json') {
      // JSON data
      data = JSON.parse(e.postData.contents);
    } else {
      // FormData
      data = e.parameter;
    }
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Add the data to the sheet
    sheet.appendRow([
      data.srno,
      data.name,
      data.number,
      data.address,
      data.mailid,
      data.orderId,
      data.utr,
      data.items,
      data.total,
      data.orderDate
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', message: 'Order added successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error for debugging
    console.error('Error processing order:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        srno: 1,
        name: "Test Customer",
        number: "9876543210",
        address: "Test Address",
        mailid: "test@example.com",
        orderId: "SC123456789",
        utr: "123456789012",
        items: "Vanilla Ice Cream (Large) x1",
        total: 120,
        orderDate: new Date().toLocaleString()
      })
    }
  };
  
  console.log(doPost(testData));
}
```

## 3. Deploy the Script

1. Click `Deploy > New deployment`
2. Choose type: `Web app`
3. Execute as: `Me`
4. Who has access: `Anyone`
5. Click `Deploy`
6. Copy the Web App URL
7. Update the `GOOGLE_SCRIPT_URL` in the `order.html` file with this URL

## 4. Update the Order Page

In `order.html`, find this line:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual Google Apps Script Web App URL.

**✅ COMPLETED**: The URL has been updated to: `https://script.google.com/macros/s/AKfycbwuoYQ7BsAFhGTJOk8rJ3ZmiUlmfRXjPbi84R6bvdjbzjh33qkLoAzphow_GjERdW17/exec`

## 5. Add UPI QR Code

1. Generate your UPI QR code using any UPI app or QR generator
2. Save the QR code image in the `/images/` folder as `upi-qr.png`
3. Update the order.html file to use the actual QR code:

Find this section:
```html
<div class="qr-placeholder">
    UPI QR Code<br>
    (Add your QR code image here)
</div>
```

Replace it with:
```html
<img src="/images/upi-qr.png" alt="UPI QR Code" style="width: 200px; height: 200px; border-radius: 10px;">
```

## Security Note

The Google Apps Script will be publicly accessible. For production use, consider adding authentication or request validation to prevent spam submissions.