# ✨ Sparky Scribe – ASU's AI Writing Assistant

Sparky Scribe is a five-step AI chatbot platform designed to guide ASU students through every stage of the writing process — from brainstorming to final edits — without giving away full answers. Built for learning, not shortcutting.

## 📌 Project Overview
This application gives students a friendly “writing coach” to help them:
- Brainstorm topics, audience, and purpose
- Formulate research questions and find source types
- Structure and draft their essays
- Revise for flow and clarity
- Edit grammar and polish their final drafts

## 🎯 Objectives and Goals
- Provide ethical guidance rather than direct answers.
- Encourage students to think critically about each stage of writing.
- Make AI tools accessible through an easy‑to‑use web interface.

## 🧠 Methodology
- **Backend:** Built with FastAPI and powered by Gemini APIs (Google Generative Language Models). Each stage of writing (prewriting, research, drafting, revising, editing) is handled by a specific route.
- **Frontend:** Vanilla HTML/CSS/JS to keep things lightweight.
- **Prompts & Models:** Custom prompts guide the Gemini model at each stage. Prompts encourage brainstorming and reflection rather than producing full text.

## 📁 Dataset / Training Data
This project uses **prompt engineering** rather than fine‑tuned training. If you plan to fine‑tune on your own data in the future:
- Place any custom training data (e.g. essay outlines or revision examples) under the `data/` folder.
- Provide a small `sample_data.csv` with a few example inputs/outputs to help users test the model.

## 🛠 Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nysajain/asu-ai-writing-assistant.git
   cd asu-ai-writing-assistant
2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   
3. **Set up environment variables:**
- Create a .env file in the project root with your Gemini API key:

   ```ini
   GEMINI_API_KEY=your_api_key_here

4. **Run the application:**

   ```bash
   uvicorn main:app --reload

The frontend is served at http://localhost:8000.

## 🚀 Usage
- Navigate to http://localhost:8000.

- Choose a stage of the writing process (Prewriting, Research, Drafting, Revising, Editing).

- Follow the prompts and interact with the chatbot.

## 👩‍💻 Contributions

Feel free to open issues or submit pull requests if you'd like to contribute!

## 🔗 Try It Live

🎓 Click here to test it out:  
👉 [https://pia-asu-writing-center-project-093y.onrender.com](https://pia-asu-writing-center-project-093y.onrender.com)

No install or setup required.

> "From brainstorm to brilliance — with a little Spark." 🔱✨

---
