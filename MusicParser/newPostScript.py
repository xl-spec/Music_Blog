import json

def add_post(new_post, filepath='../src/data/posts.json'):
    with open(filepath, 'r+') as file:
        posts = json.load(file)
        posts['posts'].append(new_post)
        file.seek(0)
        json.dump(posts, file, indent=2)
        file.truncate()

new_post = {
    "id": 6,
    "artist": "Sodddbs",
    "name": "LOML",
    "myDate": "2024-04-18",
    "releaseDate": "2024-04-18",
    "genre": ["rock"],
    "markdownPath": f"https://raw.githubusercontent.com/xl-spec/Music_Blog/main/src/data/posts/tempblog.md",
    "imageUrl": f"https://raw.githubusercontent.com/xl-spec/Music_Blog/main/MusicParser/Images/WjQKF1eD2Zs&si=m_1PaOlmVZWqbaa_.jpg"
}

add_post(new_post)
