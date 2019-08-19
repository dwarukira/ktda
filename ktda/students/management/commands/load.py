from django.core.management.base import BaseCommand, CommandError
from ktda.students.models import Factory, School, University, Student, Document
import os
import re
from os import listdir
from os.path import isfile, join
from shutil import copyfile



def parse_name(filename):
	# print(filename[filename.find("(")+1 :filename.find(")")])
	return filename[filename.find("(")+ 1 : filename.find(")")]


def get_doc_type(name):
	d_type = {
		'performance': 2,
		'consent': 1,
		'fee': 4,
		'application details': 3
	}

	return d_type.get(name, 1)


def capitalizeWords(s):
  return re.sub(r'\w+', lambda m:m.group(0).capitalize(), s)

class Command(BaseCommand):

	def add_arguments(self, parser):
		parser.add_argument('--filename', type=str)

	def handle(self, *args, **options):
		print("I am get the fucking file. Wait a hole")
		filename = options['filename']
		s_files=[(parse_name(f.name), f.path) for f in os.scandir(filename) if f.is_dir()]
		print("I think i got the files")
		# print(s_files)

		for file in s_files:
			student_name = file[0]
			# if '_' in student_name:
			# 	print(student_name)
			os.makedirs(f'media/documents/{file[0]}', exist_ok=True)
			student_name_to_list = student_name.split(" ")
			s_name = f'{student_name_to_list[0]} {student_name_to_list[1]}' 
			# print(s_name, "name")
			student = Student.objects.filter(name__icontains=s_name)

			# print(student, "i am")

			if not student:
				# print(student_name, student)
				student = Student.objects.filter(name__icontains=student_name)

			if not student:
				print(student_name)
			
				# return		
			if student:
				student = student[0]
				print(student_name)
				print(student, "hi", student_name)
				onlyfiles = [f[:-4] for f in listdir(file[1]) if isfile(join(file[1], f))]
				for f in onlyfiles:
					if f != '.DS_S':
						copyfile(f'{file[1]}/{f}.pdf', f'media/documents/{student_name}/{f}.pdf')
						document = Document.objects.create(
							name = f, 
							student= student,
							desc = f,
							doc_type=get_doc_type(f),
							document=f'/documents/{file[0]}/{f}.pdf'
						)


