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

def schedule_key_nhl(e):
    time_string = e["game_time"]
    split = time_string.split(":")
    hour = int(split[0])
    minute = split[1]

    # Check for 'PM' or 'AM' in the minute variable
    if 'PM' in minute:
        minute = minute.replace('PM', '')
        # Handle the special case where the hour is 12 (noon)
        if hour != 12:
            hour += 12
    elif 'AM' in minute:
        minute = minute.replace('AM', '')
        # Handle the special case where the hour is 12 (midnight)
        if hour == 12:
            hour = 0

    day = datetime.now().replace(hour=hour, minute=int(minute))

    return day