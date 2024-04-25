# import os
import requests
from bs4 import BeautifulSoup
from colorthief import ColorThief
from PIL import Image
import re
from datetime import datetime
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
        
        description = soup.find("meta", property="og:description")
        date_pattern = re.compile(r'Released on: (\d{4}-\d{2}-\d{2})')
        if description:
            dates = date_pattern.findall(description["content"])
            if dates:
                # Use the first found date as string
                self.data['release_date'] = dates[0]

        if not self.data['release_date']:
            upload_date = soup.find("meta", itemprop="uploadDate")
            if upload_date:
                self.data['release_date'] = upload_date["content"]

        print(self.data)
        return self.data

    def getArt(self):
        html_url = f"https://www.youtube.com/watch?v={self.id}"
        response = requests.get(html_url)
        soup = BeautifulSoup(response.content, "html.parser")

        img_url = soup.find("meta", property="og:image")["content"]
        response = requests.get(img_url)

        with open(f"Album_Art/{self.id}.jpg", "wb") as f:
            f.write(response.content)
        self.makeSquare(f"Album_Art/{self.id}.jpg")
    
    def getColorWheel(self):
        color_thief = ColorThief(f"Album_Art/{self.id}.jpg")
        palette = color_thief.get_palette(color_count=6, quality=1)
        self.color_wheel = palette
        # print(palette)
    
    def printColorWheel(self):
        print(self.color_wheel)
        for count, color in enumerate(self.color_wheel):
            # print(count)
            print(f'\033[38;2;{color[0]};{color[1]};{color[2]}mColor{count + 1}\033[0m', end=" ")
    
    def makeSquare(self, img_path):
        with Image.open(img_path) as img:
            print(f"Original dimensions: {img.size}")
            min_dim = min(img.size)
            left = (img.width - min_dim) // 2
            top = (img.height - min_dim) // 2
            right = (img.width + min_dim) // 2
            bottom = (img.height + min_dim) // 2
            # Crop the image to the calculated square
            img_cropped = img.crop((left, top, right, bottom))
            img_cropped.save(img_path)
            print(f"Cropped to square dimensions: {img_cropped.size}")

parser = MusicParser()
# link = input("enter link:\n")
parser.setId("https://music.youtube.com/watch?v=RPHCC86abXo&si=PmB-Y4HMqE8llOmx")
parser.getData()
# parser.setId(link)
# parser.getArt()
# parser.getColorWheel()
# parser.printColorWheel()
