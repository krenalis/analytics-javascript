
# Krenalis JavaScript SDK

The official JavaScript SDK for sending events to the Krenalis Customer Data Platform (CDP).

## 🚀 Quick Start

### 📦 Install via npm

```bash
npm install @krenalis/javascript-sdk
````

Then import it in your application:

```js
import { Krenalis } from '@krenalis/javascript-sdk';

const krenalis = new Krenalis('your-event-write-key', 'https://example.com/v1/events');
krenalis.page('Home');
```

### 🌐 Use via CDN

#### ✅ Compatible with all browsers (ES5, IIFE):

```html
<script src="https://cdn.krenalis.com/krenalis.min.js"></script>
<script>
    const krenalis = new Krenalis('your-event-write-key', 'https://example.com/v1/events');
    krenalis.page('Home');
</script>
```

#### ✅ Modern browsers (ES6 module):

```html
<script type="module">
    import { Krenalis } from 'https://cdn.krenalis.com/krenalis.es6.min.js';

    const krenalis = new Krenalis('your-event-write-key', 'https://example.com/v1/events');
    krenalis.page('Home');
</script>
```

> 💡 Replace `"your-event-write-key"` and the endpoint URL with the values provided by Krenalis.

## 📚 Documentation

For full usage, advanced configuration, and API reference, visit the
👉 [Krenalis JavaScript SDK Documentation](https://www.krenalis.com/docs/integrations/javascript-sdk)

## 📄 License

[MIT License](LICENSE)
© 2026 [Open2b](https://www.krenalis.com/)
