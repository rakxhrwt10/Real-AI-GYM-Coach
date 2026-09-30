# Apna AI Gym Coach

The landing page, signup API, and Streamlit workout coach run as one local project. The landing page's coach links open the Streamlit app.

## Run locally

1. From the repository root, install the Python dependencies into your active virtual environment:

   ```powershell
   python -m pip install -r requirements.txt
   ```

2. From `landing-page/`, install the website and API dependencies:

   ```powershell
   npm install
   npm install --prefix client
   npm install --prefix server
   ```

3. With the Python virtual environment activated, start all three services from `landing-page/`:

   ```powershell
   npm run dev
   ```

Open `http://localhost:5173`. The Streamlit workout coach runs on `http://localhost:8501`, and the Express signup API runs on `http://localhost:4000`.

For early-access signup storage, copy `server/.env.example` to `server/.env` and set `MONGODB_URI`. The landing page and coach work without MongoDB, but signup storage remains unavailable until it connects.

## Deploy on Netlify

1. Push the project to a Git provider and import it in Netlify. The repository-root `netlify.toml` sets the Vite base directory, build command, publish directory, and SPA fallback.
2. Deploy the API separately using `render.yaml`. Set `MONGODB_URI` on Render for signup storage.
3. Deploy the Streamlit app separately to a host that supports Streamlit. Netlify serves the static landing page; it does not run the Python coach process.
4. In Netlify site environment variables, set `VITE_API_BASE_URL` to the deployed API origin and `VITE_COACH_APP_URL` to the public Streamlit URL. Redeploy the site after setting them.
5. Set the API's `CLIENT_ORIGIN` on Render to the exact Netlify site origin, then redeploy the API.

The Netlify deployment is free within Netlify's current free-tier limits. The API, MongoDB, and Streamlit hosting have their own plans and limits. Until `VITE_COACH_APP_URL` is configured, coach links default to `http://localhost:8501` and will not work for visitors.
