# 7 Remarkable Identities 2

An interactive quiz web application designed to help learners practice and master the **7 Remarkable Algebraic Identities** in mathematics. This is the **version 2** release, featuring **higher difficulty** and a **multiple-choice quiz format** for quick and focused practice.

## 🚀 Live Demo

Check out the live demo: [https://www.sieu.io.vn/github/7-remarkable-identities-2](https://www.sieu.io.vn/github/7-remarkable-identities-2)

## ✨ Features

- **Dynamic Question Generation** – Automatically picks 1 out of the 7 algebraic identities and randomizes the variable placeholders (using characters from `a-z` and `0-9`) to provide fresh, non-repetitive math problems
- **Bi-directional Quizzing** – Supports both forward direction (expanding products/powers into polynomials) and backward direction (factoring polynomials back into simplified expressions)
- **Higher Difficulty (Version 2)** – Questions are designed with **more complex expressions and less obvious patterns**, requiring a deeper understanding of the identities
- **Multiple-Choice Format** – Four answer options are provided for each question, with exactly one correct answer
- **Smart Term Shuffling** – Polynomial terms and product factors are shuffled randomly. The system intelligently handles mathematical signs (`+` / `-`), auto-formatting the leading term cleanly (e.g., hiding an unnecessary leading `+` while preserving `-`)
- **Standardized Notation** – Explicitly uses dot notation (`.`) to denote multiplication between variables and grouped parentheses for clear mathematical readability
- **Real-Time Statistics** – Displays a live tracker for correct answers over total questions answered, along with an accuracy percentage (`%`)
- **Instant Feedback** – After selecting your answer, the tool tells you immediately whether it is correct and highlights the right answer
- **Minimalist, Clean UI** – A modern interface with smooth transition effects when hovering or selecting choices
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices

## 🆕 What's New in Version 2

- **Increased difficulty** – Questions now feature **more complex variable combinations and operations**, making the quiz more challenging than version 1.5
- **Multiple-choice format** – Replaced free-response input with four answer options for faster and more engaging practice
- **Improved question generation** – Enhanced algorithms for better variety and reduced repetition
- **Refined UI** – Smoother transitions and hover states for a polished feel
- **Minor bug fixes and performance optimizations** over the previous release

## 🛠️ Technologies Used

- **HTML5** – Defines the layout structure (quiz card, scoreboard, question box, and options container)
- **CSS3** – Powers the modern UI look, featuring smooth transition effects when hovering or selecting choices
- **JavaScript (Vanilla)** – Contains all algorithmic logic (Fisher-Yates shuffle), expression compilation, and scoring state management

## 📁 Project Structure

```
7-remarkable-identities-2/
├── index.html               # Defines the layout structure (Quiz Card, scoreboard, question box, and options container)
├── style.css                # Powers the modern UI look, featuring smooth transition effects
├── script.js                # Contains all algorithmic logic (Fisher-Yates shuffle), expression compilation, and scoring state management
└── README.md                # Project documentation
```

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/lemasieu/7-remarkable-identities-2.git
   ```
2. **Navigate to the project folder**   
   ```bash
   cd 7-remarkable-identities-2
   ```
3. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local development server (e.g., Live Server in VS Code)

## 📝 How It Works

1. **A question is displayed** – The app picks one of the 7 remarkable identities and generates a randomized problem, either in forward direction (expansion) or backward direction (factorization)
2. **Choose your answer** – Select one of the multiple-choice options provided
3. **Receive instant feedback** – If your answer is correct, it is highlighted in green. If incorrect, your choice is marked in red and the correct answer is highlighted in green
4. **Track your progress** – The scoreboard updates in real time, showing:
   - **Correct** – Number of correct answers
   - **Total** – Total number of questions answered
   - **Accuracy** – Success rate as a percentage (`%`)
   - **Continue** – Click the "Next Question" button to generate a new random problem

**The 7 Remarkable Algebraic Identities covered:**

1. $(a + b)^2 = a^2 + 2ab + b^2$
2. $(a - b)^2 = a^2 - 2ab + b^2$
3. $a^2 - b^2 = (a - b)(a + b)$
4. $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$
5. $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$
6. $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$
7. $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is open-source and available under the MIT License.
