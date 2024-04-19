import json

def add_post(new_post, filepath='src/data/posts.json'):
    with open(filepath, 'r+') as file:
        posts = json.load(file)
        posts['posts'].append(new_post)
        file.seek(0)
        json.dump(posts, file, indent=2)
        file.truncate()

new_post = {
    "id": 3,
    "artist": "Sobs",
    "name": "LOML",
    "myDate": "2024-04-18",
    "releaseDate": "2024-04-18",
    "genre": ["rock"],
    # "description": "Learn about advanced concepts in React.",
    "markdownPath": "posts/post3.md"
}

add_post(new_post)
