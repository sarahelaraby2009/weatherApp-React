# 🌤️ Weather App

A modern, responsive weather application built with React and Vite that provides real-time weather information for Egyptian cities with multi-language support.

## 🌐 Live Demo

**[Access the Live Application](https://benevolent-tarsier-d586c2.netlify.app)**

 

## ✨ Features

- **Real-Time Weather Data**: Get current weather information with temperature, conditions, and forecasts
- **Egyptian Cities Support**: Access weather data for 10 major Egyptian cities:
  - Cairo, Alexandria, Giza, Aswan, Luxor
  - Port Said, Suez, Ismailia, Tanta, Mansoura
- **Multi-Language UI**: Full support for English and Arabic with seamless language switching
- **Beautiful UI**: Modern Material-UI components for an elegant user experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Fast & Efficient**: Built with Vite for lightning-fast development and production builds

## 🌦️ API Integration

This project uses the **OpenWeatherMap API** for real-time weather data:

- **API Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**: Latitude and longitude-based queries
- **Data Retrieved**: Temperature (current, min, max), weather conditions, weather icons
- **Authentication**: API Key-based authentication

### API Usage Example
```javascript
const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
);
```

## ⚙️ Error Handling

The app implements comprehensive error handling:

1. **API Request Cancellation**: 
   - Uses `AbortController` to cancel requests when component unmounts
   - Prevents state updates on unmounted components

2. **Network Error Handling**:
   - Catches API failures with try-catch blocks
   - Distinguishes between canceled requests and actual errors
   - Logs errors for debugging

```javascript
.catch(function (error) {
  if (error.name === "CanceledError") {
    console.log("request canceled")
  } else {
    console.log(error);
    // TODO: Display user-friendly error message
  }
})
```

3. **Fallback Values**:
   - Safe optional chaining for weather data: `data.weather?.[0]?.description`
   - Default empty values when data is missing

### Future Improvements:
- User-friendly error messages in UI
- Retry mechanism for failed requests
- Loading states and skeleton screens

## 🧪 Testing

The project is set up for testing with ESLint for code quality. To expand testing coverage:

### Current Testing Setup:
- **ESLint** - Configured for code quality and style checking
- Run: `npm run lint`

### Recommended Testing Additions:
```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Example test file structure
src/
├── __tests__/
│   ├── App.test.jsx
│   └── components/
│       └── YourComponent.test.jsx
```

### Sample Test:
```javascript
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders city selector', () => {
  render(<App />);
  const citySelector = screen.getByRole('combobox');
  expect(citySelector).toBeInTheDocument();
});
```

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

## 📚 What I Learned

Through building this project, I gained experience with:

### Core Concepts
- **React Hooks**: `useState`, `useEffect`, `useContext` for state management and side effects
- **Component Lifecycle**: Managing component mounting/unmounting and cleanup with AbortController
- **API Integration**: Fetching real-time data from external APIs using Axios
- **Error Handling**: Implementing proper error catch patterns and request cancellation

### Advanced Features
- **Internationalization (i18n)**: Implementing multi-language support with RTL layout considerations
- **Responsive Design**: Building mobile-first UI with Material-UI components
- **Theme Customization**: Using MUI's theming system for consistent styling
- **Date/Time Handling**: Using DayJS library with locales for different languages

### Modern Development
- **Build Tools**: Working with Vite for faster development and optimized builds
- **Code Quality**: Setting up ESLint for consistent code style
- **Git Workflow**: Proper version control and deployment to Netlify

### Key Takeaways
✅ API integration requires proper error handling  
✅ Internationalization improves user experience significantly  
✅ Component reusability and modularity are essential  
✅ Testing and code quality are important from the start  
✅ Real projects need cleanup and cancellation patterns  

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

