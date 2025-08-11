import scrapy

class ExampleSpider(scrapy.Spider):
    name = "example"
    start_urls = ['https://example.com']

    def parse(self, response):
        self.log(f"Visited: {response.url}")

