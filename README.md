# NeoCalc - Advanced Calculator

![NeoCalc Banner](https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22devrohanshah.github.io_calculator-app_.png%22%2C%22type%22%3A%22image%2Fpng%22%2C%22signedurl_expire%22%3A%222028-04-11T10%3A06%3A44.031Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2F4d05624966984495%2Fdevrohanshah.github.io_calculator-app_.png%3FExpires%3D1839060404%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DNiTfEM86dty0GuLlJW-kcGwRD1FD62i6TJ51Mx-v5KocVbzjeb2xSVbY3vjffveAh9Ydb8jtfVovN86VuVCi-wPXlQjLMDbKWxvGmOfcohgoR4fzoYpI1CpWk7dCjVaAr0dw4NTXdvMXKZE68zqBH4fkWTncKSmCq8irVx1AHi~308le2xYD3pb2e-dbz6IGKq-kn2KIcXZ5SBw2XxJZzdwEEAuVOK5U3H1F~kxlyMqNl5av15r5TDmQwMI-Lmeb7wlVVEpUfgfRuewDeB7mLH11xIA1Nj41EWdKJri9H~wuShJmpWKHTRw1NxWnA~A7b8L41uX8Eki~M9604uM3rw__%22%7D)

<div align="center">
  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/yourusername/neocalc)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourusername/neocalc/pulls)

</div>

<p align="center">A modern, feature-rich calculator with history tracking and elegant dark/light mode.</p>

## ✨ Features

- **🧮 Advanced Mathematical Operations** - Handles complex mathematical expressions including parentheses and operator precedence
- **📜 Calculation History** - Track and revisit your previous calculations 
- **🌓 Dark/Light Theme** - Elegant theme switching with persistent preference storage
- **⌨️ Keyboard Support** - Use your keyboard for rapid calculations
- **📱 Responsive Design** - Works beautifully across all device sizes
- **🔌 Offline Support** - Full functionality even without an internet connection

## 🖥️ Live Demo

Experience NeoCalc: [Live Demo](https://devrohanshah.github.io/calculator-app/)

![NeoCalc Demo](https://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22devrohanshah.github.io_calculator-app_.png%22%2C%22type%22%3A%22image%2Fpng%22%2C%22signedurl_expire%22%3A%222028-04-11T10%3A06%3A44.031Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2F4d05624966984495%2Fdevrohanshah.github.io_calculator-app_.png%3FExpires%3D1839060404%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DNiTfEM86dty0GuLlJW-kcGwRD1FD62i6TJ51Mx-v5KocVbzjeb2xSVbY3vjffveAh9Ydb8jtfVovN86VuVCi-wPXlQjLMDbKWxvGmOfcohgoR4fzoYpI1CpWk7dCjVaAr0dw4NTXdvMXKZE68zqBH4fkWTncKSmCq8irVx1AHi~308le2xYD3pb2e-dbz6IGKq-kn2KIcXZ5SBw2XxJZzdwEEAuVOK5U3H1F~kxlyMqNl5av15r5TDmQwMI-Lmeb7wlVVEpUfgfRuewDeB7mLH11xIA1Nj41EWdKJri9H~wuShJmpWKHTRw1NxWnA~A7b8L41uX8Eki~M9604uM3rw__%22%7D)

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of web technologies (for developers)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/calculator-app.git
```

2. Navigate to the project directory:
```bash
cd calculator-app
```

3. Open `index.html` in your browser or set up a local server.

## 📊 Usage

### Basic Calculations

- Enter numbers and operators using the calculator buttons or your keyboard
- Press `=` or `Enter` to calculate the result
- Press `C` or `Escape` to clear the display
- Press `⌫` or `Backspace` to delete the last character

### Advanced Functions

- **Parentheses** - Use `(` and `)` for expression grouping
- **Negative Numbers** - Use `-` before a number to make it negative
- **Decimal Points** - Use `.` to enter decimal numbers
- **Expression Evaluation** - The calculator follows standard operator precedence

### History Feature

- Click the history icon (⏱️) to view your calculation history
- Click on any history item to use that result in a new calculation
- History is stored locally and persists between sessions
- Clear history with the "Clear All" button in the history panel

### Theme Switching

- Toggle between light and dark themes with the theme switch
- Your theme preference is saved for future visits

## 🔧 Technical Details

### Project Structure

```
neocalc/
├── index.html            # Main HTML file
├── css/
│   └── style.css         # Styling for the calculator
├── js/
│   ├── calc.js           # Main calculator logic
│   ├── history.js        # History management
│   └── offline.js        # Service worker for offline functionality
├── images/
│   ├── favicon.ico       # Browser favicon
│   └── meta.jpg          # Social media preview image
└── service-worker.js     # Service worker for PWA functionality
```

### Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling, animations, and responsive design
- **JavaScript** - Calculator logic and user interactions
- **LocalStorage API** - Persistent storage for history and theme preference
- **Service Workers** - Offline functionality

### Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 60+     | ✅     |
| Firefox | 60+     | ✅     |
| Safari  | 11+     | ✅     |
| Edge    | 79+     | ✅     |
| Opera   | 47+     | ✅     |

## 🛠️ Development

### Main Components

1. **Calculator Core** - The main computation engine in `calc.js`
2. **History System** - Manages calculation history in `history.js`
3. **Offline Capability** - Implements service worker in `offline.js`
4. **Theme Management** - Handles theme switching and persistence

### Extending the Calculator

To add new operations or features:

1. Modify the appropriate JavaScript file based on the feature category
2. Update the HTML to include any necessary UI elements
3. Add corresponding styles in `style.css`
4. Test across different browsers and screen sizes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- Original calculator concept by [Rohan Shah](https://www.rohanshah.com.np/)
- Icons from [Feather Icons](https://feathericons.com/)
- Fonts: [Inter](https://fonts.google.com/specimen/Inter) and [Poppins](https://fonts.google.com/specimen/Poppins) from Google Fonts

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

Project Link: [https://github.com/yourusername/neocalc](https://github.com/yourusername/neocalc)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/yourusername">Your Name</a></p>
</div>
