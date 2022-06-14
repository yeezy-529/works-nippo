# from datetime import datetime, date
from apscheduler.schedulers.background import BackgroundScheduler
from .views import matter_code_input

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(matter_code_input, 'cron', hour=23, minute=59)
    scheduler.start()