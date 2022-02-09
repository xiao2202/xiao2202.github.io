function setup() {
  // set the viewpoer width and height in the vp span:
  document.getElementById('vp').innerHTML = window.visualViewport.width.toPrecision(6)
    + 'x' + window.visualViewport.height.toPrecision(6);

// update if the window resizes:
  visualViewport.addEventListener('resize', function () {
    document.getElementById('vp').innerHTML = window.visualViewport.width.toPrecision(6)
      + 'x' + window.visualViewport.height.toPrecision(6);
  });
  getQrCode();
}

// add a QR code of the URL when the page loads
function getQrCode() {
  // make the QR code:
  let qr = qrcode(0, 'L');
  qr.addData(document.URL);
  qr.make();
  // create an image from it:
  let qrImg = qr.createImgTag(2, 8, "qr code of " + document.URL);
 // get the image and label:
  let label = document.getElementById('label');
  label.innerHTML = qrImg + '<br>' + document.URL;
}

// on page load, call the QR code function:
document.addEventListener('DOMContentLoaded', setup);
