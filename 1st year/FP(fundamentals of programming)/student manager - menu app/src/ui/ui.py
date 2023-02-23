class UserInterface:
    def __init__(self, service):
        self._service = service

    # Student management

    def add_student(self):
        try:
            student_id = int(input("Student id: "))
            name = input("Student name: ")
            self._service.add_student(student_id, name)
        except ValueError as ve:
            print(ve)

    def delete_student(self):
        student_id = int(input("Student id: "))
        self._service.delete_student(student_id)

    def update_student(self):
        student_id = int(input("Student id: "))
        name = input("Student name: ")
        self._service.update_student(student_id, name)

    def list_students(self):
        students = self._service.get_all_students()
        for student in students:
            print(student)

    # Discipline management

    def add_discipline(self):
        discipline_id = int(input("Discipline id: "))
        name = input("Discipline name: ")
        self._service.add_discipline(discipline_id, name)

    def delete_discipline(self):
        discipline_id = int(input("Discipline id: "))
        self._service.delete_discipline(discipline_id)

    def update_discipline(self):
        discipline_id = int(input("Discipline id: "))
        name = input("Discipline name: ")
        self._service.update_discipline(discipline_id, name)

    def list_disciplines(self):
        disciplines = self._service.get_all_disciplines()
        for discipline in disciplines:
            print(discipline)

    # Grade management

    def add_grade(self):
        discipline_id = int(input("Discipline id: "))
        student_id = int(input("Student id: "))
        grade_value = int(input("Grade value: "))
        self._service.add_grade(discipline_id, student_id, grade_value)

    def delete_grade(self):
        discipline_id = int(input("Discipline id: "))
        student_id = int(input("Student id: "))
        self._service.delete_grade(discipline_id, student_id)

    # Search

    def search_by_student(self):
        search_term = input("> ")
        matching_students, matching_grades, matching_disciplines = self._service.search_student(search_term)
        for student in matching_students:
            print(f"{student.name}")
            for grade in matching_grades:
                if grade.student_id == student.student_id:
                    for discipline in matching_disciplines:
                        if discipline.discipline_id == grade.discipline_id:
                            print(f"    {discipline.name} - {grade.grade_value}")

    def search_by_discipline(self):
        search_term = input("> ")
        matching_disciplines, matching_grades, matching_students = self._service.search_discipline(search_term)
        for discipline in matching_disciplines:
            print(f"{discipline.name}")
            for grade in matching_grades:
                if grade.discipline_id == discipline.discipline_id:
                    for student in matching_students:
                        if student.student_id == grade.student_id:
                            print(f"    {student.name} - {grade.grade_value}")

    #Statistics

    def failing_students(self):
        students = self._service.get_all_students()
        for student in students:
            if self._service.is_student_failing(student.student_id):
                print(f"{student.name}")

    def best_students(self):
        best_students = []
        students = self._service.get_all_students()
        for student in students:
            if not self._service.is_student_failing(student.student_id):
                average_grade = self._service.get_student_average_grade(student.student_id)
                best_students.append([student, average_grade])

        best_students.sort(key=lambda x: x[1], reverse=True) # Sort grades by average grade

        for graded_student in best_students:
            print(f"{graded_student[0].name} - {graded_student[1]}")

    def all_disciplines(self):
        graded_disciplines = []
        disciplines = self._service.get_all_disciplines()
        for discipline in disciplines:
            if self._service.discipline_has_grade(discipline.discipline_id):
                average_grade = self._service.get_discipline_average_grade(discipline.discipline_id)
                graded_disciplines.append([discipline, average_grade])

        graded_disciplines.sort(key=lambda x: x[1], reverse=True) # Sort grades by average grade

        for graded_discipline in graded_disciplines:
            print(f"{graded_discipline[0].name} - {graded_discipline[1]}")



    def student_menu(self):
        while True:
            print("1. Add student")
            print("2. Delete student")
            print("3. Update student")
            print("4. List students")
            print("0. Back")
            menu_option = int(input(">"))
            match menu_option:
                case 1:
                    self.add_student()
                case 2:
                    self.delete_student()
                case 3:
                    self.update_student()
                case 4:
                    self.list_students()
                case 0:
                    return

    def discipline_menu(self):
        while True:
            print("1. Add discipline")
            print("2. Delete discipline")
            print("3. Update discipline")
            print("4. List disciplines")
            print("0. Back")
            menu_option = int(input(">"))
            match menu_option:
                case 1:
                    self.add_discipline()
                case 2:
                    self.delete_discipline()
                case 3:
                    self.update_discipline()
                case 4:
                    self.list_disciplines()
                case 0:
                    return

    def grade_menu(self):
        while True:
            print("1. Add grade")
            print("2. Delete grade")
            print("0. Back")
            menu_option = int(input(">"))
            match menu_option:
                case 1:
                    self.add_grade()
                case 2:
                    self.delete_grade()
                case 0:
                    return

    def search_menu(self):
        while True:
            print("1. Search by student")
            print("2. Search by discipline")
            print("0. Back")
            menu_option = int(input(">"))
            match menu_option:
                case 1:
                    self.search_by_student()
                case 2:
                    self.search_by_discipline()
                case 0:
                    return

    def statistics_menu(self):
        while True:
            print("1. Failing students")
            print("2. Students with best school situation")
            print("3. All disciplines at which there is at least one grade")
            print("0. Back")
            menu_option = int(input(">"))
            match menu_option:
                case 1:
                    self.failing_students()
                case 2:
                    self.best_students()
                case 3:
                    self.all_disciplines()
                case 0:
                    return

    def menu(self):
        while True:
            print("1. Student management")
            print("2. Discipline management")
            print("3. Grade management")
            print("4. Search")
            print("5. Statistics")
            print("0. Exit")
            menu_option = int(input(">"))
            match menu_option:
                case 1:
                    self.student_menu()
                case 2:
                    self.discipline_menu()
                case 3:
                    self.grade_menu()
                case 4:
                    self.search_menu()
                case 5:
                    self.statistics_menu()
                case 0:
                    return
