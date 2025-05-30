  # 🎶 AI-Powered Instagram Song Suggester

Upload a photo → Gemini AI detects the vibe → You get YouTube songs that match your mood, in your language.

This app uses Google Gemini to analyze your image and generate a YouTube search query. It then uses YouTube API to fetch 5 songs that match the mood or vibe.

> 👨‍💻 Made with 💙 using React + Tailwind CSS

---

## 🧠 How It Works

1. Upload any **image** (selfie, nature, moment).
2. Enter your **Gemini API key** and **YouTube API key**.
3. Choose a **preferred language** (e.g., English, Hindi).
4. Click **Suggest Songs**.
5. AI analyzes the photo and fetches mood-based songs from YouTube.

---

## 🌟 Features

- 📸 Image upload and preview
- 🧠 Gemini AI generates mood-based search query
- 🔍 YouTube search returns top 5 song results
- 🌐 Language preference input for diverse suggestions
- 🌗 Dark/Light mode toggle (HeroIcons based)
- 🔒 API keys stored locally (safe on the client side)
- 🎨 Responsive Tailwind UI with elegant layout

---

## 🔧 Tech Stack

| Tool           | Purpose                               |
|----------------|----------------------------------------|
| React          | Frontend Framework                     |
| Vite           | Fast Development Server                |
| Tailwind CSS   | Styling with utility-first classes     |
| Google Gemini  | AI Mood Detection (via image + prompt) |
| YouTube API v3 | Search & fetch top songs               |

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/shivamsaurabh25/ai-song-suggester.git
cd ai-song-suggester
npm install
````

### 2. Run Locally

```bash
npm run dev
```

Now open [http://localhost:5173](http://localhost:5173)

---

## 🔑 API Key Setup

### 🔹 Gemini API Key (for image + prompt)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Paste it in the app input field

### 🔹 YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable `YouTube Data API v3`
3. Generate API Key
4. Paste it in the app input field

> ✅ Both keys are saved in `localStorage` and reused across sessions

---

## 🧪 Example Usage

* Upload a **happy vacation photo**
* Select language: *Hindi*
* Gemini might generate: `happy Indian summer beach songs`
* YouTube shows top results: 🎵

---

## 🌓 Theme Toggle

* Toggle between **dark** and **light** mode using Sun/Moon icons from `@heroicons/react`

---

## 🎥 YouTube Song Cards

Each card shows:

* Thumbnail image
* Title
* Link to YouTube video

---

## 📸 Prompt Format

Prompt sent to Gemini API:

> You are a vibe-based song recommender. Given a user's photo, describe the mood or vibe of the photo in a short phrase that could be used as a YouTube search query for a matching song. Include the language preference "Hindi". Respond with just the search query.

---

## 🙋‍♂️ Author

**Shivam Saurabh**
🎓 BCA Student | 💻 Web Dev | 🤖 AI + Web Enthusiast
🔗 [LinkedIn](https://linkedin.com/in/shivamsaurabh25)
📦 [Portfolio](https://shivamsaurabh25-portfolio.vercel.app/)

---

## 📄 License

This project is licensed under the **MIT License**.
Feel free to fork, build on top, and vibe! ✨

---

## ⭐ Support

If you liked this project:

* 🌟 Star the repo
* 📤 Share it on social media
* 🛠️ Contribute via pull requests