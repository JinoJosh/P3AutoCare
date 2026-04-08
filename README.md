# P3 AutoCare - Complete Website

A professional, fully-responsive static website for P3 AutoCare, a panel beating and spray painting service in Pretoria North.

## 📁 Project Structure

```
P3Website/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── gallery.html            # Gallery with lightbox
├── testimonials.html       # Customer testimonials
├── contact.html            # Contact form
│
├── assets/
│   ├── images/            # Image folder
│   └── favicon.ico        # Website favicon
│
├── css/
│   └── style.css          # Main stylesheet (fully responsive)
│
├── js/
│   └── script.js          # All JavaScript functionality
│
└── README.md              # This file
```

## 🎨 Design Features

### Colors
- **Primary Yellow**: #FFE200
- **Navy Blue**: #001F3F
- **Black**: #000000
- **White**: #FFFFFF

### Typography
- **Headings**: Montserrat (Google Fonts)
- **Body Text**: Roboto (Google Fonts)

### Features
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Modern, clean automotive design
- ✅ Smooth animations and transitions
- ✅ Lightbox gallery with keyboard navigation
- ✅ Testimonial carousel
- ✅ Mobile-friendly navigation menu
- ✅ Scroll-to-top button
- ✅ Smooth scrolling
- ✅ Intersection Observer animations
- ✅ Form validation
- ✅ SEO optimized (meta tags, OpenGraph)

## 📄 Pages Included

### 1. **Home Page** (index.html)
- Hero section with CTA button
- 4 "Why Choose Us" cards
- Featured services preview
- Call-to-action section
- Footer with links

### 2. **About Page** (about.html)
- Company story
- Mission & values (4 cards)
- Team section with team members
- What makes us different (6 items)

### 3. **Services Page** (services.html)
- 8 service cards with details:
  - Panel Beating
  - Spray Painting
  - Bumper Repair
  - Dent & Scratch Removal
  - Rust Treatment
  - Polishing & Detailing
  - Headlight Restoration
  - Accident Quotes
- Service process (4 steps)

### 4. **Gallery Page** (gallery.html)
- Responsive image grid
- Before/After layout
- Lightbox popup with navigation
- Keyboard controls (arrow keys, ESC)
- 8 project examples

### 5. **Testimonials Page** (testimonials.html)
- Testimonial carousel (auto-rotating)
- Star ratings
- 6 customer testimonials
- Statistics section
- Dot navigation

### 6. **Contact Page** (contact.html)
- Contact information
- Business hours
- Contact form with validation
- File upload for images
- WhatsApp quick contact
- Embedded map
- FormSubmit.co integration

## 🚀 How to Run

### Option 1: VS Code Live Server (Recommended)

1. **Install Live Server Extension** (if not already installed):
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install by Ritwick Dey

2. **Open the project**:
   - Open VS Code
   - File → Open Folder
   - Select the P3Website folder

3. **Start Live Server**:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Website opens in your default browser

4. **Auto-reload**:
   - Any changes you save will automatically reload in the browser

### Option 2: Python (Simple HTTP Server)

If you have Python installed:

```bash
# Navigate to the P3Website folder
cd c:\Users\joshp\Desktop\P3Website

# Python 3
python -m http.server 8000

# Then open in browser: http://localhost:8000
```

### Option 3: Node.js (http-server)

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to project folder
cd c:\Users\joshp\Desktop\P3Website

# Start server
http-server

# Visit: http://localhost:8080
```

## ✨ JavaScript Features

### Mobile Navigation
- Click hamburger menu on mobile
- Menu closes when a link is clicked
- Smooth toggle animation

### Lightbox Gallery
- Click any gallery image to open
- Navigate with arrow buttons or keyboard arrows
- Press ESC to close
- Auto-cycling through images

### Testimonials Carousel
- Auto-rotates every 5 seconds
- Manual controls (prev/next buttons)
- Dot indicators
- Smooth transitions

### Form Validation
- Required field checking
- Email format validation
- Phone number validation
- Integrated with FormSubmit.co

### Animations
- Scroll animations (IntersectionObserver)
- Fade-in on load
- Hover effects
- Smooth scrolling
- Scroll-to-top button

## 🔧 Customization

### Update Business Information

Edit `contact.html`:
```html
<!-- Update phone number -->
(012) 345-6789

<!-- Update email -->
info@p3autocare.co.za

<!-- Update address -->
972 Paul Kruger St, Mayville, Pretoria, 0084
```

### Change Colors

Edit `css/style.css`:
```css
:root {
    --color-yellow: #FFE200;
    --color-navy: #001F3F;
    --color-black: #000000;
    --color-white: #FFFFFF;
}
```

### Update Logo

Replace placeholder in `index.html`:
```html
<img src="https://via.placeholder.com/150x50?text=P3+AutoCare" alt="P3 AutoCare Logo">
```

With your actual logo:
```html
<img src="assets/images/logo.png" alt="P3 AutoCare Logo">
```

### Add Real Images

Replace all placeholder images:
```html
<!-- From -->
<img src="https://via.placeholder.com/300x200?text=Panel+Beating" alt="">

<!-- To -->
<img src="assets/images/panel-beating.jpg" alt="Panel Beating Service">
```

### Customize WhatsApp Link

Edit the WhatsApp number in all files:
```html
<!-- From -->
https://wa.me/27760351998

<!-- To -->
https://wa.me/YOUR_PHONE_NUMBER
```

## 📧 Form Integration

### Using FormSubmit.co

The form is already configured to use FormSubmit.co. Just update the email in `contact.html`:

```html
<form id="contactForm" name="contact" method="POST" enctype="multipart/form-data">
    <!-- Form fields -->
</form>
```

Change the fetch endpoint in `js/script.js`:
```javascript
const response = await fetch('https://formsubmit.co/YOUR_EMAIL@example.com', {
```

### Alternative: Netlify Forms

Add to `contact.html`:
```html
<form netlify name="contact">
    <!-- form fields -->
</form>
```

## 🔍 SEO

All pages include:
- Meta descriptions
- Keywords
- OpenGraph tags for social sharing
- Image alt text
- Proper heading structure
- Mobile viewport configuration

## 🎯 Performance Tips

- Images use placeholder URLs (replace with actual images)
- CSS is minified and optimized
- JavaScript is vanilla (no dependencies)
- Lazy loading support (can be enhanced)
- Minimal file sizes
- Fast load times

## 📱 Mobile Responsiveness

Website is fully responsive at:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🌐 Deployment Options

### 1. **Netlify** (Recommended)
- Connect GitHub repository
- Auto-deploys on push
- Free HTTPS
- Forms integration available

### 2. **GitHub Pages**
- Push to GitHub repo
- Enable Pages in settings
- Free hosting

### 3. **Vercel**
- Similar to Netlify
- Excellent performance
- Free tier available

### 4. **Traditional Hosting**
- Upload files via FTP
- Works on any web server
- No build process needed

## 📝 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers

## 🚫 Known Limitations

- Placeholder images use via.placeholder.com (replace with real images)
- Map is embedded (uses Google Maps iframe)
- Contact form requires email service setup
- WhatsApp link uses hardcoded phone number

## 📞 Quick Contact Update

To update all contact information across the site:

1. Phone: Search for `(012) 345-6789` and replace
2. Email: Search for `info@p3autocare.co.za` and replace
3. WhatsApp: Search for `27123456789` and replace
4. Address: Search for `972 Paul Kruger St, Mayville, Pretoria, 0084` and replace

## 🎓 Code Quality

- Valid HTML5
- Valid CSS3
- Clean, commented JavaScript
- No dependencies or frameworks
- Pure vanilla implementation
- Accessibility-friendly

## 📄 License

This website template is ready to use for P3 AutoCare. All code is original and customizable.

## 🆘 Support

For issues or customization needs:
1. Check that all files are in correct folders
2. Verify browser console for errors
3. Ensure live server is running correctly
4. Clear browser cache (Ctrl+Shift+Del)

---

**Created**: 2025
**Version**: 1.0
**Status**: Production Ready

Enjoy your new P3 AutoCare website! 🚗✨
