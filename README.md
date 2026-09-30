# Apna AI Gym Coach

Real-time exercise form tracking and voice coaching with a Streamlit app, plus a React landing page and Express signup API.

## Run locally

Install Python dependencies in an activated virtual environment from the repository root:

```powershell
python -m pip install -r requirements.txt
streamlit run static/main.py
```

To run the landing page and API too, install the npm dependencies from `landing-page/` and run `npm run dev`. See [landing-page/README.md](landing-page/README.md) for details.

## Deploy the Streamlit coach

Deploy this repository with [Streamlit Community Cloud](https://share.streamlit.io/). Create an app from the repository's default branch and set the app file to `static/main.py`; Streamlit installs the root `requirements.txt` automatically.

If voice coaching should use Groq, add `GROQ_API_KEY` in the app's Streamlit secrets. Never commit API keys or `.streamlit/secrets.toml`.

The workout history uses a local SQLite database. The database is excluded from Git; on hosted instances, local files may be reset when the app restarts. Use a hosted database if workout history must persist reliably.

## Deploy the landing page

Netlify builds the static Vite client using the repository-root `netlify.toml`. The Streamlit coach and Express API must be hosted separately. Set `VITE_COACH_APP_URL` and `VITE_API_BASE_URL` in Netlify to their public URLs, and set the API's `CLIENT_ORIGIN` to the Netlify site origin.