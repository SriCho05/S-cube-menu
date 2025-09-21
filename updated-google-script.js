// UPDATED Google Apps Script Code for S-CUBE Orders
// Copy this entire code and paste it in your Google Apps Script editor

function doPost(e) {
  // Enable logging to see what's happening
  console.log('Received POST request:', e);
  
  try {
    let data = {};
    
    // Handle different types of POST data
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
        console.log('Parsed JSON data:', data);
      } catch (jsonError) {
        console.log('JSON parse failed, trying parameter data');
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
      console.log('Using parameter data:', data);
    } else {
      console.log('No valid data found, using empty object');
    }
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // If no data provided, create a test entry
    if (Object.keys(data).length === 0) {
      data = {
        srno: new Date().getTime(),
        name: "Test Entry - No Data Received",
        number: "0000000000",
        address: "No address provided",
        mailid: "test@example.com",
        orderId: "SC" + new Date().getTime(),
        utr: "000000000000",
        items: "Test item",
        total: "0",
        orderDate: new Date().toLocaleString()
      };
      console.log('Created test data:', data);
    }
    
    // Add the data to the sheet
    const row = [
      data.srno || new Date().getTime(),
      data.name || 'Unknown',
      data.number || '0000000000',
      data.address || 'No address',
      data.mailid || 'No email',
      data.orderId || ('SC' + new Date().getTime()),
      data.utr || '000000000000',
      data.items || 'No items',
      data.total || '0',
      data.orderDate || new Date().toLocaleString()
    ];
    
    console.log('Adding row:', row);
    sheet.appendRow(row);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success', 
        message: 'Order added successfully',
        rowData: row
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing order:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error', 
        message: error.toString(),
        receivedData: e
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testOrderSubmission() {
  // Simulate a real POST request structure
  const testData = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify({
        srno: 999,
        name: "Test Customer",
        number: "9876543210",
        address: "123 Test Street, Test City",
        mailid: "test@example.com",
        orderId: "SC" + new Date().getTime(),
        utr: "123456789012",
        items: "Vanilla Ice Cream (Large) x1, Chocolate Falooda (Mini) x2",
        total: 250,
        orderDate: new Date().toLocaleString()
      })
    },
    parameter: {}
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
  return result.getContent();
}

// Simplified test that directly adds data to sheet
function testDirectInsert() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    
    const testRow = [
      new Date().getTime(),
      "Direct Test Customer",
      "9999999999",
      "Direct Test Address",
      "directtest@example.com",
      "SC" + new Date().getTime(),
      "999999999999",
      "Direct Test Item x1",
      "150",
      new Date().toLocaleString()
    ];
    
    sheet.appendRow(testRow);
    console.log('Direct insert successful:', testRow);
    return 'Direct insert successful';
    
  } catch (error) {
    console.error('Direct insert failed:', error);
    return 'Direct insert failed: ' + error.toString();
  }
}

// Alternative test with parameter data
function testWithParameters() {
  const testData = {
    parameter: {
      srno: 888,
      name: "Parameter Test",
      number: "1234567890",
      address: "Parameter Address",
      mailid: "param@test.com",
      orderId: "SC888",
      utr: "987654321098",
      items: "Test Item",
      total: 100,
      orderDate: new Date().toLocaleString()
    }
  };
  
  const result = doPost(testData);
  console.log('Parameter test result:', result.getContent());
  return result.getContent();
}