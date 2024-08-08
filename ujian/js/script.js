document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const submitBtn = document.getElementById('submitBtn');
  const kelayakanUjian = document.getElementById('kelayakanUjian');
  const usiaInput = document.getElementById('usia');
  const usiaSabukInput = document.getElementById('usiaSabuk');
  const syaratUsiaInput = document.getElementById('syaratUsia');
  const tanggalLahirInput = document.getElementById('tanggalLahir');
  const tanggalUjianTerakhirInput = document.getElementById('tanggalUjianTerakhir');
  const tingkatanTerakhirInput = document.getElementById('tingkatanTerakhir');

  // Initialize submit button to be disabled
  submitBtn.style.display = 'none';

  const calculateAge = (birthDate) => {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          age--;
      }
      return age;
  };

  const calculateDifferenceInYears = (startDate) => {
      const today = new Date();
      const start = new Date(startDate);
      let difference = today.getFullYear() - start.getFullYear();
      const m = today.getMonth() - start.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < start.getDate())) {
          difference--;
      }
      return difference;
  };

  const getSyaratUsia = (tingkatan) => {
      const syaratUsia = {
          1: 19,
          2: 25,
          3: 30,
          4: 40,
          5: 48,
          6: 55
      };
      return syaratUsia[tingkatan];
  };

  const checkKelayakanUjian = (usia, usiaSabuk, syaratUsia, tingkatan) => {
      if (usia >= syaratUsia && usiaSabuk >= (parseInt(tingkatan) + 1)) {
          return 'LAYAK';
      } else {
          return 'TIDAK LAYAK';
      }
  };

  tanggalLahirInput.addEventListener('change', () => {
      const usia = calculateAge(tanggalLahirInput.value);
      usiaInput.value = usia;

      const syaratUsia = getSyaratUsia(tingkatanTerakhirInput.value);
      syaratUsiaInput.value = syaratUsia;

      const usiaSabuk = calculateDifferenceInYears(tanggalUjianTerakhirInput.value);
      usiaSabukInput.value = usiaSabuk;

      const kelayakan = checkKelayakanUjian(usia, usiaSabuk, syaratUsia, tingkatanTerakhirInput.value);
      kelayakanUjian.value = kelayakan;

      if (kelayakan === 'LAYAK') {
          submitBtn.style.display = 'block';
      } else {
          submitBtn.style.display = 'none';
      }
  });

  tanggalUjianTerakhirInput.addEventListener('change', () => {
      const usiaSabuk = calculateDifferenceInYears(tanggalUjianTerakhirInput.value);
      usiaSabukInput.value = usiaSabuk;

      const usia = calculateAge(tanggalLahirInput.value);
      usiaInput.value = usia;

      const syaratUsia = getSyaratUsia(tingkatanTerakhirInput.value);
      syaratUsiaInput.value = syaratUsia;

      const kelayakan = checkKelayakanUjian(usia, usiaSabuk, syaratUsia, tingkatanTerakhirInput.value);
      kelayakanUjian.value = kelayakan;

      if (kelayakan === 'LAYAK') {
          submitBtn.style.display = 'block';
      } else {
          submitBtn.style.display = 'none';
      }
  });

  tingkatanTerakhirInput.addEventListener('change', () => {
      const syaratUsia = getSyaratUsia(tingkatanTerakhirInput.value);
      syaratUsiaInput.value = syaratUsia;

      const usiaSabuk = calculateDifferenceInYears(tanggalUjianTerakhirInput.value);
      usiaSabukInput.value = usiaSabuk;

      const usia = calculateAge(tanggalLahirInput.value);
      usiaInput.value = usia;

      const kelayakan = checkKelayakanUjian(usia, usiaSabuk, syaratUsia, tingkatanTerakhirInput.value);
      kelayakanUjian.value = kelayakan;

      if (kelayakan === 'LAYAK') {
          submitBtn.style.display = 'block';
      } else {
          submitBtn.style.display = 'none';
      }
  });

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const record = {};
      formData.forEach((value, key) => {
          record[key] = value;
      });

      let csvContent = 'data:text/csv;charset=utf-8,';
      Object.values(record).forEach(value => {
          csvContent += `${value},`;
      });
      csvContent = csvContent.slice(0, -1);
      csvContent += '\n';

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'registrasi_peserta.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('Data berhasil disimpan!');
  });
});
