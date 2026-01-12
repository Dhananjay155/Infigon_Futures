# Product Explorer Dashboard

A modern, responsive product catalog application built with Next.js 14, TypeScript, and Tailwind CSS. Browse products, search, filter by category, manage favorites, and toggle between light and dark themes.


## 🚀 Features

### Core Features

- **Product Listing**
  - Responsive grid layout (1-4 columns based on screen size)
  - Real-time product data from [Fake Store API](https://fakestoreapi.com/)
  - Product cards with image, title, price, category, and rating
  - Loading skeletons for better UX
  - Comprehensive error handling with retry functionality

- **Search & Filtering**
  - Client-side search by product title
  - Filter by category (dynamic categories from API)
  - Show favorites only filter
  - Real-time results with optimized performance

- **Product Details**
  - Dynamic routing (`/products/[id]`)
  - Large product images
  - Complete product information
  - Rating and review count
  - Back navigation

- **Favorites Management**
  - Mark/unmark products as favorites
  - Persistent storage using localStorage
  - Favorites counter and filter
  - Synced across all pages

- **Dark Mode**
  - Toggle between light and dark themes
  - Persistent theme preference
  - Respects system preferences
  - Smooth transitions
  - No flash of unstyled content

### Design Features

- **Responsive Design**
  - Mobile-first approach
  - Breakpoints: Mobile (1 col) → Tablet (2 cols) → Desktop (3-4 cols)
  - Sticky header on main page
  - Touch-friendly buttons and interactions

- **User Experience**
  - Loading states with skeleton screens
  - Error states with retry options
  - Smooth animations and transitions
  - Accessible UI with ARIA labels
  - Optimized images with Next.js Image component

## 📋 Technical Requirements Met

✅ **Next.js App Router** - Uses the latest App Router architecture  
✅ **TypeScript** - Fully typed with no `any` types  
✅ **Tailwind CSS** - Utility-first styling with dark mode support  
✅ **Typed API Responses** - All API responses and props are properly typed  
✅ **Reusable Components** - Modular component architecture  
✅ **Clean Folder Structure** - Organized by feature and responsibility  
✅ **Error Handling** - Comprehensive error boundaries and states  
✅ **localStorage** - Persistent favorites and theme preferences  

## ScreenShot

![Light Mode](/public/screenshots/LightMode.jpg)
![Dark Mode](/public/screenshots/DarkMode.jpg)
![Product Detail](/public/screenshots/ProductDetail.jpg)

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **API**: [Fake Store API](https://fakestoreapi.com/)

## 📁 Project Structure
```
product-explorer/
├── app/
│   ├── layout.tsx             
│   ├── page.tsx               
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx        
│   └── globals.css            
├── components/
│   ├── HomePageClient.tsx     
│   ├── ProductDetailClient.tsx 
│   ├── ProductCard.tsx         
│   ├── ProductGrid.tsx         
│   ├── SearchBar.tsx           
│   ├── CategoryFilter.tsx      
│   ├── LoadingSkeleton.tsx     
│   ├── ErrorState.tsx          
│   └── ThemeToggle.tsx         
├── hooks/
│   ├── useFavorites.ts         
│   └── useThemeToggle.ts       
├── lib/
│   ├── api.ts                 
│   └── favorites.ts           
├── types/
│   └── product.ts             
├── next.config.js              
├── tailwind.config.ts         
├── tsconfig.json               
└── package.json                
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
   git clone <repository-url>
   cd product-explorer
```

2. **Install dependencies**
```bash
   npm install
```

3. **Run the development server**
```bash
   npm run dev
```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)


## 🎨 Features in Detail

### Search & Filter

The search and filter system uses client-side filtering with `useMemo` for optimal performance:

- **Search**: Real-time search across product titles
- **Category Filter**: Dynamic categories loaded from API
- **Favorites Filter**: Toggle to show only favorited products
- **Results Counter**: Shows current results vs total products


### Dark Mode

Dark mode is implemented using Tailwind's dark mode feature:

- Automatically respects system preferences
- Manual toggle with persistent storage
- Smooth transitions between themes
- No flash of unstyled content (FOUC prevention)


### Next.js Configuration

Image optimization is configured in `next.config.js`:
```javascript
{
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
}
```

## 🎯 API Endpoints Used

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `GET /products/categories` - Fetch all categories

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for hosting and deployment platform

---

**Happy Coding! 🚀**
