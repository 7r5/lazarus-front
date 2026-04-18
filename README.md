# 🛍️ Lazarus Frontend

A modern and elegant online store built with React, Vite, and Tailwind CSS. Part of the Lazarus project, this frontend application allows users to explore products, apply filters by category and size, and view complete product details including comments.

## ✨ Features

- 🏪 **Product catalog** with dynamic filters
- 🔍 **Search and filtering** by category and size
- 📱 **Responsive design** optimized for mobile and desktop
- 🎨 **Modern interface** with Tailwind CSS
- ⚡ **Optimized performance** with Vite
- 💬 **Product comment system**
- 🔄 **Automatic filter updates**
- 🖼️ **Smart image handling** with fallbacks

## 🛠️ Technologies Used

- **React 18** - Main framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 3** - Styling framework
- **Axios** - HTTP client for API
- **React Router** (planned) - SPA navigation

## 📋 Prerequisites

Before starting, make sure you have installed:

- **Node.js** version 16 or higher (recommended: 18+)
- **npm** or **yarn** as package manager
- **Git** to clone the repository

```bash
# Check installed versions
node --version
npm --version
```

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/lazarus-front.git
cd lazarus-front
```

### 2. Install Dependencies

```bash
npm install
```

This command will install all necessary dependencies:
- React and React DOM
- Vite and plugins
- Tailwind CSS and PostCSS
- Axios for HTTP calls

### 3. Configure Environment Variables (Optional)

If you need to configure custom environment variables, create a `.env.local` file:

```bash
# Example environment variables
VITE_API_BASE_URL=https://your-api-endpoint.com
```

## 🏃‍♂️ Running the Project

### Local Development

To run the development server with hot reload:

```bash
npm run dev
```

The server will start at `http://localhost:5173` by default. The application will automatically reload when you make changes to the code.

### Production Build

To create an optimized production build:

```bash
npm run build
```

The compiled files will be generated in the `dist/` folder.

### Production Preview

To test the production build locally:

```bash
npm run preview
```

This will start a local server at `http://localhost:4173` serving the production files.

## 📁 Project Structure

```
lazarus-front/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── ProductCard.jsx    # Product card
│   │   ├── ProductDetails.jsx # Details view
│   │   ├── CommentsSection.jsx # Comments section
│   │   └── Sidebar.jsx        # Filter sidebar
│   ├── services/
│   │   └── api.js            # API configuration and calls
│   ├── App.jsx              # Main component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles with Tailwind
├── dist/                   # Compiled files (generated)
├── node_modules/           # Dependencies (generated)
├── package.json            # Project configuration
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── static.json             # Deployment configuration
└── README.md               # This file
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates the production build |
| `npm run preview` | Production build preview |

## 🌐 Backend API

This frontend connects to the Lazarus Backend API. Make sure the backend is running at:

```
https://lazarusproject.onrender.com/api
```

### Used Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/filter` - Filter products
- `GET /api/products/getCategories` - Get categories
- `GET /api/products/getSizes` - Get sizes
- `GET /api/products/getSizesFromCategory` - Sizes by category
- `GET /api/comments/product/{id}` - Product comments

## 🚀 Deployment

### Netlify / Vercel

1. Connect your repository to Netlify or Vercel
2. Configure the build command: `npm run build`
3. Configure the publish directory: `dist`
4. The `static.json` file is already configured for SPA routing

### Other Services

For other hosting services, simply upload the contents of the `dist` folder after running `npm run build`.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT License. See the `LICENSE` file for more details.

## 📞 Support

If you find any issues or have questions:

1. Check existing [Issues](https://github.com/your-username/lazarus-front/issues)
2. Create a new issue with problem details
3. Contact the development team

---

**Developed with ❤️ by the Lazarus team**</content>
<parameter name="filePath">c:\Users\ricky\Documents\repos\lazarus-front\README.md