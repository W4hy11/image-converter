let convertedFiles = [];

document.getElementById('convertBtn').addEventListener('click', function () {
  const files = document.getElementById('imageInput').files;
  const format = document.getElementById('format').value;
  const downloadContainer = document.getElementById('downloadContainer');
  const downloadAllBtn = document.getElementById('downloadAllBtn');

  downloadContainer.innerHTML = '';
  convertedFiles = []; // kosongkan dulu
  downloadAllBtn.style.display = 'none';

  if (!files.length) {
    alert('Please select image files.');
    return;
  }

  Array.from(files).forEach((file, index) => {
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
        const url = URL.createObjectURL(blob);
        const fileName = file.name.replace(/\.[^/.]+$/, "." + format);

        // Simpan file ke list untuk Download All
        convertedFiles.push({ url, name: fileName });

        // Tampilkan link download manual
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.className = 'download-link';
        link.textContent = `Download: ${fileName}`;
        downloadContainer.appendChild(link);
        downloadContainer.appendChild(document.createElement('br'));

        // Jika semua file selesai diproses, tampilkan tombol Download All
        if (convertedFiles.length === files.length) {
          downloadAllBtn.style.display = 'inline-block';
        }
      }, 'image/' + format, 0.92);
    };

    reader.readAsDataURL(file);
  });
});

function downloadAll() {
  convertedFiles.forEach((file, index) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    setTimeout(() => {
      link.click();
      link.remove();
    }, index * 300); // beri jeda agar browser tidak blokir
  });
}
