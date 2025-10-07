<template>
  <div class="flex-row items-center px-6 py-2">
    <h1 class="text-3xl font-bold tracking-tight">Panduan Penggunaan Aplikasi</h1>
    <YoutubeVideoPlayer video-id="L2IaHz917JM" />
    <Card class="p-6 shadow-lg">
      <div class="flex justify-between">
        <h2 class="text-2xl font-semibold">Panduan Lupa Password</h2>
        <Icons.NotebookText class="text-muted-foreground/50 h-8 w-8" />
      </div>
      <CardContent class="mb-2">
        <p class="text-muted-foreground text-justify text-sm">
          Fitur lupa password memungkinkan pengguna untuk mengatur ulang kata sandi mereka dengan aman ketika tidak
          dapat mengakses akun. Proses dimulai ketika pengguna berada pada halaman login dan mengklik tombol atau link
          "Lupa Password?" yang biasanya ditempatkan di bawah form login. Link ini akan mengarahkan pengguna ke halaman
          khusus untuk memulai proses reset password.
          <br /><br />
          Pada tahap selanjutnya, pengguna diminta memasukkan alamat email atau nomor telepon yang terdaftar pada sistem
          untuk proses verifikasi identitas. Pastikan alamat email atau nomor yang dimasukkan masih aktif dan dapat
          diakses karena akan digunakan untuk menerima kode verifikasi. Setelah data dimasukkan dengan benar, sistem
          akan mengirimkan link atau kode verifikasi ke email atau SMS pengguna. Pengguna perlu memeriksa kotak masuk
          email atau pesan SMS, termasuk folder spam jika email tidak ditemukan di inbox utama karena terkadang email
          verifikasi masuk ke folder tersebut.
          <br /><br />
          Setelah menerima email atau SMS verifikasi, pengguna membuka pesan tersebut dan mengklik tombol "Atur Ulang
          Kata Sandi" atau link yang tertera. Link ini biasanya memiliki masa berlaku terbatas untuk alasan keamanan,
          sehingga pengguna perlu segera mengaksesnya. Dengan mengklik link verifikasi, pengguna akan diarahkan ke
          halaman untuk membuat password baru. Password baru harus memenuhi kriteria keamanan yang ditetapkan, seperti
          minimal 8 karakter dengan kombinasi huruf besar, huruf kecil, dan angka.
          <br /><br />
          Pada langkah terakhir, pengguna diminta memasukkan password baru dua kali untuk memastikan tidak ada kesalahan
          pengetikan. Setelah konfirmasi berhasil dan password baru tersimpan, pengguna dapat langsung login menggunakan
          password baru tersebut untuk mengakses aplikasi kembali.
          <br /><br />
        </p>
        <h3 class="mt-2 text-lg font-semibold">Metode Alternatif Recovery</h3>
        <p class="text-muted-foreground mt-2 text-justify text-sm">
          Selain metode email/SMS, aplikasi dapat menyediakan opsi tambahan seperti pertanyaan keamanan yang telah
          ditetapkan sebelumnya atau akses melalui biometrik (sidik jari/wajah) untuk membuka aplikasi yang terkunci.
          Untuk mencegah lupa password di masa mendatang, pengguna dapat menggunakan password manager untuk menyimpan
          semua kredensial secara aman.
        </p>
        <RouterLink
          to="/download/panduan-lupa-password"
          class="group hover:text-primary mt-4 flex cursor-pointer items-center gap-2"
        >
          <Icons.Paperclip class="group-hover:text-primary h-4 w-4 text-black" />
          Download Panduan Lupa Password
          <Icons.FileDown class="group-hover:text-primary h-4 w-4 text-black" />
        </RouterLink>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import YoutubeVideoPlayer from './YoutubeVideoPlayer.vue';
</script>
