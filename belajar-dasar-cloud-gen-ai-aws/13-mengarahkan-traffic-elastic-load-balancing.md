# 3.5 — Mengarahkan Traffic dengan Elastic Load Balancing

Materi kursus: **Belajar Dasar Cloud dan Gen AI di AWS**  
Bagian: **Komputasi di Cloud**

## Mengapa load balancing diperlukan?

Pada materi sebelumnya, Amazon EC2 Auto Scaling membantu menyesuaikan jumlah instance dengan kebutuhan. Namun, ketika beberapa instance tersedia, permintaan yang masuk tetap perlu didistribusikan dengan baik.

Dalam contoh kedai kopi, ada tiga instance kasir untuk menangani pelanggan yang ramai. Jika sebagian besar pelanggan mengantre di satu kasir saja sementara kasir lain menganggur, kapasitas yang tersedia tidak dimanfaatkan secara merata.

Solusinya adalah menempatkan seorang **host** di pintu masuk kedai kopi. Host mengarahkan pelanggan ke kasir dengan antrean terpendek agar antrean lebih merata dan pelayanan lebih efisien.

Konsep yang sama berlaku di AWS. Ketika beberapa instance Amazon EC2 menjalankan program serupa, permintaan yang masuk perlu diarahkan ke instance yang sesuai.

- **Load balancing** adalah proses menyeimbangkan distribusi beban atau traffic.
- **Load balancer** adalah layanan atau aplikasi yang menerima permintaan masuk lalu mengarahkannya ke sumber daya yang akan memprosesnya.

Load balancer menjadi satu titik kontak untuk traffic web yang masuk ke Auto Scaling group. Ketika instance EC2 ditambah atau dihapus sebagai respons terhadap perubahan traffic, permintaan diarahkan melalui load balancer sebelum diteruskan ke sumber daya yang menangani permintaan tersebut.

## Elastic Load Balancing (ELB)

**Elastic Load Balancing (ELB)** adalah layanan AWS yang secara otomatis mendistribusikan traffic aplikasi yang masuk ke berbagai sumber daya, seperti instance Amazon EC2.

ELB merupakan layanan terkelola (*managed service*). Artinya, AWS menangani pekerjaan operasional load balancing, termasuk instalasi, pengelolaan, pembaruan, scaling, serta penanganan kegagalan dan ketersediaan layanan.

Karakteristik ELB dalam materi ini:

- Berkinerja tinggi dan hemat biaya.
- Memiliki ketersediaan tinggi (*high availability*).
- Dapat melakukan scaling secara otomatis untuk menangani perubahan kepadatan traffic.
- Beroperasi pada tingkat **AWS Region** (wilayah AWS), bukan hanya pada satu instance EC2. Karena itu, ELB disebut sebagai konstruksi regional.
- Dapat bekerja bersama Amazon EC2 Auto Scaling untuk membantu aplikasi mencapai kinerja dan ketersediaan tinggi.

## ELB bekerja bersama Amazon EC2 Auto Scaling

Bayangkan sebuah aplikasi sedang menjalankan promo *flash sale*. Pada pagi hari, traffic masih normal, tetapi siang hari jumlah permintaan meningkat tajam.

1. Ketika traffic meningkat, Amazon EC2 Auto Scaling melakukan **scaling out**, yaitu menambah instance EC2.
2. Setelah instance baru siap, Amazon EC2 Auto Scaling memberi tahu ELB bahwa instance tersebut siap menerima traffic.
3. ELB kemudian dapat mendistribusikan permintaan ke instance yang tersedia.
4. Ketika promo berakhir dan traffic menurun, Amazon EC2 Auto Scaling melakukan **scaling in**, yaitu mengurangi jumlah instance.
5. Sebelum instance dihentikan, ELB berhenti mengirimkan permintaan baru ke instance tersebut dan menunggu sampai permintaan yang sedang ditangani selesai.
6. Setelah itu, Amazon EC2 Auto Scaling dapat mengakhiri instance tanpa mengganggu permintaan pelanggan yang masih diproses.

Dengan kerja sama ini, jumlah instance dapat mengikuti kebutuhan aplikasi sementara traffic tetap diarahkan melalui ELB.

## ELB untuk komunikasi di dalam arsitektur AWS

ELB juga dapat digunakan untuk mengatur traffic internal di antara bagian-bagian arsitektur AWS, misalnya antara bidang pemesanan dan bidang produksi.

### Tanpa ELB

Jika setiap instance di bidang pemesanan harus mengetahui semua instance di bidang produksi, setiap penambahan instance produksi mengharuskan informasi diperbarui di instance pemesanan. Cara ini menjadi semakin rumit ketika jumlah instance bertambah banyak.

### Dengan ELB

Instance di bidang pemesanan cukup menggunakan satu URL untuk mengirimkan permintaan. ELB menerima permintaan tersebut dan meneruskannya ke instance produksi yang sesuai.

Ketika instance produksi baru tersedia, instance itu cukup memberi tahu ELB bahwa ia siap menerima traffic. Instance pemesanan tidak perlu mengetahui berapa banyak instance produksi yang sedang berjalan.

Pemisahan tanggung jawab ini disebut **decoupled architecture** (arsitektur yang terpisah). Setiap bagian berkomunikasi melalui titik kontak yang sesuai, tanpa harus mengetahui detail seluruh instance di bagian lain.

## Ringkasan

- Amazon EC2 Auto Scaling menyesuaikan jumlah instance, sedangkan load balancing membantu mendistribusikan traffic ke instance yang tersedia.
- **Elastic Load Balancing (ELB)** secara otomatis mendistribusikan traffic aplikasi yang masuk ke berbagai sumber daya, termasuk instance EC2.
- ELB merupakan layanan terkelola yang beroperasi pada tingkat Region dan dapat melakukan scaling secara otomatis.
- ELB bekerja bersama Amazon EC2 Auto Scaling saat traffic meningkat maupun menurun.
- Sebelum instance dihentikan, ELB berhenti mengirimkan traffic baru ke instance tersebut dan menunggu permintaan yang sedang berjalan selesai.
- Untuk komunikasi internal, ELB menyediakan satu URL sebagai titik kontak dan membantu membangun arsitektur yang terpisah (*decoupled architecture*).
