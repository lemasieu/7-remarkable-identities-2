# 7-remarkable-identities-2 🧠 [Little Harder Edition]

An advanced interactive quiz web application designed to master the **7 Remarkable Algebraic Identities** with a much higher difficulty curve. Unlike version 1, this edition introduces **complex terms combining both coefficients and variables**, automatically simplifying and expanding expressions using standardized mathematical notation.

🌐 **Live Demo:** [https://xn--msiu-goa8b.vn/github/7-remarkable-identities-2/](https://xn--msiu-goa8b.vn/github/7-remarkable-identities-2/)

---

## ✨ Advanced Features (What's New in V2?)

- 🔢 **Dynamic Coefficients & Variables:** Placeholders are no longer just single characters. Terms are generated as objects consisting of numerical coefficients (e.g., `2`, `3`, `4`) married to algebraic variables (e.g., `x`, `y`, `a`, `b`), generating challenges like $(2x - 3y)^2$.
- 🧮 **Automated Coefficient Reduction:** The backend arithmetic engine computes algebraic expansions on the fly. It multiplies powers and coefficients perfectly, yielding fully reduced answers like $4x^2 - 12.x.y + 9y^2$ instead of raw un-evaluated text.
- 🔄 **Bi-directional Hardcore Mode:** Test your factorization and expansion skills both ways (Forward & Backward) with much higher visual complexity.
- 🧩 **Smart Sign & Term Shuffling:** Polynomial terms are randomized using the Fisher-Yates algorithm. Leading positive signs (`+`) are cleanly truncated, while negative signs (`-`) are perfectly locked to their respective terms.
- 📊 **Real-time Performance Tracker:** Keeps a live score of your current run, displaying correct answers against total attempts along with your real-time accuracy rate (`%`).

## 📁 Technical Breakdown

The core engine relies on 3 decoupled files:
- `index.html`: Structuring the responsive Quiz UI workspace.
- `style.css`: Modern visual look, utilizing quick transition states for button active/hover feedback.
- `script.js`: **The Core Upgrade.** Contains object-oriented math helper functions (`generateAB()`, `strPower()`, `strProduct()`) to parse, power-up, multiply, and format numerical terms smoothly.

---

## 🚀 Getting Started Locally

Run this standalone application instantly without dealing with Node modules, compilers, or heavy packages:

1. **Clone this repository:**
```bash
   git clone [https://github.com/lemasieu/7-remarkable-identities-2.git](https://github.com/lemasieu/7-remarkable-identities-2.git)
```
2. **Navigate into the project directory:**
```bash
   cd 7-remarkable-identities-2
```
3. **Launch the application**
Simply double-click the `index.html` file to open and run it instantly in any modern web browser.

## 🛠️ Deployment / Git Push Guide
If you want to initialize Git locally and push the source code to your GitHub repository `lemasieu/7-remarkable-identities-2`, execute the following commands in your terminal:
```bash
# Initialize local git profile
git init

# Stage all updated file structures
git add .

# Commit with a clear scope
git commit -m "Initial commit: Deploy 7 Remarkable Identities V2 with coefficient reduction"

# Enforce default branch naming convention
git branch -M main

# Link to the secondary repository
git remote add origin [https://github.com/lemasieu/7-remarkable-identities-2.git](https://github.com/lemasieu/7-remarkable-identities-2.git)

# Push upstream to GitHub
git push -u origin main
```

## 📝 License
This project is licensed under the terms of the MIT License. You are completely free to use, modify, and distribute it.
Created by Gemini with my idea.
