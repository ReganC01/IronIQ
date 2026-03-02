import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

**`src/App.jsx`** — this is your `gym-coach.jsx` file. Make sure it's named exactly `App.jsx` and is inside the `src` folder.

---

**Your folder structure should look like this:**
```
ironiq/
├── src/
│   ├── main.jsx        ← must exist
│   └── App.jsx         ← your gym-coach.jsx renamed
├── index.html
├── vite.config.js
├── package.json
└── node_modules/