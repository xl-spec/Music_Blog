import os
import requests
from bs4 import BeautifulSoup
from colorthief import ColorThief
from PIL import Image

class MusicParser():
    def __init__(self):
        self.id = None
        self.color_wheel = []
    
    def setId(self, song_url):
        self.id = song_url.split("v=")[-1]

    def getArt(self):
        html_url = f"https://www.youtube.com/watch?v={self.id}"
        response = requests.get(html_url)
        soup = BeautifulSoup(response.content, "html.parser")

        img_url = soup.find("meta", property="og:image")["content"]
        response = requests.get(img_url)

        with open(f"Images/{self.id}.jpg", "wb") as f:
            f.write(response.content)
        self.makeSquare(f"Images/{self.id}.jpg")
    
    def getColorWheel(self):
        color_thief = ColorThief(f"Images/{self.id}.jpg")
        palette = color_thief.get_palette(color_count=6, quality=1)
        self.color_wheel = palette
        # print(palette)
    
    def printColorWheel(self):
        for count, color in enumerate(self.color_wheel):
            print(f'\033[38;2;{color[0]};{color[1]};{color[2]}mColor{count + 1}\033[0m', end=" ")
    
    def makeSquare(self, img_path):
        with Image.open(img_path) as img:
            print(f"Original dimensions: {img.size}")
            # Find the size of the smallest dimension to create the largest possible square
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
link = input("enter link:\n")
# parser.setId("https://www.youtube.com/watch?v=mAxEIsWJ2xA")
parser.setId(link)
parser.getArt()
parser.getColorWheel()
parser.printColorWheel()