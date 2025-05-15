# YourBrand Studio - Creative Services Website

A modern, responsive website for a creative studio offering design, development, 3D visualization, content creation, and data automation services.

## Overview

This website is designed to showcase a range of creative services and provide an easy way for potential clients to learn about the services and get in touch.

## Pages

- **Home**: Introduction to the studio and overview of services
- **About**: Information about the studio owner and values
- **Services**: Detailed breakdown of all services with pricing
- **Portfolio**: Showcase of past work and projects
- **Contact**: Contact form and information

## Features

- Fully responsive design that works on all devices
- Modern, clean aesthetic with custom styling
- Interactive elements like portfolio filtering and FAQ accordions
- Contact form that connects to email
- Optimized performance with lazy loading images
- Smooth scrolling and animations

## Getting Started

1. All HTML pages are in the root directory
2. CSS styles are in the `css` folder
3. JavaScript is in the `js` folder
4. Image assets should be placed in the `images` folder

### Important Note

Before deploying:

1. Replace all placeholder images in the `images` folder with actual content
2. Update the email address (`adamchaabane1234@gmail.com`) with your actual contact email
3. Add real portfolio work and testimonials
4. Update business name from "YourBrand Studio" to your actual business name

## Customization

### Changing Colors

The main colors can be changed in the CSS variables at the top of the `css/styles.css` file:

```css
:root {
    --primary-color: #4361ee;
    --secondary-color: #ffd60a;
    --dark-color: #16213e;
    --light-color: #f8f9fa;
    /* other variables */
}
```

### Adding New Portfolio Items

To add new portfolio items, copy the structure of existing portfolio items in the `portfolio.html` file and update with your new content:

```html
<div class="portfolio-item" data-category="category-name">
    <div class="portfolio-image">
        <img src="images/portfolio/your-image.jpg" alt="Description">
        <div class="portfolio-overlay">
            <div class="overlay-content">
                <h3>Project Title</h3>
                <p>for Client Name</p>
            </div>
        </div>
    </div>
    <div class="portfolio-details">
        <h4>Project Title</h4>
        <p>Category</p>
    </div>
</div>
```

## Technologies Used

- HTML5
- CSS3 (Custom styling without frameworks)
- JavaScript (Vanilla, no libraries)
- Responsive design using CSS Grid and Flexbox
- Font Awesome icons

## Browser Support

The website is compatible with:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## License

This project is available for your use. Please replace all placeholder content with your own before publishing.

---

Created with ❤️ for your creative business 