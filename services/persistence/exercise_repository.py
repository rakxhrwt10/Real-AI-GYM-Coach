import sqlite3
from pathlib import Path


# Project root:
# Real-Time-Ai-Gym-Coach/data.db
_DB_PATH = Path(__file__).resolve().parents[2] / "data.db"


def _get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(str(_DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = _get_connection()

    try:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                exercise_name TEXT NOT NULL,
                reps INTEGER NOT NULL DEFAULT 0,
                sets INTEGER NOT NULL DEFAULT 0,
                time INTEGER NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
            """
        )

        conn.commit()

    finally:
        conn.close()


def get_user(username: str):
    # Make absolutely sure tables exist
    init_db()

    conn = _get_connection()

    try:
        return conn.execute(
            "SELECT * FROM users WHERE username = ?",
            (username,)
        ).fetchone()

    finally:
        conn.close()


def create_user(username: str):
    init_db()

    conn = _get_connection()

    try:
        conn.execute(
            "INSERT INTO users (username) VALUES (?)",
            (username,)
        )

        conn.commit()

        return conn.execute(
            "SELECT * FROM users WHERE username = ?",
            (username,)
        ).fetchone()

    finally:
        conn.close()


def get_or_create_user(username: str):
    user = get_user(username)

    if user is None:
        user = create_user(username)

    return user


def add_exercise(user_id, exercise_name, reps, sets, time):
    init_db()

    conn = _get_connection()

    try:
        existing = conn.execute(
            """
            SELECT *
            FROM exercises
            WHERE user_id = ?
              AND exercise_name = ?
              AND DATE(created_at) = DATE('now')
            """,
            (user_id, exercise_name)
        ).fetchone()

        if existing:
            conn.execute(
                """
                UPDATE exercises
                SET reps = reps + ?,
                    sets = sets + ?,
                    time = time + ?
                WHERE id = ?
                """,
                (reps, sets, time, existing["id"])
            )

        else:
            conn.execute(
                """
                INSERT INTO exercises
                (user_id, exercise_name, sets, reps, time)
                VALUES (?, ?, ?, ?, ?)
                """,
                (user_id, exercise_name, sets, reps, time)
            )

        conn.commit()

    finally:
        conn.close()


def get_users_exercises(user_id):
    init_db()

    conn = _get_connection()

    try:
        return conn.execute(
            """
            SELECT *
            FROM exercises
            WHERE user_id = ?
            ORDER BY created_at DESC
            """,
            (user_id,)
        ).fetchall()

    finally:
        conn.close()


# Create tables when this module loads
init_db()