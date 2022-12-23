# Solve the problem from the second set here

# Problem #2
# Determine a calendar date (as year, month, day) starting from two integer numbers representing the year and the day
# number inside that year (e.g. day number 32 is February 1st). Take into account leap years. Do not use Python's
# inbuilt date/time functions.

def calendar_date(year, day):
    """
    This function determines the date of the given day in the given year

    This function takes two parameters [year], [day] and returns the date correspondent to the day given
    :param year: natural number
    :param day: natural number <= 366
    :return: date of the given day
    """

    days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
              "November", "December"]
    month = 0
    if year % 4 == 0:
        days[1] = 29
        while day > 31:
            day -= days[month]
            month += 1
    else:
        while day > 31:
            day -= days[month]
            month += 1

    # returns the date as year/month/day
    # date = str(year) + " " + str(months[month]) + " " + str(day)

    # returns the date as a structure
    return year, months[month], day


if __name__ == '__main__':
    year = input("Please type the year and then press Enter: ")
    day = input("Please type the day and then press Enter: ")
    print(calendar_date(int(year), int(day)))
