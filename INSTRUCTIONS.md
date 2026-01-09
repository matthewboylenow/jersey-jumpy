# Jersey Jumpy - Next.js Website Rebuild

## Project Overview

Complete rebuild of jerseyjumpy.com from WordPress to a modern Next.js application with a custom admin backend for managing inflatables, party packages, testimonials, and contact form submissions.

**Current Site**: https://jerseyjumpy.com (WordPress on Cloudways)
**New Stack**: Next.js 14+ (App Router), Neon PostgreSQL, Vercel Blob Storage, deployed on Vercel

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (NOT v16 - use v15.x specifically)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (as base, heavily customized)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: Google Fonts (specific choices below)

### Backend
- **Database**: Neon PostgreSQL (Vercel integration)
- **ORM**: Drizzle ORM
- **Image Storage**: Vercel Blob
- **Email**: Elastic Email (for contact form notifications)
- **Auth**: NextAuth.js v5 (Auth.js) for admin panel

### Deployment
- **Hosting**: Vercel
- **Domain**: jerseyjumpy.com

### Important Version Notes
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

---

## Design Direction

### CRITICAL: This Must Look EXTRAORDINARY

**The Problem**: Most bounce house / inflatable rental websites look absolutely terrible. They're either:
- Stuck in 2010 with clip art and Comic Sans
- Generic WordPress templates with stock photos
- Cluttered with too many colors fighting for attention
- Boring corporate sites that don't capture the FUN

**The Goal**: Create a website that makes parents say "WOW" the moment it loads. Something that feels like a **premium children's brand** - think the quality of Apple or Airbnb, but with the joy and energy of a children's museum or Pixar movie.

---

### Aesthetic: "Dreamy Pastel Playground"

Imagine: A magical, whimsical world where everything feels soft, bouncy, and inviting. Like stepping into a cloud made of cotton candy. Premium, but playful. Sophisticated, but joyful.

**Reference Vibes** (for inspiration, not copying):
- Headspace app's calming illustrations
- Mailchimp's playful brand personality  
- Notion's clean but warm aesthetic
- A high-end children's bookstore
- Studio Ghibli color palettes

---

### Color System

```css
:root {
  /* Primary Pastels - The Stars */
  --lavender-dream: #C8B6FF;
  --lavender-light: #E2D9FF;
  --mint-fresh: #9FFFCB;
  --mint-light: #CAFFEB;
  --peach-glow: #FFB5A7;
  --peach-light: #FFD6CC;
  --sky-float: #89CFF0;
  --sky-light: #BDE4FF;
  --butter-cream: #FFF1A8;
  --butter-light: #FFF8D6;
  --coral-pop: #FF8FA3;
  --coral-light: #FFB8C6;
  
  /* Background Gradients */
  --bg-primary: linear-gradient(135deg, #FFF9F5 0%, #F0F7FF 50%, #FFF5F8 100%);
  --bg-hero: linear-gradient(180deg, #E8F4FD 0%, #FFF9F5 100%);
  --bg-section-alt: linear-gradient(135deg, #FDF6FF 0%, #F5FAFF 100%);
  
  /* Glass Effects */
  --glass-white: rgba(255, 255, 255, 0.7);
  --glass-blur: blur(20px);
  
  /* Shadows - Soft & Dreamy */
  --shadow-soft: 0 4px 30px rgba(200, 182, 255, 0.15);
  --shadow-card: 0 8px 40px rgba(200, 182, 255, 0.2);
  --shadow-hover: 0 20px 60px rgba(200, 182, 255, 0.3);
  --shadow-glow-lavender: 0 0 60px rgba(200, 182, 255, 0.4);
  --shadow-glow-mint: 0 0 60px rgba(159, 255, 203, 0.4);
  --shadow-glow-peach: 0 0 60px rgba(255, 181, 167, 0.4);
  
  /* Text */
  --text-primary: #2D2A3E;
  --text-secondary: #5C5470;
  --text-muted: #8E8BA3;
  
  /* Accents for CTAs */
  --cta-primary: #7C5DFA;
  --cta-primary-hover: #9277FF;
  --cta-secondary: #FF6B9D;
}
```

---

### Typography - Make It Memorable

**Display Font (Headers, Hero)**: 
- **"Baloo 2"** or **"Nunito"** - Rounded, friendly, bouncy feeling
- Use for: H1, H2, navigation, buttons
- Weight: 700-800 for headers

**Body Font**: 
- **"DM Sans"** - Clean, modern, highly readable
- Use for: Paragraphs, specs, form labels
- Weight: 400-500

**Accent Font (Special callouts)**:
- **"Caveat"** or **"Kalam"** - Handwritten feel for testimonials or fun callouts

```css
/* Font sizing - generous and readable */
--font-hero: clamp(3rem, 8vw, 6rem);
--font-h1: clamp(2.5rem, 5vw, 4rem);
--font-h2: clamp(1.75rem, 4vw, 2.5rem);
--font-h3: clamp(1.25rem, 3vw, 1.75rem);
--font-body: 1.125rem;
--font-small: 0.875rem;
```

---

### Visual Elements & Effects

#### 1. Floating Blob Shapes
Organic, amoeba-like shapes that float in the background. Use SVG with subtle CSS animations.

```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.blob {
  animation: float 8s ease-in-out infinite;
}
```

#### 2. Glassmorphism Cards
Cards with frosted glass effect - white/translucent with blur backdrop.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(200, 182, 255, 0.15);
}
```

#### 3. Gradient Borders
Instead of solid borders, use gradient borders for special elements.

```css
.gradient-border {
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, var(--lavender-dream), var(--peach-glow), var(--mint-fresh)) border-box;
  border: 3px solid transparent;
  border-radius: 24px;
}
```

#### 4. Bouncy Micro-interactions
Everything should feel alive and bouncy!

```css
.bouncy-hover {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bouncy-hover:hover {
  transform: scale(1.05) translateY(-4px);
}
```

#### 5. Confetti/Sprinkle Decorations
Small colorful dots/sprinkles scattered sparingly as decorative elements.

#### 6. Wave Dividers
Use SVG waves between sections instead of harsh lines.

```svg
<svg viewBox="0 0 1440 100" preserveAspectRatio="none">
  <path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="currentColor"/>
</svg>
```

#### 7. Animated Gradient Backgrounds
Subtle moving gradients for hero section.

```css
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(-45deg, #E8F4FD, #FFF5F8, #F0FFF5, #FFF9E6);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}
```

---

### Component Design Specifications

#### Navigation
- Sticky header with glass effect on scroll
- Logo: Rainbow "Jersey Jumpy" (keep existing SVG)
- Nav links: Rounded pill-shaped hover states
- Mobile: Full-screen overlay with staggered animation
- Phone number: Prominent, with bouncy pulse animation on CTA

#### Hero Section
- Full viewport height on desktop
- Animated gradient background
- Large bold headline with gradient text effect
- Floating inflatable images/illustrations
- Multiple floating blob shapes
- Phone number as a floating pill that pulses
- Scroll indicator with bounce animation

```
┌─────────────────────────────────────────────────┐
│  [Logo]              Home  Inflatables  Contact │
├─────────────────────────────────────────────────┤
│                                                 │
│         🎈                              🎪      │
│              LET'S                              │
│            BOUNCE!                    ☁️        │
│                                                 │
│   [Floating blob]    New Jersey's #1           │
│                      Bounce House Rentals      │
│                                                 │
│         [ 📞 Call Now: 866-597-6625 ]          │
│         [    Browse Inflatables     ]          │
│                                                 │
│              ↓ Scroll to explore               │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### Inflatable Cards
- Soft rounded corners (24px radius)
- Image takes 60% of card height
- Subtle gradient overlay on image
- Category tag as a floating pill
- Price badge in corner
- On hover: 
  - Card lifts with enhanced shadow
  - Image zooms slightly
  - Quick view button fades in

```
┌──────────────────────────┐
│ ┌──────────────────────┐ │
│ │                      │ │
│ │    [Inflatable      │ │
│ │       Image]        │ │  ← Category pill floats here
│ │                      │ │
│ └──────────────────────┘ │
│                          │
│  Dora The Explorer       │
│  13'x13' Bouncer         │
│                          │
│  From $350    [View →]   │
└──────────────────────────┘
```

#### Testimonials Section
- Large quote marks as decorative elements
- Cards with customer photo placeholder (colorful avatar)
- Star ratings with animated fill
- Carousel with smooth snap scrolling
- Handwritten-style font for quotes

#### CTA Sections
- Full-width gradient background
- Large, bold text
- Floating decorative elements (stars, confetti)
- Button with glow effect on hover

#### Footer
- Dark mode (deep purple: #2D2A3E)
- Organic wave shape at top
- Contact info with icons
- Social links as rounded buttons with hover glow
- "Made with ❤️" touch

---

### Animation Guidelines

Use Framer Motion for these key animations:

#### Page Load
```javascript
// Staggered fade-up for content blocks
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};
```

#### Scroll Animations
- Elements fade in and slide up as they enter viewport
- Use `whileInView` with `viewport={{ once: true }}`

#### Hover States
- Cards: Scale 1.02-1.05, lift with shadow
- Buttons: Scale 1.05, glow effect
- Links: Color transition, underline animation

#### Loading States
- Skeleton screens with shimmer effect
- Bouncy loading dots

---

### Page-Specific Design Notes

#### Homepage
1. **Hero**: Full impact, animated, shows the fun
2. **Quick Actions**: 3 glass cards with icons
3. **Featured Inflatables**: 2x3 or 3x3 grid of top picks
4. **About/Trust**: Photo + text, certifications badges
5. **Testimonials**: Carousel with large quotes
6. **CTA**: "Ready to Party?" with phone number

#### Inflatables Listing
1. **Filter bar**: Sticky, glass effect, pill-shaped category buttons
2. **Grid**: Responsive, 1-2-3-4 columns as screen grows
3. **Cards**: Consistent height, lazy-loaded images
4. **No results**: Fun illustration, helpful message

#### Inflatable Detail
1. **Hero image**: Large, with zoom capability
2. **Quick info bar**: Price, size, capacity icons
3. **Tabs or accordion**: Specs, setup, FAQ
4. **Sticky CTA**: Mobile-friendly booking button
5. **Related**: "You might also like" carousel

#### Contact Page
1. **Two-column layout**: Form + contact info
2. **Form**: Glass card, clear sections, inline validation
3. **Map or illustration**: Visual interest
4. **Success state**: Confetti animation!

---

### Mobile Considerations

- **Touch targets**: Minimum 44px
- **Thumb-friendly**: Important actions at bottom
- **Simplified animations**: Reduce motion for performance
- **Full-width cards**: Single column on mobile
- **Sticky phone button**: Floating call button on mobile
- **Bottom sheet modals**: For filters on mobile

---

### Don't Do These Things ❌

1. ❌ Generic sans-serif fonts (Arial, Helvetica)
2. ❌ Flat white backgrounds with no depth
3. ❌ Sharp corners everywhere
4. ❌ Stock photo vibes (stiff, corporate)
5. ❌ Tiny text that's hard to read
6. ❌ Cluttered layouts with no breathing room
7. ❌ Purple gradient clichés (like every AI site)
8. ❌ Boring hover states (just color change)
9. ❌ Static, lifeless feel
10. ❌ Cookie-cutter component library look

### Do These Things ✅

1. ✅ Rounded, soft, friendly everywhere
2. ✅ Generous whitespace (let it breathe!)
3. ✅ Depth through shadows and layers
4. ✅ Motion that delights (but doesn't overwhelm)
5. ✅ Color that makes you smile
6. ✅ Typography that has personality
7. ✅ Details that reward close inspection
8. ✅ Consistent design language throughout
9. ✅ Fast, smooth, performant
10. ✅ Accessible to everyone

---

## Code Examples & Patterns

These are starter patterns to establish the visual language. Expand on these.

### Tailwind Config Customization

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        lavender: {
          DEFAULT: '#C8B6FF',
          light: '#E2D9FF',
          dark: '#9B7FFF'
        },
        mint: {
          DEFAULT: '#9FFFCB',
          light: '#CAFFEB',
          dark: '#5FE89D'
        },
        peach: {
          DEFAULT: '#FFB5A7',
          light: '#FFD6CC',
          dark: '#FF8A75'
        },
        sky: {
          DEFAULT: '#89CFF0',
          light: '#BDE4FF',
          dark: '#4FB3E8'
        },
        butter: {
          DEFAULT: '#FFF1A8',
          light: '#FFF8D6',
          dark: '#FFE566'
        },
        coral: {
          DEFAULT: '#FF8FA3',
          light: '#FFB8C6',
          dark: '#FF5C7A'
        }
      },
      fontFamily: {
        display: ['Baloo 2', 'Nunito', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        handwritten: ['Caveat', 'cursive']
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%'
      },
      boxShadow: {
        'soft': '0 4px 30px rgba(200, 182, 255, 0.15)',
        'card': '0 8px 40px rgba(200, 182, 255, 0.2)',
        'hover': '0 20px 60px rgba(200, 182, 255, 0.3)',
        'glow-lavender': '0 0 60px rgba(200, 182, 255, 0.4)',
        'glow-mint': '0 0 60px rgba(159, 255, 203, 0.4)',
        'glow-peach': '0 0 60px rgba(255, 181, 167, 0.4)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' }
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 93, 250, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 93, 250, 0.6)' }
        }
      }
    }
  }
}
```

### Glass Card Component

```tsx
// components/ui/GlassCard.tsx
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white/70 backdrop-blur-xl",
        "border border-white/50",
        "rounded-3xl",
        "shadow-card",
        hover && "transition-all duration-300 hover:shadow-hover hover:-translate-y-1",
        className
      )}
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  )
}
```

### Floating Blob Background

```tsx
// components/decorative/FloatingBlobs.tsx
export function FloatingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Lavender blob - top right */}
      <div 
        className="absolute -top-20 -right-20 w-96 h-96 bg-lavender/30 rounded-blob animate-float blur-3xl"
      />
      
      {/* Mint blob - bottom left */}
      <div 
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-mint/20 rounded-blob animate-float-delayed blur-3xl"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Peach blob - center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-peach/10 rounded-blob animate-float blur-3xl"
        style={{ animationDelay: '4s' }}
      />
    </div>
  )
}
```

### Animated Hero Headline

```tsx
// components/home/HeroHeadline.tsx
"use client"
import { motion } from "framer-motion"

export function HeroHeadline() {
  const words = ["LET'S", "BOUNCE!"]
  
  return (
    <h1 className="text-6xl md:text-8xl font-display font-extrabold text-center">
      {words.map((word, i) => (
        <motion.span
          key={word}
          className={i === 1 ? "bg-gradient-to-r from-lavender via-peach to-coral bg-clip-text text-transparent" : "text-gray-900"}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: i * 0.2,
            type: "spring",
            stiffness: 100
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </h1>
  )
}
```

### Bouncy Button

```tsx
// components/ui/BouncyButton.tsx
"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BouncyButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
}

export function BouncyButton({ 
  children, 
  variant = "primary", 
  size = "md",
  className,
  onClick 
}: BouncyButtonProps) {
  return (
    <motion.button
      className={cn(
        "font-display font-bold rounded-full",
        "transition-all duration-300",
        // Size variants
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        // Color variants
        variant === "primary" && [
          "bg-gradient-to-r from-[#7C5DFA] to-[#9277FF]",
          "text-white",
          "shadow-lg shadow-[#7C5DFA]/30",
          "hover:shadow-xl hover:shadow-[#7C5DFA]/40",
          "animate-pulse-glow"
        ],
        variant === "secondary" && [
          "bg-white",
          "text-[#7C5DFA]",
          "border-2 border-[#7C5DFA]/20",
          "hover:border-[#7C5DFA]/40",
          "hover:bg-lavender-light/30"
        ],
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}
```

### Inflatable Card

```tsx
// components/inflatables/InflatableCard.tsx
"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/GlassCard"

interface InflatableCardProps {
  inflatable: {
    slug: string
    name: string
    subtitle: string
    category: string
    price: number
    mainImageUrl: string
  }
}

export function InflatableCard({ inflatable }: InflatableCardProps) {
  const categoryColors: Record<string, string> = {
    '13x13-bouncers': 'bg-lavender text-lavender-dark',
    'castle-bouncers': 'bg-peach text-peach-dark',
    'combo-bouncers': 'bg-mint text-mint-dark',
    'wet-dry-slides': 'bg-sky text-sky-dark',
    'obstacle-courses': 'bg-coral text-coral-dark'
  }
  
  return (
    <Link href={`/inflatables/${inflatable.slug}`}>
      <GlassCard className="group overflow-hidden">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <Image
            src={inflatable.mainImageUrl}
            alt={inflatable.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Category Badge */}
          <motion.span 
            className={cn(
              "absolute top-4 left-4",
              "px-3 py-1 rounded-full",
              "text-xs font-bold",
              categoryColors[inflatable.category] || 'bg-lavender'
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {inflatable.subtitle}
          </motion.span>
          
          {/* Price Badge */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-sm font-bold text-gray-900">
              From ${inflatable.price}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-[#7C5DFA] transition-colors">
            {inflatable.name}
          </h3>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {inflatable.subtitle}
            </span>
            <motion.span 
              className="text-[#7C5DFA] font-medium text-sm flex items-center gap-1"
              whileHover={{ x: 5 }}
            >
              View Details 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.span>
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}
```

### Wave Section Divider

```tsx
// components/decorative/WaveDivider.tsx
interface WaveDividerProps {
  color?: string
  flip?: boolean
}

export function WaveDivider({ color = "#ffffff", flip = false }: WaveDividerProps) {
  return (
    <div className={cn("w-full overflow-hidden", flip && "rotate-180")}>
      <svg 
        viewBox="0 0 1440 100" 
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
      >
        <path 
          d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" 
          fill={color}
        />
      </svg>
    </div>
  )
}
```

### Testimonial Card

```tsx
// components/testimonials/TestimonialCard.tsx
import { motion } from "framer-motion"

interface TestimonialCardProps {
  testimonial: {
    customerName: string
    location: string
    content: string
    rating: number
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // Generate consistent color from name
  const colors = ['bg-lavender', 'bg-mint', 'bg-peach', 'bg-sky', 'bg-butter', 'bg-coral']
  const colorIndex = testimonial.customerName.charCodeAt(0) % colors.length
  
  return (
    <motion.div 
      className="bg-white rounded-3xl p-8 shadow-card relative"
      whileHover={{ y: -5 }}
    >
      {/* Large quote mark */}
      <span className="absolute -top-4 -left-2 text-8xl text-lavender/30 font-serif">
        "
      </span>
      
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.span 
            key={i} 
            className="text-butter-dark text-xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            ★
          </motion.span>
        ))}
      </div>
      
      {/* Quote */}
      <p className="font-handwritten text-xl text-gray-700 mb-6 leading-relaxed">
        {testimonial.content}
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          "text-white font-bold text-lg",
          colors[colorIndex]
        )}>
          {testimonial.customerName.charAt(0)}
        </div>
        <div>
          <p className="font-display font-bold text-gray-900">
            {testimonial.customerName}
          </p>
          <p className="text-sm text-gray-500">
            {testimonial.location}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
```

---

## Site Structure

### Public Pages

```
/                       # Homepage
/inflatables            # All inflatables grid (filterable by category)
/inflatables/[slug]     # Individual inflatable page
/party-packages         # Party packages listing
/rates-deposits         # Pricing information
/testimonials           # Customer reviews
/faqs                   # Frequently asked questions
/policies               # Safety policies and rules
/certifications         # NJ DCA certification info
/gallery                # Photo gallery
/contact                # Contact form + booking request
```

### Admin Pages (Protected)

```
/admin                  # Dashboard overview
/admin/inflatables      # Manage inflatables (CRUD)
/admin/party-packages   # Manage party packages (CRUD)
/admin/testimonials     # Manage testimonials (CRUD)
/admin/inquiries        # View contact form submissions + CSV export
/admin/settings         # Site settings (contact info, social links, etc.)
```

---

## Database Schema

### Tables

```sql
-- Inflatables (35 items currently)
CREATE TABLE inflatables (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255), -- e.g., "13'x13' Bouncer"
  category VARCHAR(100) NOT NULL, -- '13x13-bouncers', 'castle-bouncers', 'combo-bouncers', 'wet-dry-slides', 'obstacle-courses'
  description TEXT,
  
  -- Dimensions
  width VARCHAR(20),
  length VARCHAR(20),
  height VARCHAR(20),
  space_required VARCHAR(50), -- e.g., "18' x 18'"
  
  -- Capacity
  capacity_ages_2_4 VARCHAR(20), -- e.g., "6-8 kids"
  capacity_ages_4_7 VARCHAR(20),
  capacity_ages_7_10 VARCHAR(20),
  capacity_ages_10_plus VARCHAR(20),
  height_requirement VARCHAR(50), -- e.g., "42\" minimum"
  
  -- Adult info
  adults_allowed BOOLEAN DEFAULT true,
  adult_weight_limit VARCHAR(50), -- e.g., "180 lbs/person"
  adult_max_count INTEGER,
  
  -- Features
  can_use_water BOOLEAN DEFAULT false,
  has_pool BOOLEAN DEFAULT false,
  has_slide BOOLEAN DEFAULT false,
  has_basketball_hoop BOOLEAN DEFAULT false,
  has_climbing_wall BOOLEAN DEFAULT false,
  combo_features TEXT, -- e.g., "jumping area, basketball hoop, climbing ladder, slide"
  
  -- Setup
  setup_surface TEXT, -- e.g., "pavement or grass"
  power_requirement TEXT DEFAULT 'within 100'' of power source',
  generator_note TEXT DEFAULT 'Gas generator available for $100 additional',
  
  -- Pricing
  price INTEGER, -- in dollars, e.g., 350
  price_note VARCHAR(255), -- e.g., "Estimated price based on location"
  
  -- Images
  main_image_url TEXT,
  gallery_image_urls TEXT[], -- array of URLs
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories (for filtering)
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Party Packages
CREATE TABLE party_packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL, -- e.g., "Party Package #1"
  price INTEGER NOT NULL, -- in dollars
  items JSONB NOT NULL, -- array of items, e.g., [{"quantity": 1, "name": "65' Obstacle Course"}]
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  location VARCHAR(255), -- e.g., "Aberdeen, NJ"
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5, -- 1-5 stars
  featured BOOLEAN DEFAULT false, -- show on homepage
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact Form Submissions
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  
  -- Contact info
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  
  -- Address
  address VARCHAR(255),
  address2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(20),
  
  -- Event details
  requested_date DATE,
  requested_time VARCHAR(50),
  requested_jumpy VARCHAR(255), -- selected inflatable or package
  
  -- Marketing
  referral_source VARCHAR(100), -- how they heard about us
  
  -- Additional info
  event_details TEXT,
  
  -- Status
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'booked', 'cancelled'
  notes TEXT, -- admin notes
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- FAQ Items
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site Settings (key-value store)
CREATE TABLE settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin Users
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Inflatable Categories

Based on the current site structure:

| Category Slug | Display Name | Count |
|--------------|--------------|-------|
| `13x13-bouncers` | 13'x13' Bouncers | 11 |
| `castle-bouncers` | Castle Bouncers | 10 |
| `combo-bouncers` | Combo Bouncers | 6 |
| `wet-dry-slides` | Wet/Dry Slides | 5 |
| `obstacle-courses` | Obstacle Courses | 3 |

**Total: 35 inflatables**

---

## Complete Inflatable Inventory

### 13'x13' Bouncers
1. Dora The Explorer
2. Batman
3. The Incredibles
4. Spongebob
5. Disney Princess
6. Happy Birthday
7. Halloween
8. Happy Haunting
9. It's A Girl Thing
10. Trucks
11. Celebrate

### Castle Bouncers
12. Basic Castle (13'x13')
13. Military Truck (15'x15')
14. Excalibur Castle (15'x15')
15. Funhouse Castle (15'x15')
16. Sizzling Castle (15'x15')
17. Excalibur 4-in-1 Castle (15'x15' Combo)
18. Cutting Edge Castle (15'x15')
19. Birthday Cake (15'x15')
20. 10'x10' In-And-Out Jumpbox (15'x15')
21. Jumbo Castle Bouncer (20'x20')

### Combo Bouncers
22. Disney Princess Collection 3D 5-In-One
23. 5-In-One Modular Combo
24. Wacky Kid Zone
25. Jump N Splash Castle with Pool
26. Jump N Splash Paradise Palms with Pool
27. 5-In-One Balloon Ride Bouncer

### Wet/Dry Slides
28. 22' Dry Slide
29. 18' Dual Lane Slide
30. Hawaiian Splash Wet/Dry Slide
31. 20' Fire N Ice with Pool
32. Wild Wave Jr. Wet/Dry Slide

### Obstacle Courses
33. 40' Obstacle Challenge
34. 50' Obstacle Challenge
35. 65' Mega Obstacle Challenge

---

## Party Packages

| Package | Contents | Price |
|---------|----------|-------|
| #1 | (1) 65' Obstacle Course, (1) 40' Obstacle Course, (1) 22' Dry Slide, (1) 15x15 Castle | $2,200 |
| #2 | (2) 15x15 Castles, (2) 40' or 50' Obstacle Courses | $1,900 |
| #3 | (1) 65' Obstacle Course, (1) 22' Dry Slide, (1) 15x15 Castle | $1,700 |
| #4 | (1) 40' Obstacle Course, (1) 15x15 Castle, (1) 18' Dry Slide | $1,300 |

---

## Contact Form Fields

```typescript
interface ContactFormData {
  // Contact
  name: string;         // required
  phone: string;        // required
  email: string;        // required, validated
  
  // Address
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  
  // Event
  requestedDate: Date;
  requestedTime: string;
  requestedJumpy: string; // dropdown with all inflatables + packages
  
  // Marketing
  referralSource: string; // dropdown: Google, Facebook, Instagram, Twitter, 
                         // Truck on the road, Search engine, Postcard, 
                         // Word of mouth, Recommendation, Other
  
  // Other
  eventDetails: string;  // textarea
}
```

---

## Business Information

```
Company: JerseyJumpy.com LLC
Address: PO Box: 217, Iselin, NJ 08830
Phone (Toll Free): 866-597-6625
Phone (Local): 732-750-8810
Emergency: 732-496-2897
Email: info@jerseyjumpy.com

Social Media:
- Facebook: https://www.facebook.com/JerseyJumpy/
- Twitter: https://twitter.com/jerseyjumpy/
- Instagram: https://www.instagram.com/jerseyjumpy/

Established: 2007

Certifications:
- NJ Department of Community Affairs (http://www.state.nj.us/dca/)
- Safe Inflatable Operators Training Certification (http://www.sioto.org/)

Tagline: "GOOD. CLEAN. FUN."
```

---

## Pricing Reference

| Type | Price |
|------|-------|
| 13×13 Jumpy | $350 |
| 15×15 Jumpy | $375 |
| 20×20 Jumpy | $450 |
| 4-1 Combo | $425 |
| 4-1 Combo with Pool | $550 |
| 5-1 Combo | $475 |
| 18' Single Lane Dry Slide | $425 |
| 18' Single Lane Wet Slide with Pool | $600 |
| 18' Dual Lane Dry Slide | $550 |
| 18' Dual Lane Wet Slide With Pool | $700 |
| 20' Dual Lane Dry Slide | $675 |
| 20' Dual Lane Wet Slide with Pool | $800 |
| 22' Dry Slide | $700 |
| 40' Obstacle Course | $600 |
| 50' Obstacle Course | $700 |
| 65' Obstacle Course | $800 |
| Generator Rental | $100 |
| Attendants | $35/hour |

---

## Image Migration Script

Create a script to:
1. Crawl all image URLs from the WordPress site
2. Download each image
3. Upload to Vercel Blob storage
4. Map old URLs to new blob URLs
5. Update database records

### Current Image Sources
```
Main product images: https://jerseyjumpy.com/wp-content/uploads/...
Gallery images: https://jerseyjumpy.com/wp-content/uploads/...
```

---

## Feature Requirements

### Public Site

#### Homepage
- Hero section with bold "LET'S BOUNCE!" messaging
- Phone number prominently displayed
- Quick action cards: Book Now, Party Packages, FAQs
- Featured inflatables grid (6-8 items)
- About section
- Testimonials carousel
- CTA section
- Footer with contact info and social links

#### Inflatables Page
- Category filter tabs (All, 13x13, Castle, Combo, Slides, Obstacle)
- Grid of inflatable cards
- Each card shows: image, name, category tag, price "from $X"
- Click to view detail page

#### Inflatable Detail Page
- Large hero image
- Name and subtitle
- Description
- Specs table (dimensions, capacity, requirements)
- Price with note
- "Book Now" CTA
- Related inflatables

#### Contact/Book Page
- Multi-step or single-page form
- Dropdown populated from database
- Form validation
- Success/error states
- Sends email notification
- Saves to database

### Admin Panel

#### Dashboard
- Quick stats: Total inquiries, new this week, popular inflatables
- Recent inquiries list
- Quick links to manage sections

#### Inflatables Management
- Table view with search/filter
- Add/Edit form with all fields
- Image upload to Vercel Blob
- Drag-and-drop reordering
- Activate/deactivate toggle

#### Inquiries Management
- Table with all submissions
- Filter by status, date
- Click to view details
- Update status dropdown
- Add internal notes
- CSV export button

#### Other CRUD
- Party Packages: Name, price, items list, image
- Testimonials: Name, location, content, rating, featured toggle
- FAQs: Question, answer, ordering

---

## SEO Requirements

- Dynamic meta tags per page
- Structured data (LocalBusiness, Product)
- XML sitemap
- Robots.txt
- Open Graph / Twitter cards
- Canonical URLs
- Alt text for all images

---

## Performance Requirements

- Lighthouse score 90+ on all metrics
- Image optimization (next/image with blur placeholders)
- Lazy loading for below-fold content
- Minimal JavaScript bundle
- Edge caching on Vercel

---

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation
- ARIA labels
- Color contrast ratios
- Focus indicators
- Screen reader friendly

---

## Development Phases

### Phase 0: Initial Vercel Setup (CRITICAL - DO THIS FIRST)

**Why this matters**: Neon PostgreSQL and Vercel Blob are provisioned through Vercel's dashboard integrations. You cannot get the connection strings until the project is connected to Vercel.

- [ ] Initialize Next.js 15 project locally
- [ ] Initialize git repository
- [ ] Create initial commit with basic Next.js scaffold
- [ ] Push to GitHub repository
- [ ] Connect GitHub repo to Vercel (import project)
- [ ] In Vercel Dashboard → Storage:
  - [ ] Create Neon PostgreSQL database (click "Create Database" → select Neon)
  - [ ] Create Blob storage (click "Create Store" → select Blob)
- [ ] Vercel will auto-populate environment variables in the project
- [ ] Copy the environment variables to local `.env.local`:
  ```
  # From Vercel's Neon integration
  DATABASE_URL=
  
  # From Vercel's Blob integration  
  BLOB_READ_WRITE_TOKEN=
  ```
- [ ] Verify connection works locally with a simple test query
- [ ] NOW proceed with schema creation and seeding

**Commands for Phase 0:**
```bash
# Create the project
npx create-next-app@15 jersey-jumpy --typescript --tailwind --eslint --app --src-dir --use-npm

cd jersey-jumpy

# Initialize git and make first commit
git init
git add .
git commit -m "Initial Next.js 15 scaffold"

# Create GitHub repo and push
gh repo create jersey-jumpy --private --source=. --push
# OR manually create repo on GitHub and:
git remote add origin https://github.com/YOUR_USERNAME/jersey-jumpy.git
git push -u origin main

# Now go to vercel.com:
# 1. Import the GitHub repo
# 2. Go to Storage tab
# 3. Create Neon database
# 4. Create Blob store
# 5. Copy env vars to .env.local

# Test the connection
npm run dev
```

### Phase 1: Foundation (After Vercel Setup)
- [ ] Configure Tailwind v4 + shadcn/ui  
- [ ] Set up Drizzle ORM with Neon connection (using DATABASE_URL from .env.local)
- [ ] Create database schema and run migrations
- [ ] Test Vercel Blob uploads work
- [ ] Set up NextAuth v5 for admin authentication
- [ ] Create basic project structure (folders, layouts)
- [ ] Set up Google Fonts (Baloo 2, DM Sans, Caveat)

### Phase 2: Data Migration
- [ ] Write image migration script
- [ ] Seed database with all 35 inflatables
- [ ] Import testimonials
- [ ] Import FAQs
- [ ] Import party packages
- [ ] Create initial admin user

### Phase 3: Public Pages
- [ ] Build layout (header, footer)
- [ ] Homepage
- [ ] Inflatables listing + filtering
- [ ] Inflatable detail pages
- [ ] Party packages page
- [ ] Rates page
- [ ] FAQs page
- [ ] Policies page
- [ ] Certifications page
- [ ] Gallery page
- [ ] Contact form + email integration

### Phase 4: Admin Panel
- [ ] Admin layout + navigation
- [ ] Auth flow (login/logout)
- [ ] Dashboard
- [ ] Inflatables CRUD
- [ ] Party packages CRUD
- [ ] Testimonials CRUD
- [ ] FAQs CRUD
- [ ] Inquiries view + export
- [ ] Settings page

### Phase 5: Polish
- [ ] Animations and transitions
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile testing

### Phase 6: Launch
- [ ] DNS migration
- [ ] SSL setup
- [ ] Redirect old URLs
- [ ] Monitor for issues

---

## Environment Variables

```env
# Database
DATABASE_URL=

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Email (Elastic Email)
ELASTIC_EMAIL_API_KEY=
ELASTIC_EMAIL_FROM=info@jerseyjumpy.com
CONTACT_EMAIL_TO=info@jerseyjumpy.com

# Optional
NEXT_PUBLIC_SITE_URL=https://jerseyjumpy.com
```

---

## Email Integration Notes

### Elastic Email Setup

Using Elastic Email API for transactional emails. The API key is provided separately.

**Endpoints used:**
- `https://api.elasticemail.com/v4/emails/transactional` - For sending contact form notifications

**Email Templates Needed:**

1. **Contact Form Notification** (to Jersey Jumpy team)
   - Subject: "New Booking Request: {name} - {requested_jumpy}"
   - Contains all form fields
   - Formatted nicely for quick scanning

2. **Contact Form Confirmation** (to customer)
   - Subject: "Thanks for contacting Jersey Jumpy!"
   - Confirms their request was received
   - Includes their submitted details
   - Phone number for urgent inquiries

### Email Helper Example

```typescript
// lib/email.ts
const ELASTIC_EMAIL_API_URL = 'https://api.elasticemail.com/v4/emails/transactional';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const response = await fetch(ELASTIC_EMAIL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-ElasticEmail-ApiKey': process.env.ELASTIC_EMAIL_API_KEY!,
    },
    body: JSON.stringify({
      Recipients: {
        To: [to],
      },
      Content: {
        From: process.env.ELASTIC_EMAIL_FROM,
        ReplyTo: replyTo,
        Subject: subject,
        Body: [
          {
            ContentType: 'HTML',
            Content: html,
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return response.json();
}

// Usage in contact form API route
export async function sendContactNotification(formData: ContactFormData) {
  // Email to Jersey Jumpy team
  await sendEmail({
    to: process.env.CONTACT_EMAIL_TO!,
    subject: `New Booking Request: ${formData.name} - ${formData.requestedJumpy}`,
    replyTo: formData.email,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <hr />
      <p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</p>
      <hr />
      <p><strong>Requested Date:</strong> ${formData.requestedDate}</p>
      <p><strong>Requested Time:</strong> ${formData.requestedTime}</p>
      <p><strong>Requested Jumpy:</strong> ${formData.requestedJumpy}</p>
      <hr />
      <p><strong>How they heard about us:</strong> ${formData.referralSource}</p>
      <p><strong>Event Details:</strong></p>
      <p>${formData.eventDetails || 'None provided'}</p>
    `,
  });

  // Confirmation email to customer
  await sendEmail({
    to: formData.email,
    subject: "Thanks for contacting Jersey Jumpy! 🎈",
    html: `
      <h2>We Got Your Request!</h2>
      <p>Hi ${formData.name},</p>
      <p>Thanks for reaching out to Jersey Jumpy! We've received your booking request and will get back to you within 24 hours.</p>
      <p><strong>Your Request:</strong></p>
      <ul>
        <li>Inflatable: ${formData.requestedJumpy}</li>
        <li>Date: ${formData.requestedDate}</li>
        <li>Time: ${formData.requestedTime}</li>
      </ul>
      <p>Need to reach us sooner? Give us a call at <strong>866-597-6625</strong>!</p>
      <p>- The Jersey Jumpy Team</p>
    `,
  });
}
```

---

## File Structure

```
jerseyjumpy/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Homepage
│   │   ├── inflatables/
│   │   │   ├── page.tsx                # Listing
│   │   │   └── [slug]/page.tsx         # Detail
│   │   ├── party-packages/page.tsx
│   │   ├── rates-deposits/page.tsx
│   │   ├── testimonials/page.tsx
│   │   ├── faqs/page.tsx
│   │   ├── policies/page.tsx
│   │   ├── certifications/page.tsx
│   │   ├── gallery/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/
│   │   ├── layout.tsx                  # Admin layout with auth
│   │   ├── page.tsx                    # Dashboard
│   │   ├── inflatables/
│   │   │   ├── page.tsx                # List
│   │   │   ├── new/page.tsx            # Create
│   │   │   └── [id]/page.tsx           # Edit
│   │   ├── party-packages/...
│   │   ├── testimonials/...
│   │   ├── faqs/...
│   │   ├── inquiries/
│   │   │   ├── page.tsx                # List
│   │   │   └── [id]/page.tsx           # Detail
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── inflatables/route.ts
│   │   ├── contact/route.ts
│   │   ├── upload/route.ts
│   │   └── export/inquiries/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                             # shadcn components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── AdminSidebar.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedInflatables.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTASection.tsx
│   ├── inflatables/
│   │   ├── InflatableCard.tsx
│   │   ├── InflatableGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── SpecsTable.tsx
│   ├── forms/
│   │   └── ContactForm.tsx
│   └── admin/
│       ├── DataTable.tsx
│       ├── InflatableForm.tsx
│       └── StatsCard.tsx
├── lib/
│   ├── db/
│   │   ├── index.ts                    # Drizzle client
│   │   ├── schema.ts                   # Table definitions
│   │   └── migrations/
│   ├── auth.ts                         # NextAuth config
│   ├── blob.ts                         # Vercel Blob helpers
│   ├── email.ts                        # Resend helpers
│   └── utils.ts
├── scripts/
│   ├── migrate-images.ts               # Download and upload images
│   └── seed-database.ts                # Initial data seeding
├── public/
│   └── logo.svg                        # Rainbow logo
├── drizzle.config.ts
├── tailwind.config.ts
├── next.config.js
├── package.json
└── .env.local
```

---

## Notes for Claude Code

1. **Start with the schema** - Get the database structure right first
2. **Use server components** wherever possible for SEO
3. **Keep admin simple** - Don't over-engineer; straightforward forms work great
4. **Match the existing content** - Preserve all the FAQ text, policy text, etc.
5. **Rainbow logo** - Download the SVG from the current site and keep it
6. **Price "from $X"** - Display starting prices, actual quotes vary by location
7. **Form dropdown** - Needs to include ALL inflatables + party packages
8. **Mobile first** - Lots of parents will book from their phones
9. **Fast page loads** - Parents researching party ideas are impatient

---

## Current Testimonials to Import

1. Sarah, Aberdeen NJ - "The castle bouncy house was the hit of the party..."
2. Jennifer, TLC's Four Weddings - "You guys did an amazing job..."
3. Grace, Bedminster NJ - "Thank you so very much..."
4. Alexandra, North Bergen NJ - "Thank you so much for making my daughter's party..."
5. Janine, Flemington NJ - "Thanks again for delivering all the way out..."
6. Artie, Milford NJ - "Pete & Joe - Thank you guys for everything..."
7. Kathleen, Shamong NJ - "Thanks for a great weekend..."
8. Jamie, New Jersey - "Thanks for everything Pete..."

---

## External Resources

- Current site: https://jerseyjumpy.com
- Rental Agreement PDF: https://jerseyjumpy.com/wp-content/uploads/2019/01/jersey-jumpy-agreement.pdf
- NJ DCA: http://www.state.nj.us/dca/
- SIOTO: http://www.sioto.org/

---

*This document should give Claude Code everything needed to build the complete application. Good luck, and let's make some kids happy! 🎈*

---

## Final Design Reminders

### The "Wow Factor" Checklist

Before considering a page complete, verify:

- [ ] **First Impression**: Does the page make you smile within 2 seconds?
- [ ] **Depth & Dimension**: Are there layers? Shadows? Floating elements?
- [ ] **Motion**: Is there delightful animation on load? On hover? On scroll?
- [ ] **Typography**: Is the font pairing distinctive and readable?
- [ ] **Color Harmony**: Do the pastels feel cohesive and intentional?
- [ ] **Whitespace**: Is there breathing room? Nothing cramped?
- [ ] **Personality**: Does it feel like Jersey Jumpy, not a template?
- [ ] **Mobile Magic**: Is mobile just as delightful as desktop?
- [ ] **Performance**: Do animations feel smooth at 60fps?
- [ ] **Accessibility**: Can everyone use and enjoy this?

### Design Inspiration Links

Study these for ideas (don't copy, but absorb the quality):

1. **Headspace** (headspace.com) - Calm, rounded, friendly illustrations
2. **Mailchimp** (mailchimp.com) - Playful brand with sophisticated execution
3. **Linear** (linear.app) - Beautiful gradients, glass effects, polish
4. **Vercel** (vercel.com) - Clean, modern, excellent motion
5. **Stripe** (stripe.com) - Masterful use of color and depth
6. **Lemonade** (lemonade.com) - Insurance made friendly and fun
7. **Pitch** (pitch.com) - Delightful micro-interactions

### The Jersey Jumpy Brand Feeling

When a parent visits this site, they should feel:

1. **Trust** - "These people are professional and care about safety"
2. **Joy** - "This is going to be SO much fun for my kids"
3. **Ease** - "Booking is simple and straightforward"
4. **Value** - "Quality equipment at fair prices"
5. **Local Pride** - "New Jersey's best, family-owned since 2007"

### Success Metrics

The website is successful when:

1. Parents stay on the site longer (lower bounce rate)
2. Contact form submissions increase
3. Joe gets compliments on the new site
4. It stands out from every other bounce house site in NJ
5. It works flawlessly on mom's iPhone at the soccer field

---

## Quick Reference: The Stack

```
Framework:     Next.js 15 (App Router, React 19)
Styling:       Tailwind CSS v4
Components:    shadcn/ui (customized)
Animation:     Framer Motion
Database:      Neon PostgreSQL
ORM:           Drizzle
Storage:       Vercel Blob
Email:         Elastic Email
Auth:          NextAuth.js v5
Hosting:       Vercel
```

---

*Built with love for Jersey Jumpy. Let's make it bounce! 🎪*