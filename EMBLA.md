````markdown
# Embla Carousel React Setup Notes

Embla Carousel provides a React wrapper that makes it easy to integrate a carousel into a React project. It also handles cleanup automatically when the component unmounts.

## 1. Install Embla Carousel

Install the React package and add it to your project dependencies:

```bash
pnpm add embla-carousel-react
````

---

## 2. Basic Component Structure

A recommended Embla setup includes:

* An outer wrapper
* A viewport element
* A scroll container
* Slide elements
* Navigation buttons placed outside the viewport to avoid drag conflicts

The `embla__viewport` element acts as both the root element for Embla and the overflow wrapper.

```jsx
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>

      <button className="embla__prev">Scroll to prev</button>
      <button className="embla__next">Scroll to next</button>
    </div>
  )
}
```

---

## 3. Basic Styling

The viewport hides overflow, while the container is the scrollable flex area that holds the slides.

```css
.embla__viewport {
  overflow: hidden;
}

.embla__container {
  display: flex;
  touch-action: pan-y pinch-zoom;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}
```

### Key CSS Notes

* `.embla__viewport`

  * Hides overflowing slides.
  * Receives the `emblaRef`.

* `.embla__container`

  * Holds all slides.
  * Uses `display: flex`.
  * Allows touch gestures with `touch-action`.

* `.embla__slide`

  * Each slide takes up 100% of the viewport width.
  * `min-width: 0` prevents flexbox sizing issues.

---

## 4. Accessing the Embla API

The `useEmblaCarousel` hook returns:

```jsx
const [emblaRef, emblaApi] = useEmblaCarousel(options)
```

You can use `emblaApi` to control the carousel programmatically.

Example with previous and next buttons:

```jsx
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>

      <button className="embla__prev" onClick={scrollPrev}>
        Scroll to prev
      </button>

      <button className="embla__next" onClick={scrollNext}>
        Scroll to next
      </button>
    </div>
  )
}
```

---

## 5. Adding Plugins

Embla supports plugins for extending carousel behavior.

Example: install the Autoplay plugin.

```bash
pnpm add embla-carousel-autoplay
```

Plugins are passed as the second argument to `useEmblaCarousel`.

```jsx
useEmblaCarousel(options, plugins)
```

Example using Autoplay:

```jsx
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false },
    [Autoplay()]
  )

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.plugins().autoplay?.play()
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">Slide 1</div>
          <div className="embla__slide">Slide 2</div>
          <div className="embla__slide">Slide 3</div>
        </div>
      </div>

      <button className="embla__prev" onClick={scrollPrev}>
        Scroll to prev
      </button>

      <button className="embla__next" onClick={scrollNext}>
        Scroll to next
      </button>
    </div>
  )
}
```

---

## 6. Summary for Codex

Use Embla Carousel in React by installing `embla-carousel-react`, calling the `useEmblaCarousel` hook, and attaching the returned `emblaRef` to the viewport element.

The recommended structure is:

```txt
.embla
  .embla__viewport ref={emblaRef}
    .embla__container
      .embla__slide
      .embla__slide
      .embla__slide
  button.embla__prev
  button.embla__next
```

Navigation buttons should be placed outside the viewport to prevent drag conflicts.

Basic required CSS:

```css
.embla__viewport {
  overflow: hidden;
}

.embla__container {
  display: flex;
  touch-action: pan-y pinch-zoom;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}
```

Use `emblaApi` for controls like:

```jsx
emblaApi?.scrollPrev()
emblaApi?.scrollNext()
```

Plugins, such as Autoplay, can be installed separately and passed as the second argument to `useEmblaCarousel`.

```
```
