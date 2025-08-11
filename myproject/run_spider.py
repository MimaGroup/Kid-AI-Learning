# run_spider.py

from twisted.internet import asyncioreactor
asyncioreactor.install()  # You can switch to selectreactor if needed

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from myproject.spiders.example import ExampleSpider

process = CrawlerProcess(get_project_settings())
process.crawl(ExampleSpider)
process.start()

