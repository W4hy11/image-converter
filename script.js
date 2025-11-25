document.getElementById('convertBtn').addEventListener('click', function () {
  const files = document.getElementById('imageInput').files;
  const format = document.getElementById('format').value;
  const downloadContainer = document.getElementById('downloadContainer');
  downloadContainer.innerHTML = '';

  if (!files.length) {
    alert('Please select image files.');
    return;
  }

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = function (e) {
      img.src = e.target.result;
    };

    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(function (blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const baseName = file.name.replace(/\.[^/.]+$/, ""); // tanpa ekstensi
        link.download = `${baseName}.${format}`;
        link.className = 'download-link';
        link.textContent = `Download: ${link.download}`;
        downloadContainer.appendChild(link);
        downloadContainer.appendChild(document.createElement('br'));
      }, 'image/' + format, 0.92);
    };

    reader.readAsDataURL(file);
  });
});

