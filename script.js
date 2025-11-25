function convertImages() {
  const fileInput = document.getElementById('imageInput');
  const format = document.getElementById('format').value;
  const downloadContainer = document.getElementById('downloadContainer');

  downloadContainer.innerHTML = ''; // Bersihkan sebelumnya

  if (!fileInput.files.length) {
    alert("Please select one or more images.");
    return;
  }

  Array.from(fileInput.files).forEach((file, index) => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = function(e) {
      img.src = e.target.result;
    };

    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const baseName = file.name.split('.').slice(0, -1).join('.') || 'image';
        link.download = `${baseName}_converted.${format}`;
        link.textContent = `Download ${link.download}`;
        link.className = 'download-link';
        downloadContainer.appendChild(link);
        downloadContainer.appendChild(document.createElement('br'));
      }, 'image/' + format, 0.92);
    };

    reader.readAsDataURL(file);
  });
}
