# Food Delivery App - React JS Frontend

A modern, responsive food delivery application built with React JS, featuring a seamless user experience for browsing menus, managing carts, placing orders, and tracking order status.

## 🚀 Features

### Core Functionality
- **Menu Exploration**: Browse food items by categories with smooth scrolling and animations
- **Cart Management**: Add/remove items from cart with quantity controls
- **Order Placement**: Complete checkout process with customer details and payment integration
- **Order Tracking**: Real-time order status tracking with visual timeline
- **User Authentication**: Login/signup functionality for personalized experience UI
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices

### User Experience
- Smooth animations and transitions
- Intuitive navigation with category filtering
- Real-time cart updates
- Order confirmation with detailed receipt
- Mobile-first design approach

### Technical Features
- API integration with backend services
- Form validation for order placement
- Error handling and loading states
- Optimized performance with lazy loading
- Accessibility-compliant components

## 🛠 Tech Stack

### Frontend
- **React JS** - Component-based UI library
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with CSS variables
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Development Tools
- **ESLint** - Code linting and formatting
- **Git** - Version control
- **VS Code** - Recommended IDE

### Key Dependencies
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-router-dom` ^6.8.0
- `axios` ^1.4.0

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/food-delivery-app-react.git
cd food-delivery-app-react
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your API endpoints:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Food Delivery App
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
food-delivery-app-react/
├── public/
│   ├── header_img.png
│   ├── header_img2.png
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── assets.js          # Asset imports and exports
│   │   └── food-images/       # Food item images
│   ├── components/
│   │   ├── AppDownload/       # App download section
│   │   ├── ExploreMenu/       # Menu category selector
│   │   ├── FoodDisplay/       # Food items grid display
│   │   ├── FoodItem/          # Individual food item component
│   │   ├── Footer/            # Site footer
│   │   ├── Header/            # Site header with navigation
│   │   ├── LoginPopup/        # Authentication modal
│   │   ├── Navbar/            # Navigation bar
│   │   └── validations/       # Form validation utilities
│   ├── constant/
│   │   └── apiEndPoints.jsx   # API endpoint constants
│   ├── context/
│   │   └── StoreContext.jsx   # Global state management
│   ├── pages/
│   │   ├── Cart/              # Shopping cart page
│   │   ├── Home/              # Landing page
│   │   ├── OrderSuccess/      # Order confirmation page
│   │   └── PlaceOrder/        # Checkout page
│   ├── services/
│   │   └── servicesApi.jsx    # API service functions
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles and CSS variables
│   └── main.jsx               # App entry point
├── .env                       # Environment variables
├── .eslintrc.cjs              # ESLint configuration
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML template
├── package.json               # Project dependencies and scripts
├── README.md                  # Project documentation
├── vite.config.js             # Vite configuration
└── screenshots/               # App screenshots
```

## 🔄 Application Flow

### User Journey
1. **Landing Page**: User browses featured items and categories
2. **Menu Exploration**: Select category to filter food items
3. **Item Selection**: View item details and add to cart
4. **Cart Management**: Adjust quantities or remove items
5. **Checkout**: Enter delivery details and place order
6. **Order Confirmation**: View order status and timeline
7. **Order Tracking**: Monitor delivery progress

### Data Flow
- **Frontend** ↔ **API Layer** ↔ **Backend Services**
- State managed through React Context API
- API calls handled by dedicated service layer
- Form validation at component and service levels

## 🔧 API Integration

The application integrates with backend APIs for:

- **Menu Management**: Fetch food items and categories
- **Order Processing**: Place and track orders
- **User Authentication**: Login/signup functionality

### API Endpoints Used
- `GET /menus` - Fetch all menu items
- `POST /orders` - Place new order
- `GET /orders/:id` - Fetch order details
- `POST /auth/login` - User authentication

## 🏗 Scalability and Maintainability

### Steps Taken for Scalability

1. **Modular Architecture**:
   - Components are broken into reusable, single-responsibility modules
   - Each page and component has its own directory with CSS and JSX files

2. **State Management**:
   - React Context API for global state (cart, user data)
   - Centralized state logic in StoreContext.jsx
   - Easy to extend for additional state needs

3. **API Layer Abstraction**:
   - Dedicated services layer (servicesApi.jsx) for all API calls
   - Centralized error handling and response processing
   - Easy to switch API providers or add caching

4. **Responsive Design**:
   - Mobile-first approach with CSS Grid and Flexbox
   - CSS variables for consistent theming
   - Media queries for different screen sizes

5. **Performance Optimization**:
   - Lazy loading for components and images
   - Optimized bundle size with Vite
   - Efficient re-rendering with React.memo where appropriate

### Steps Taken for Maintainability

1. **Code Organization**:
   - Clear separation of concerns (components, services, constants)
   - Consistent naming conventions
   - ESLint for code quality enforcement

2. **Styling Consistency**:
   - CSS variables for colors, fonts, and spacing
   - Component-scoped CSS to avoid conflicts
   - Theme-based color scheme for easy customization

3. **Error Handling**:
   - Try-catch blocks in API calls
   - User-friendly error messages
   - Loading states for better UX

4. **Documentation**:
   - Comprehensive README with setup instructions
   - Inline comments for complex logic
   - API endpoint documentation

5. **Version Control**:
   - Git for version control
   - Meaningful commit messages
   - Branching strategy for feature development

### Best Practices Implemented

- **Semantic HTML**: Proper use of HTML5 semantic elements
- **Accessibility**: ARIA labels and keyboard navigation support
- **Cross-browser Compatibility**: Tested on modern browsers
- **Security**: Input validation and sanitization
- **Performance**: Optimized images and lazy loading
- **SEO**: Meta tags and semantic structure

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Hosting Platforms
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag-and-drop dist folder or connect repo
- **GitHub Pages**: Use gh-pages package for deployment

### Environment Variables for Production
Ensure production environment variables are set:
- API base URL pointing to production backend
- Any third-party service keys

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint rules
- Write descriptive commit messages
- Test on multiple devices/browsers
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📸 Screenshots

### Home Page
<img src='./screenshots/1.png' alt='Home Page' width='400'>

### Menu Categories
<img src='./screenshots/2.png' alt='Menu Categories' width='400'>

### Cart Page
<img src='./screenshots/3.png' alt='Cart Page' width='400'>

### Order Placement
<img src='./screenshots/4.png' alt='Order Placement' width='400'>

### Order Success
<img src='./screenshots/5.png' alt='Order Success' width='400'>

## 📞 Support

For support or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React JS**