# 🌤️ Weather App

A modern, responsive weather application built with React and Vite that provides real-time weather information for Egyptian cities with multi-language support.

## 🌐 Live Demo

**[Access the Live Application](benevolent-tarsier-d586c2.netlify.app)**

## ✨ Features

- **Real-Time Weather Data**: Get current weather information with temperature, conditions, and forecasts
- **Egyptian Cities Support**: Access weather data for 10 major Egyptian cities:
  - Cairo, Alexandria, Giza, Aswan, Luxor
  - Port Said, Suez, Ismailia, Tanta, Mansoura
- **Multi-Language UI**: Full support for English and Arabic with seamless language switching
- **Beautiful UI**: Modern Material-UI components for an elegant user experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Fast & Efficient**: Built with Vite for lightning-fast development and production builds

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Next generation build tool
- **Material-UI (MUI)** - Component library for beautiful UI
- **Emotion** - CSS-in-JS styling solution

### Utilities & Libraries
- **Axios** - HTTP client for API calls
- **DayJS** - Lightweight date/time library
- **i18next** - Internationalization (i18n) framework
- **react-i18next** - React bindings for i18next

### Development Tools
- **ESLint** - Code quality and style checking
- **Vite React Plugin** - Fast Refresh support

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vite-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start the development server with HMR (Hot Module Replacement)
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📂 Project Structure

```
src/
├── App.jsx              # Main application component
├── App.css              # Application styles
├── main.jsx             # Application entry point
├── i18n.js              # i18n configuration
├── components/          # Reusable components
├── assets/              # Static assets
public/
├── fonts/               # Custom fonts
├── locales/
│   ├── en/              # English translations
│   └── ar/              # Arabic translations
```

## 🌍 Internationalization (i18n)

The app supports multiple languages:
- **English (en)** - Default language
- **Arabic (ar)** - Full RTL support

Language files are located in `public/locales/` and can be easily extended with additional languages.

## 🎨 Customization

### Adding New Cities
Edit the `EGYPT_CITIES` array in `src/App.jsx` to add more cities with their coordinates.

### Changing Theme
Modify the Material-UI theme configuration in `src/App.jsx` to customize colors and typography.

### Adding Languages
1. Create new language files in `public/locales/[lang-code]/translation.json`
2. Add the language to your i18n configuration in `src/i18n.js`

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

## 📧 Support

For questions or support, please reach out through the repository issues page.

---

**Built with ❤️ using React and Vite**
