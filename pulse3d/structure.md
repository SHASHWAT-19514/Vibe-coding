# PULSE3D Project Structure

PULSE3D is a highly interactive, futuristic fitness landing page built with Next.js, React Three Fiber, and Framer Motion. 

Below is the core file structure and a description of what each file does:

## Core Application (`src/app/`)
These files handle the root routing, global layout, and base styles of the application.

* **`src/app/layout.tsx`**
  * The root Next.js layout. It wraps the entire application, configures global fonts (Inter & Space Grotesk), and includes the top navigation bar (`<Navbar />`).
* **`src/app/page.tsx`**
  * The main landing page. It acts as the container that holds the background 3D environment (`<Scene />`) and the foreground scrolling HTML overlay (`<ScrollSections />`).
* **`src/app/globals.css`**
  * Contains the global CSS and Tailwind v4 theme configuration. This defines the custom futuristic color palette (Background, Primary Accent, Human Accent) and special utility classes like the frosted glass noise effect (`.bg-noise`).
* **`src/app/favicon.ico`**
  * The website's icon displayed in the browser tab.

## 3D Environment & Utilities (`src/components/`, `src/lib/`)
These files power the interactive visuals and storytelling of the application.

* **`src/components/Scene.tsx`**
  * The root React Three Fiber `<Canvas>`. This file sets up the WebGL environment, the camera, and the cinematic lighting before rendering the 3D models. It is positioned fixed in the background.
* **`src/components/HologramAthlete.tsx`**
  * The core 3D interactive element. This file renders an abstract, floating geometric hologram that changes shape and color based on the user's scroll position. It features organic breathing animations and tracks the user's cursor.
* **`src/components/ScrollSections.tsx`**
  * The foreground HTML storytelling layer powered by Framer Motion. This file contains the different "sections" (Hero, Muscle, Cardio, AI Coach) that the user scrolls through, and uses motion values to fade text in and out dynamically.
* **`src/components/Navbar.tsx`**
  * The sleek, fixed navigation bar at the top of the screen containing the platform logo and "Join Waitlist" button.
* **`src/lib/utils.ts`**
  * A utility file (typically used for Tailwind class merging via `clsx` and `tailwind-merge`) to conditionally join CSS classes together cleanly.
