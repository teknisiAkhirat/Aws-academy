# Building Customized LLMs with OpenAI — Syllabus

> **Tujuan dokumen:** menyimpan teks bahasa Inggris dari syllabus yang dibagikan, lalu menyediakan terjemahan bahasa Indonesia di bawah setiap bagian agar lebih mudah dipelajari.
>
> **Catatan:** terjemahan ini adalah bantuan belajar, bukan terjemahan resmi Columbia University. Teks sumber disusun dari materi syllabus yang dibagikan dalam percakapan.

- [Halaman course](https://courseworks2.columbia.edu/courses/249621)
- [Certificate FAQs](https://courseworks2.columbia.edu/courses/249621/pages/certificate-faqs)

---

## 1. Course Description — Deskripsi Course

### Original English

**BUILDING CUSTOMIZED LLMs WITH OPENAI**

As generative AI continues to transform industries, professionals are expected not only to understand how large language models work but also to customize and deploy them effectively. Off-the-shelf solutions are often insufficient for nuanced, context-specific applications. This course addresses the growing need for technical practitioners to build tailored AI systems that align with organizational goals, leverage proprietary data, and meet industry-specific requirements.

This course guides learners through the hands-on implementation of large language models (LLMs), with a focus on advanced techniques such as retrieval-augmented generation (RAG) and fine-tuning. Participants will gain practical experience integrating AI APIs into real-world workflows and adapting models for domain-specific tasks. Through project-based learning and real-world case studies, learners will move beyond theory to develop robust, production-ready AI solutions.

This course is designed for intermediate to advanced learners with some prior experience in programming and AI fundamentals. Ideal participants include:

- Software engineers and data scientists looking to deepen their practical skills in LLM implementation.
- AI/ML practitioners who want to go beyond prompt engineering to build more customized and efficient models.
- Technical professionals in sectors like healthcare, finance, law, or education who need to adapt AI for specialized use cases.
- Product developers and AI consultants aiming to integrate AI into scalable, user-facing applications.

Whether you're building intelligent chatbots, personalized learning systems, or document search tools, this course equips you with the applied knowledge and tools to bring cutting-edge AI into your work.

**Please note the instructors and course assistants do not actively monitor this course.**

### Terjemahan Bahasa Indonesia

**MEMBANGUN LLM YANG DISESUAIKAN DENGAN OPENAI**

Seiring dengan terus berubahnya berbagai industri akibat perkembangan AI generatif, para profesional diharapkan bukan hanya memahami cara kerja *large language model* (LLM), tetapi juga mampu menyesuaikan dan menerapkannya secara efektif. Solusi siap pakai sering kali belum cukup untuk kebutuhan yang memiliki konteks khusus dan memerlukan pemahaman yang lebih mendalam. Course ini membahas meningkatnya kebutuhan akan tenaga teknis yang mampu membangun sistem AI khusus, selaras dengan tujuan organisasi, memanfaatkan data milik organisasi, dan memenuhi kebutuhan bidang industri tertentu.

Course ini membimbing peserta mempraktikkan penerapan *large language model* (LLM), dengan fokus pada teknik lanjutan seperti *retrieval-augmented generation* (RAG) dan *fine-tuning*. Peserta akan mendapatkan pengalaman langsung mengintegrasikan API AI ke dalam alur kerja nyata dan menyesuaikan model untuk tugas-tugas di bidang tertentu. Melalui pembelajaran berbasis proyek dan studi kasus nyata, peserta akan melampaui teori untuk mengembangkan solusi AI yang tangguh dan siap digunakan di lingkungan produksi.

Course ini dirancang untuk peserta tingkat menengah hingga lanjutan yang telah memiliki pengalaman dasar dalam pemrograman dan fondasi AI. Peserta yang cocok antara lain:

- Software engineer dan data scientist yang ingin memperdalam keterampilan praktis dalam penerapan LLM.
- Praktisi AI/ML yang ingin melampaui *prompt engineering* untuk membangun model yang lebih sesuai kebutuhan dan efisien.
- Profesional teknis di bidang seperti kesehatan, keuangan, hukum, atau pendidikan yang perlu menyesuaikan AI untuk kebutuhan khusus.
- Pengembang produk dan konsultan AI yang ingin mengintegrasikan AI ke dalam aplikasi berskala besar yang digunakan langsung oleh pengguna.

Baik kamu sedang membangun chatbot cerdas, sistem pembelajaran yang dipersonalisasi, maupun alat pencarian dokumen, course ini membekalimu dengan pengetahuan terapan dan alat untuk menerapkan teknologi AI mutakhir dalam pekerjaanmu.

**Harap diperhatikan bahwa pengajar dan asisten course tidak secara aktif memantau course ini.**

---

## 2. Course Objectives — Tujuan Pembelajaran

### Original English

By the end of this course, learners will be able to:

- **Create Effective Prompts for LLMs:** Use zero-shot, one-shot, and few-shot prompts to guide generative models toward specific outputs.
- **Implement LLM-Based Solutions:** Connect to the OpenAI API and integrate generative AI features into notebooks or apps.
- **Generate Text, Images, and More:** Leverage Python libraries (e.g., LangChain, OpenAI) to build advanced workflows.

### Terjemahan Bahasa Indonesia

Setelah menyelesaikan course ini, peserta diharapkan mampu:

- **Membuat prompt yang efektif untuk LLM:** Menggunakan teknik *zero-shot*, *one-shot*, dan *few-shot* untuk mengarahkan model generatif agar menghasilkan keluaran tertentu.
- **Menerapkan solusi berbasis LLM:** Menghubungkan aplikasi ke OpenAI API dan mengintegrasikan fitur AI generatif ke dalam notebook atau aplikasi.
- **Menghasilkan teks, gambar, dan lainnya:** Memanfaatkan pustaka Python, misalnya LangChain dan OpenAI, untuk membangun alur kerja yang lebih canggih.

---

## 3. Modules Overview — Gambaran Umum Modul

### Original English

| Module | Topic |
| --- | --- |
| Module 1 | RAG |
| Module 2 | Fine Tuning |

### Terjemahan Bahasa Indonesia

| Modul | Topik |
| --- | --- |
| Modul 1 | RAG (*Retrieval-Augmented Generation*) |
| Modul 2 | *Fine-tuning* (penyesuaian model) |

**Penjelasan singkat:**

- **RAG:** teknik yang mengambil informasi relevan dari sumber data terlebih dahulu, lalu memberikan informasi tersebut kepada LLM sebagai konteks untuk menyusun jawaban.
- **Fine-tuning:** proses melatih lebih lanjut model yang sudah ada menggunakan contoh data tertentu agar perilakunya lebih sesuai dengan kebutuhan khusus.

---

## 4. Technology Requirements — Kebutuhan Teknologi

### Original English

**Coding Environment:** Google Colab

- OpenAI API
- DeepSeek API
- HuggingFace API (Visit: https://huggingface.co/settings/tokens to set up your Hugging Face token)

### Terjemahan Bahasa Indonesia

**Lingkungan pemrograman:** Google Colab.

Teknologi/API yang disebutkan dalam syllabus:

- OpenAI API.
- DeepSeek API.
- Hugging Face API. Kunjungi [halaman pengaturan token Hugging Face](https://huggingface.co/settings/tokens) untuk membuat atau mengatur token Hugging Face.

**Catatan keamanan:** API key dan token bersifat rahasia. Jangan menuliskannya langsung di notebook atau file yang disimpan di repository. Gunakan fitur Secrets di Google Colab atau variabel lingkungan (*environment variables*).

---

## 5. Learning Activities and Grading — Aktivitas Belajar dan Penilaian

### Original English

The course utilizes the following learning activities to promote active learning and encourage learners to reflect on their understanding of the course material:

- Quizzes
- Discussion forums
- Reflection discussions

To earn a certificate, you must meet the criteria by:

- Viewing all of the learning pages
- Scoring 60% or more on the quizzes

Each quiz is set up to allow multiple attempts and the highest score will be counted for grading.

Please see the Certificate FAQs Page for more information on Certificates and course completion.

### Terjemahan Bahasa Indonesia

Course ini menggunakan beberapa aktivitas belajar untuk mendorong peserta belajar secara aktif dan memikirkan kembali pemahaman mereka terhadap materi:

- **Kuis:** pertanyaan untuk menguji pemahaman materi.
- **Forum diskusi:** tempat berdiskusi dengan peserta lain.
- **Diskusi refleksi:** kegiatan untuk merenungkan dan menjelaskan kembali apa yang telah dipelajari.

Untuk memperoleh sertifikat, kamu harus memenuhi ketentuan berikut:

- Membuka dan mempelajari semua halaman pembelajaran.
- Mendapatkan nilai minimal 60% pada kuis.

Setiap kuis dapat dikerjakan beberapa kali. Nilai tertinggi yang diperoleh akan digunakan dalam penilaian.

Untuk informasi lebih lanjut tentang sertifikat dan penyelesaian course, silakan lihat [halaman FAQ Sertifikat](https://courseworks2.columbia.edu/courses/249621/pages/certificate-faqs).

---

## 6. Other Course Pages — Halaman Course Lainnya

### Original English

- Instructor
- Course FAQs
- Certificate FAQs
- Discussion Etiquette
- Columbia University's Policies
- Coding Reference Materials

### Terjemahan Bahasa Indonesia

- **Instructor:** informasi pengajar.
- **Course FAQs:** pertanyaan yang sering diajukan tentang course.
- **Certificate FAQs:** pertanyaan yang sering diajukan tentang sertifikat.
- **Discussion Etiquette:** panduan etika berdiskusi.
- **Columbia University's Policies:** kebijakan Columbia University.
- **Coding Reference Materials:** materi referensi untuk pemrograman.

---

## 7. Mini Glossary — Kamus Istilah Singkat

| Istilah | Arti sederhana |
| --- | --- |
| LLM (*Large Language Model*) | Model AI yang dilatih untuk memahami dan menghasilkan bahasa. |
| Generative AI | AI yang dapat menghasilkan konten baru, seperti teks atau gambar. |
| Prompt | Instruksi atau masukan yang kita berikan kepada AI. |
| Zero-shot | Meminta AI melakukan tugas tanpa memberikan contoh jawaban. |
| One-shot | Memberikan satu contoh agar AI memahami pola yang diinginkan. |
| Few-shot | Memberikan beberapa contoh untuk menunjukkan pola keluaran yang diinginkan. |
| API | Cara bagi satu aplikasi untuk meminta layanan atau data dari aplikasi lain. |
| RAG | Mengambil informasi dari sumber rujukan, lalu menggunakan informasi itu sebagai konteks untuk jawaban AI. |
| Fine-tuning | Menyesuaikan model melalui pelatihan tambahan dengan data contoh tertentu. |
| Google Colab | Lingkungan pemrograman Python yang dapat digunakan melalui browser. |
| Hugging Face | Platform dan ekosistem untuk model AI, dataset, serta alat pembelajaran mesin. |
| Production-ready | Cukup siap untuk digunakan dalam aplikasi nyata, dengan pengujian dan pengamanan yang sesuai. |
| Proprietary data | Data milik individu atau organisasi yang tidak otomatis tersedia untuk umum. |
| Workflow | Urutan langkah yang dilakukan untuk menyelesaikan suatu pekerjaan. |

---

## 8. Catatan Belajar Pribadi

- [ ] Saya sudah membaca teks bahasa Inggris.
- [ ] Saya sudah membaca terjemahan bahasa Indonesia.
- [ ] Saya memahami gambaran umum RAG.
- [ ] Saya memahami gambaran umum fine-tuning.
- [ ] Saya sudah mengetahui cara menjaga API key dan token agar tetap rahasia.
- [ ] Saya siap mulai mempelajari Modul 1: RAG.

**Catatan peta belajar:** Peta belajar 8 tahap di Modul 00 adalah rancangan pribadi, bukan struktur resmi (resmi: Modul 1 RAG, Modul 2 Fine-tuning).

**Terakhir diperiksa terhadap sumber:** 2026-10-24

**Pengingat:** tujuan kita bukan sekadar memperoleh sertifikat. Yang lebih penting adalah memahami konsepnya, berlatih secara bertahap, dan mampu membangun aplikasi AI yang bermanfaat.
