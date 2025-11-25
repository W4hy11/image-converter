function convertImage() {
  const fileInput = document.getElementById('imageInput');
  const format = document.getElementById('format').value;
  const downloadLink = document.getElementById('downloadLink');

  if (!fileInput.files || !fileInput.files[0]) {
    alert("Please select an image first.");
    return;
  }

  const file = fileInput.files[0];
  const img = new Image();
  const reader = new FileReader();

  reader.onload = function(e) {
    img.src = e.target.result;
  };

  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);

    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'converted.' + format;
      downloadLink.style.display = 'inline-block';
      downloadLink.textContent = "Download Result";
    }, 'image/' + format, 0.92);
  };

  reader.readAsDataURL(file);
}
