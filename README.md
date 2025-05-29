## 🎵 AI Vibe Song Suggester

Upload your photo, choose your mood & language, and get perfect songs that match your vibe—suggested directly from YouTube. Built with 💖 by [Shivam Saurabh](https://linkedin.com/in/shivamsaurabh25).

---

### ✨ Features

* 📸 Upload a photo (or select mood manually)
* 💬 Choose your mood (happy, sad, chill, energetic, etc.)
* 🌍 Select song language (Hindi, English, Tamil, etc.)
* 🎧 Get new & old songs from YouTube API
* 🎨 Glassmorphism UI with gradient background
* 🌙 Dark & Light mode toggle
* 📱 Responsive design
* 🔐 Let users enter their own YouTube API key (no hardcoded limits)

---

### 📦 Tech Stack

* ⚡ **Vite** – Blazing fast frontend tooling
* ⚛️ **React** – UI Library
* 💅 **Tailwind CSS** – Utility-first CSS framework
* 🎥 **YouTube Data API v3** – Song suggestions
* 🧠 (Optional) **HuggingFace BLIP / Captioning** – Image-to-caption AI

---

### 🚀 Getting Started

#### 1. Clone the repository

```bash
git clone https://github.com/shivamsaurabh25/ai-song-suggester.git
cd ai-song-suggester
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Run the app locally

```bash
npm run dev
```

---

### 🔑 Get a YouTube API Key

1. Go to [Google Developer Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **YouTube Data API v3**
4. Generate an API Key
5. Paste your key in the app when prompted

> 🔐 API key is stored in memory—no server required!

---

### 🧪 Development Tips

* Want automatic mood detection? You can integrate [BLIP model](https://huggingface.co/Salesforce/blip-image-captioning-base) locally or use HuggingFace API.
* Prefer simplicity? Use the **manual mood selector**.

---

### 🧑‍💻 Creator

**Made with ❤️ by [Shivam Saurabh](https://instagram.com/shivamsaurabh25)**

If you liked this project, consider following or sharing!

---

### 📄 License

This project is licensed under the [MIT License](LICENSE).