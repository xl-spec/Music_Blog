import os
import requests
import json
from bs4 import BeautifulSoup
from colorthief import ColorThief
from PIL import Image
import re
import tkinter as tk
from tkinter import messagebox, scrolledtext

class MusicParser():
    def __init__(self):
        self.id = None
        self.palette = []
        self.data = {
            'title': None,
            'artist': [],
            'release_date': None
        }
        self.fileName = None
        self.type = None # either single, album, or mashup/edits
        self.title = ""

    def setId(self, song_url):
        self.id = song_url.split("v=")[-1]
        print(f"Video ID set to: {self.id}")
    
    def getData(self):
        html_url = f"https://www.youtube.com/watch?v={self.id}"
        headers = {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"}
        response = requests.get(html_url, headers=headers)
        soup = BeautifulSoup(response.content, "html.parser")

        # thank you https://stackoverflow.com/questions/72354649/how-to-scrape-youtube-video-description-with-beautiful-soup
        pattern = re.compile('(?<=shortDescription":").*(?=","isCrawlable)')
        description = pattern.findall(str(soup))[0].replace('\\n','\n')
        
        self.processDescription(description)

        # gets the date from description which youtube provides
        # if it's not found then it's gonna use the release date of the vid instead

        if not self.data['release_date']:
            upload_date = soup.find("meta", itemprop="uploadDate")
            if upload_date:
                self.data['release_date'] = upload_date["content"].split("T")[0]
                
        print(self.data)
        return self.data

    def processDescription(self, description_content): # function to get the song name & artists
        lines = description_content.split('\n')
        infoFound = False

        for line in lines:
            if '·' in line:
                parts = line.split('·')
                if parts:
                    infoFound = True   
                    self.data['title'] = parts[0].strip()
                    self.data['artist'] = [part.strip() for part in parts[1:]]
                    break
        
        if not infoFound: # If songs don't have a autoyoutube generated description, i will edit manually
            self.data['title'] = ''
            self.data['artist'] = ''

        date_match = re.search(r'Released on: (\d{4}-\d{2}-\d{2})', description_content)
        if date_match:
            self.data['release_date'] = date_match.group(1)
            
    def getArt(self): # puts picture into folder
        html_url = f"https://www.youtube.com/watch?v={self.id}"
        response = requests.get(html_url)
        soup = BeautifulSoup(response.content, "html.parser")

        img_url = soup.find("meta", property="og:image")["content"]
        response = requests.get(img_url)

        script_dir = os.path.dirname(os.path.abspath(__file__))
        album_art_dir = os.path.join(script_dir, "../src/data/album_arts")

        if not os.path.exists(album_art_dir):
            os.makedirs(album_art_dir)

        with open(os.path.join(album_art_dir, f"{self.fileName}.jpg"), "wb") as f:
            f.write(response.content)
        self.makeSquare(os.path.join(album_art_dir, f"{self.fileName}.jpg"))
        print(f"Picture made")
    
    def getColorWheel(self): # color wheel, will expand this later and pass this through the css
        color_thief = ColorThief(f"../src/data/album_arts/{self.fileName}.jpg")
        palette = color_thief.get_palette(color_count=3, quality=1)
        self.palette = palette
    
    def printColorWheel(self): # idk i might delete
        print(self.palette)
        for count, color in enumerate(self.palette):
            print(f'\033[38;2;{color[0]};{color[1]};{color[2]}mColor{count + 1}\033[0m', end=" ")
    
    def makeSquare(self, img_path): # crops the image to be a perfect square
        with Image.open(img_path) as img:
            min_dim = min(img.size)
            left = (img.width - min_dim) // 2
            top = (img.height - min_dim) // 2
            right = (img.width + min_dim) // 2
            bottom = (img.height + min_dim) // 2
            img_cropped = img.crop((left, top, right, bottom))
            img_cropped.save(img_path)
            print(f"Cropped to square dimensions: {img_cropped.size}")
    
    def setFileName(self): # sets the filename for jpg + md
        # the -- is to represent multiple artists
        artist = "--".join(artist.replace(" ", "-") for artist in self.data['artist'])
        title = self.data['title'].replace(" ", "-")
        self.fileName = f"{artist}_{title}".lower()
        print(f"File Set: {self.fileName}")

    def createMd(self): # makes the md file
        post_dir = os.path.join(os.path.dirname(__file__), "../src/data/posts")
        post_file_path = os.path.join(post_dir, f"{self.fileName}.md")
        with open(post_file_path, "w") as f:
            f.write("")

        print(f"Post created: {post_file_path}")

    def genPost(self): # generates a new json file to later be added to posts.json
        post_dir = os.path.join(os.path.dirname(__file__), "../src/data")
        # post_file_path = os.path.join(post_dir, f"{self.fileName}.md")
        new_post = {
            "id": self.fileName,
            "artist": self.data['artist'],
            "name": self.data['title'],
            "myDate": 'todayyyy',
            "releaseDate": self.data['release_date'],
            "type": self.type,
            "palette": self.palette,
            "genre": ["To be added"],
            "title": self.title,
            "markdownPath": f"https://raw.githubusercontent.com/xl-spec/Music_Blog/main/src/data/posts/{self.fileName}.md",
            "imageUrl": f"https://raw.githubusercontent.com/xl-spec/Music_Blog/main/src/data/album_arts/{self.fileName}.jpg"
        }

        # for i in new_post:
        #     print(new_post[i])

        new_post_path = os.path.join(post_dir, "newPost.json")
        with open(new_post_path, 'w') as file:
            json.dump(new_post, file, indent=2)
        print("New post data saved:", new_post_path)

    def addPost(self): # function to add newPost.json into posts.json
        post_dir = os.path.join(os.path.dirname(__file__), "../src/data")
        new_post_path = os.path.join(post_dir, "newPost.json")
        posts_json_path = os.path.join(post_dir, "posts.json")

        with open(new_post_path, 'r') as file:
            new_post = json.load(file)

        with open(posts_json_path, 'r+') as file:
            posts = json.load(file)
            posts['posts'].append(new_post)
            file.seek(0)
            json.dump(posts, file, indent=2)
            file.truncate()
        print("New post added to posts.json")


class GUI(tk.Tk):
    def __init__(self, parser):
        super().__init__()
        self.parser = parser
        self.title("Music Parser GUI")
        self.geometry("600x900")

        self.create_widgets()

    def create_widgets(self):
        self.link_label = tk.Label(self, text="YouTube Link:")
        self.link_label.pack()

        self.link_entry = tk.Entry(self, width=50)
        self.link_entry.pack()

        self.get_data_button = tk.Button(self, text="Get and Generate Data", command=self.get_data)
        self.get_data_button.pack()

        self.json_text = scrolledtext.ScrolledText(self, wrap=tk.WORD, width=70, height=25)
        self.json_text.pack()

        self.confirm_button = tk.Button(self, text="Confirm Data", command=self.confirm_data)
        self.confirm_button.pack()

    def get_data(self):
        self.json_text.delete(1.0, tk.END)
        self.json_text.insert(tk.END, "Loading data...\n")
        self.update_idletasks()  # Update the UI to show the loading message

        link = self.link_entry.get()
        self.parser.setId(link)
        self.parser.getData()
        self.parser.setFileName()
        self.parser.getArt()
        self.parser.getColorWheel()
        self.parser.title = "Zoomer Brain"
        self.parser.createMd()
        self.parser.genPost()
        json_data = {
            "id": self.parser.fileName,
            "artist": self.parser.data['artist'],
            "name": self.parser.data['title'],
            "myDate": 'todayyyy',
            "releaseDate": self.parser.data['release_date'],
            "type": self.parser.type,
            "palette": self.parser.palette,
            "genre": ["To be added"],
            "title": self.parser.title,
            "markdownPath": f"https://raw.githubusercontent.com/xl-spec/Music_Blog/main/src/data/posts/{self.fileName}.md",
            "imageUrl": f"https://raw.githubusercontent.com/xl-spec/Music_Blog/main/src/data/album_arts/{self.fileName}.jpg"
        }
        self.json_text.delete(1.0, tk.END)
        self.json_text.insert(tk.END, json.dumps(json_data, indent=2))

    def confirm_data(self):
        try:
            edited_json = self.json_text.get(1.0, tk.END).strip()
            new_post = json.loads(edited_json)
            with open("../src/data/newPost.json", 'w') as file:
                json.dump(new_post, file, indent=2)
            self.parser.addPost()
            messagebox.showinfo("Confirm Data", "New post added to posts.json")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred while confirming the data: {e}")

if __name__ == "__main__":
    from main import MusicParser  # Replace with the correct import for your module
    parser = MusicParser()
    app = GUI(parser)
    app.mainloop()
