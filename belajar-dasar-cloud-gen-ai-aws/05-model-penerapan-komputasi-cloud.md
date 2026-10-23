# Model Penerapan untuk Komputasi Cloud

> Artikel bersih dari kelas Dicoding **Belajar Dasar Cloud dan Gen AI di AWS**, bagian 2.4.

Saat memilih strategi penerapan cloud, ada beberapa faktor yang perlu dipertimbangkan, antara lain komponen aplikasi cloud yang diperlukan, layanan untuk mengelola sumber daya, serta persyaratan infrastruktur IT.

Ada tiga model penerapan komputasi cloud: **cloud-based**, **on-premises (lokal)**, dan **hybrid**.

## 1. Cloud-Based Deployment

Dalam model penerapan *cloud-based*, Anda dapat merancang, membangun, dan menjalankan aplikasi baru di cloud. Anda juga dapat memigrasikan aplikasi yang sudah ada ke cloud.

Ada beberapa pendekatan yang dapat digunakan:

- Membangun aplikasi pada *low-level infrastructure* (infrastruktur tingkat rendah), yang perlu dikelola oleh staf IT.
- Menggunakan *higher-level services* (layanan tingkat lebih tinggi), yang dapat mengurangi kebutuhan pengelolaan infrastruktur, perancangan arsitektur, dan *scaling* (penyesuaian kapasitas).

Contohnya, Anda dapat membuat aplikasi yang seluruh komponennya berbasis cloud, termasuk server virtual, database (basis data), dan jaringan.

## 2. On-Premises Deployment

*On-premises* berarti penerapan sumber daya di lingkungan lokal. Dalam materi ini, model tersebut juga disebut *private cloud* (cloud privat).

Pada model ini, sumber daya diterapkan menggunakan layanan manajemen aplikasi dan teknologi virtualisasi di data center pribadi. Pendekatan tersebut memungkinkan penggunaan dan pemanfaatan sumber daya ditingkatkan.

## 3. Hybrid Deployment

Dalam model *hybrid*, sumber daya berbasis cloud dihubungkan dengan data center *on-premises* (lokal).

Pendekatan ini dapat digunakan dalam beberapa situasi, misalnya:

- Aplikasi lama lebih sesuai dikelola di lingkungan lokal.
- Peraturan pemerintah mengharuskan data tertentu disimpan di data center lokal.

Dalam skenario tersebut, perusahaan dapat mempertahankan aplikasi lama di lingkungan *on-premises* sambil memanfaatkan data dan layanan yang berjalan di cloud.

## Ringkasan

- **Cloud-based:** aplikasi dan sumber daya dijalankan di cloud.
- **On-premises:** sumber daya diterapkan dan dikelola di data center lokal atau pribadi.
- **Hybrid:** menghubungkan sumber daya cloud dengan data center lokal, sehingga keduanya dapat dimanfaatkan sesuai kebutuhan.
