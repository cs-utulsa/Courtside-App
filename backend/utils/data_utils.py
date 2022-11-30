from datetime import datetime

def schedule_key(e):
    time_string = e["game_time"]
    split = time_string.split(":")
    hour = int(split[0])
    minute = split[1]

    if ('p' in minute):
        minute = minute.replace('p', '')
        hour += 12
    elif ('a' in minute):
        minute = minute.replace('a', '')

    day = datetime.now().replace(hour=hour, minute=int(minute))

    return day