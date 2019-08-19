import graphene
from django.core.paginator import Paginator
from django.db.models import Q, Count
from ktda.students.models import Student, School, SchoolPerformance, University, Form, Factory, Document
from graphene_django.types import DjangoObjectType
from graphene_django.converter import convert_django_field_with_choices
from .types import (
            UniversityTransation, 
            GenderParity, 
            GenderGradeDist, 
            UniversityTransationGender,
            FormTotalType, 
            StudentType,
            SchoolFeesType,
            SchoolPerformanceType

)
import datetime
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

from .mutations import Mutation
def grades_gen():
    return ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+" ,"D", "D-", "E"]

def year_choices(year):
    return [r for r in range(year, datetime.date.today().year - 3 )  ]


# First we create a little helper function, becase we will potentially have many PaginatedTypes 
# and we will potentially want to turn many querysets into paginated results:

def get_paginator(qs, page_size, page, paginated_type, **kwargs):
    p = Paginator(qs, page_size)
    try:
        page_obj = p.page(page)
    except PageNotAnInteger:
        page_obj = p.page(1)
    except EmptyPage:
        print("----------------------->", p.num_pages)
        page_obj = p.page(p.num_pages )

  

    print(p.num_pages)
    next_page = page_obj.next_page_number()
    return paginated_type(
        page=page_obj.number,
        pages=p.num_pages,
        has_next=page_obj.has_next(),
        has_prev=page_obj.has_previous(),
        objects=page_obj.object_list,
        next_page = next_page,
        **kwargs
    )

def create_enum_field(django_model, field_name):
    """ 
    Creates a graphene Enum field from a Django choices field that is
    suitable for inputs and outputs.
    """
    django_field = django_model._meta.get_field(field_name)
    graphene_field = convert_django_field_with_choices(django_field)
    print(graphene_field, "--->>>>>>>>>>>>>>>>>")
    return graphene_field



class StudentPaginatedType(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    next_page = graphene.Int()
    objects = graphene.List(StudentType)  

class SchoolType(DjangoObjectType):
    class Meta:
        model = School



class FormType(DjangoObjectType):
    class Meta:
        model = Form

class FactoryType(DjangoObjectType):
    class Meta:
        model = Factory

class DocumentType(DjangoObjectType):
    doc_type = graphene.String(source='doc_type')
    class Meta:
        model = Document



class BasicAnalysis(graphene.ObjectType):
    total_students = graphene.Int()
    total_alumni = graphene.Int()
    total_ammount = graphene.Decimal()
    total_university_transation = graphene.Int()



class Query(graphene.ObjectType):
    all_students = graphene.List(StudentType)
    student = graphene.Field(StudentType, id=graphene.String())

    paginated_student = graphene.Field(StudentPaginatedType, page=graphene.Int(), f=graphene.String(required=False))

    schools = graphene.List(SchoolType)

    factories = graphene.List(FactoryType)

    basic_analysis = graphene.Field(BasicAnalysis)

    university_transation = graphene.List(UniversityTransation)

    university_transation_gender = graphene.List(UniversityTransationGender)


    gender_parity = graphene.Field(GenderParity)

    gender_grade_distribution = graphene.List(GenderGradeDist)

    form_totals = graphene.Field(FormTotalType)


    def resolve_basic_analysis(self, info):
        students = Student.objects.all()
        alumni = Student.objects.filter(kcse__isnull=False)
        total_university_transation = alumni.filter(
                                            Q(kcse='A') | 
                                            Q(kcse='A-') | 
                                            Q(kcse='B+') |
                                            Q(kcse='B') | 
                                            Q(kcse='B-') | 
                                            Q(kcse='C+'))
        total = 0
        for student in students:
            total += student.total_spent

        
        return BasicAnalysis(
            total_students = len(students),
            total_alumni = len(alumni),
            total_ammount = total,

            total_university_transation = len(total_university_transation)
        )

    def resolve_factories(self, info, **kwargs):
        return Factory.objects.all()
        
    def resolve_all_students(self, info, **kwargs):
       
        return Student.objects.all()
    
    def resolve_paginated_student(self, info, **kwargs):
        page = kwargs["page"]
        f = kwargs.get("f", None)
        
        year = datetime.date.today().year

        page_size = 5
        qs = Student.objects.order_by("year").reverse()
        if f == 'alumni':
            qs = qs.filter(kcse__isnull=False)
        if f == 'form1':
            qs = qs.filter(year=year)
        if f == 'form2':
            qs = qs.filter(year=year - 1)
        if f == 'form3':
            qs = qs.filter(year=year - 2)
        if f == 'form4':
            qs = qs.filter(year=year - 3)


        return get_paginator(qs, page_size, page, StudentPaginatedType)


    def resolve_schools(self, info, **kwargs):
        return School.objects.all()

    def resolve_student(self, info, id):
        return Student.objects.get(student_id=id)

    def resolve_university_transation(self, info):
       
        qs = Student.objects.filter(
                    Q(kcse='A') | 
                    Q(kcse='A-') | 
                    Q(kcse='B+') |
                    Q(kcse='B') | 
                    Q(kcse='B-') | 
                    Q(kcse='C+'))
        students = []
        for year in year_choices(2013):
            t =  Student.objects.filter(year=year).count()
            students.append(UniversityTransation(
                year = year,
                total = (len(qs.filter(year=year)) / t) * 100
            ))

        return students

    def resolve_gender_parity(self, info):
        total_males = Student.objects.filter(gender="M").count()
        total_females = Student.objects.filter(gender="F").count()
        total_others  = Student.objects.filter(gender="O").count()

        return GenderParity(
            total_females = total_females,
            total_males = total_males,
            total_others = total_others
        )

    def resolve_gender_grade_distribution(self, info):
        alumni = Student.objects.filter(kcse__isnull=False)
        total_male = alumni.filter(gender="M").count()
        total_female = alumni.filter(gender="F").count()

        total_other = alumni.filter(gender="O").count()

 
        l = []
        for grade in grades_gen():
            gd = alumni.filter(kcse=grade)

            print(gd.filter(gender="M").count() / total_female)

            l.append(GenderGradeDist(
                grade = grade,
                total_males = gd.filter(gender="M").count() / total_male * 100,
                total_females = gd.filter(gender="F").count() / total_female * 100,
                total_others = gd.filter(gender="O").count() / total_other * 100
            ))

        
        return l

    def resolve_university_transation_gender(self, info):
        qs = Student.objects.filter(
            Q(kcse='A') | 
            Q(kcse='A-') | 
            Q(kcse='B+') |
            Q(kcse='B') | 
            Q(kcse='B-') | 
            Q(kcse='C+'))

        students = []

        for year in year_choices(2013):
            students.append(UniversityTransationGender(
                year = year,
                total_females = qs.filter(year=year,gender="F").count(),
                total_males= qs.filter(year=year, gender="M").count(),
                total_others = qs.filter(year=year, gender="O").count()
            ))

        return students
        
    def resolve_form_totals(self, info):
        year = datetime.date.today().year

        
        return FormTotalType(
            all = Student.objects.count(),
            form1 = Student.objects.filter(year=year).count(),
            form2 = Student.objects.filter(year=year - 1).count(),
            form3 = Student.objects.filter(year=year - 2).count(),
            form4 = Student.objects.filter(year=year - 3).count(),
            alumni = Student.objects.filter(kcse__isnull=False).count()
        )
        

schema = graphene.Schema(Query, Mutation)
