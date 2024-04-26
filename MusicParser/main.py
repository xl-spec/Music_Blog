import os
import requests
from bs4 import BeautifulSoup
from colorthief import ColorThief
from PIL import Image
import re
class MusicParser():
    def __init__(self):
        self.id = None
        self.color_wheel = []
        self.palette = []
        self.data = {
            'title': None,
            'artist': None,
            'release_date': None
        }
        self.fileName = None
        self.type = None # either single, album, or mashup/edits

    def setId(self, song_url):
        self.id = song_url.split("v=")[-1]
    
    def getData(self):
        html_url = f"https://www.youtube.com/watch?v={self.id}"
        response = requests.get(html_url)
        soup = BeautifulSoup(response.content, "html.parser")
        # print(soup.get_text)
        title = soup.find("meta", property="og:title")
        if title:
            self.data['title'] = title["content"]

        artist = soup.find("meta", property="og:video:tag")
        if artist:
            self.data['artist'] = artist["content"]
        
        # gets the date from description which youtube provides
        # if it's not found then it's gonna use the release date of the vid instead

        description = soup.find("meta", property="og:description")
        date_pattern = re.compile(r'Released on: (\d{4}-\d{2}-\d{2})')
        if description:
            dates = date_pattern.findall(description["content"])
            if dates:
                self.data['release_date'] = dates[0]

        if not self.data['release_date']:
            upload_date = soup.find("meta", itemprop="uploadDate")
            if upload_date:
                self.data['release_date'] = upload_date["content"].split("T")[0]
                
        print(self.data)
        return self.data

    def getArt(self):
        html_url = f"https://www.youtube.com/watch?v={self.id}"
        response = requests.get(html_url)
        soup = BeautifulSoup(response.content, "html.parser")

        img_url = soup.find("meta", property="og:image")["content"]
        response = requests.get(img_url)

        script_dir = os.path.dirname(os.path.abspath(__file__))
        album_art_dir = os.path.join(script_dir, "../src/data/album_art")

        with open(os.path.join(album_art_dir, f"{self.fileName}.jpg"), "wb") as f:
            f.write(response.content)
        self.makeSquare(os.path.join(album_art_dir, f"{self.fileName}.jpg"))
    
    def getColorWheel(self):
        color_thief = ColorThief(f"../src/data/album_art/{self.fileName.id}.jpg")
        palette = color_thief.get_palette(color_count=3, quality=1)
        self.color_wheel = palette
    
    def printColorWheel(self):
        print(self.color_wheel)
        for count, color in enumerate(self.color_wheel):
            print(f'\033[38;2;{color[0]};{color[1]};{color[2]}mColor{count + 1}\033[0m', end=" ")
    
    def makeSquare(self, img_path):
        with Image.open(img_path) as img:
            print(f"Original dimensions: {img.size}")
            min_dim = min(img.size)
            left = (img.width - min_dim) // 2
            top = (img.height - min_dim) // 2
            right = (img.width + min_dim) // 2
            bottom = (img.height + min_dim) // 2
            # crop it so it's a square in the middle
            img_cropped = img.crop((left, top, right, bottom))
            img_cropped.save(img_path)
            print(f"Cropped to square dimensions: {img_cropped.size}")
    
    def setFileName(self):
        artist = self.data['artist'].replace(" ", "-")
        title = self.data['title'].replace(" ", "-")
        self.fileName = f"{artist}_{title}"

    def createPost(self): # makes the md file
        post_dir = os.path.join(os.path.dirname(__file__), "../src/data/posts")
        post_file_path = os.path.join(post_dir, f"{self.fileName}.md")
        with open(post_file_path, "w") as f:
            f.write("")

        print(f"Post created: {post_file_path}")



parser = MusicParser()
link = input("enter link:\n")
parser.setId(link)
# parser.setId("https://music.youtube.com/watch?v=-BLNfBB6D2Y&si=NSP4CaQoZYD4tQVo")
parser.getData()
parser.setFileName()
parser.getArt()
parser.createPost()
# parser.getColorWheel()
# parser.printColorWheel()
