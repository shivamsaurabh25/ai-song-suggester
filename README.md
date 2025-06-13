# 🎶 AI-Powered Instagram Song Suggester

Upload a photo → Gemini AI detects the vibe → You get Spotify songs that match your mood, in your language.

This app uses **Google Gemini** to analyze your image and generate a mood-based search query. It then uses a **custom backend API** to fetch 5 Spotify songs that match the vibe.

> 👨‍💻 Made with 💙 using React + Tailwind CSS

---

## 🧠 How It Works

1. Upload any **image** (selfie, nature, moment).
2. Choose your **preferred language** (e.g., English, Hindi).
3. Click **Suggest Songs**.
4. AI analyzes the photo and fetches mood-based songs from **Spotify**.

✅ No API key required — all handled securely via Shivam’s own backend.

---

## 🌟 Features

- 📸 Image upload and preview  
- 🧠 Gemini AI auto-generates vibe-based search queries  
- 🎧 Spotify search returns top 5 song results  
- 🌐 Language preference input for personalized suggestions  
- 🌗 Dark/Light mode toggle (HeroIcons based)  
- 🔒 No need to enter any API keys — secure and simple  
- 🎨 Beautiful responsive UI with Tailwind CSS  

---

## 🔧 Tech Stack

| Tool              | Purpose                               |
|-------------------|----------------------------------------|
| React             | Frontend Framework                     |
| Vite              | Fast Development Server                |
| Tailwind CSS      | Styling with utility-first classes     |
| Google Gemini     | AI Mood Detection (via image + prompt) |
| Custom Spotify API| Song fetching via Shivam's backend     |

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/shivamsaurabh25/ai-song-suggester.git
cd ai-song-suggester
npm install
````

### 2. Run Locally

````bash
npm run dev
````

Now open [https://localhost:5173](https://localhost:5173)

---

## 🔑 API Setup (for Developers)

To run your own Gemini + Spotify API backend:

### 🔹 Step 1: Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google
3. Create a new API key
4. Save it securely (you’ll use it in the backend)

### 🔹 Step 2: Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in and create a new app
3. Note your **Client ID** and **Client Secret**
4. Set Redirect URI: `http://localhost:5000/callback` (or your production URL)

### 🔹 Step 3: Clone the Backend

````bash
git clone https://github.com/shivamsaurabh25/ai-song-suggester-api.git
cd ai-song-suggester-api
npm install
````

### 🔹 Step 4: Create `.env` file in the backend

````env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
````

### 🔹 Step 5: Start the Backend Server

````bash
npm run start
````

Your backend will be running at `http://localhost:5000`, and the frontend will automatically fetch mood + songs from it.

---

## 🧪 Example Usage

* Upload a **happy vacation photo**
* Select language: *Hindi*
* Gemini generates: `happy Indian summer beach songs`
* Spotify shows top results: 🎵

---

## 🌓 Theme Toggle

* Toggle between **dark** and **light** mode using Sun/Moon icons from `@heroicons/react`

---

## 🎧 Spotify Song Cards

Each card shows:

* Album thumbnail
* Track name and artist
* Link to open in Spotify

---

## 📸 Prompt Format

Prompt sent to Gemini API:

> You are a vibe-based song recommender. Given a user's photo, describe the mood or vibe of the photo in a short phrase that could be used as a Spotify search query for a matching song. Include the language preference "Hindi". Respond with just the search query.

---

## 🙋‍♂️ Author

**[Shivam Saurabh](https://shivamsaurabh25-portfolio.vercel.app/)**
🎓 BCA Student | 💻 Web Dev | 🤖 AI + Web Enthusiast
🔗 [LinkedIn](https://linkedin.com/in/shivamsaurabh25)
📦 [Instagram](https://www.instagram.com/shivamsaurabh25/)

---

## 📄 License

This project is licensed under the **MIT License**.
Feel free to fork, remix, and vibe! ✨

---

## ⭐ Support

If you liked this project:

* 🌟 Star the repo
* 📤 Share it on social media
* 🛠️ Contribute via pull requests