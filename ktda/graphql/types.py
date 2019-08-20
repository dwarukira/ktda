import graphene
from graphene_django.types import DjangoObjectType

from ktda.students.models import Student, SchoolFees, SchoolPerformance


class StudentType(DjangoObjectType):
    total_spent = graphene.Decimal()
    class Meta:
        model = Student


class UniversityTransation(graphene.ObjectType):
    year = graphene.Int()
    total = graphene.Float()


class GenderParity(graphene.ObjectType):
    total_males = graphene.Int()
    total_females = graphene.Int()
    total_others = graphene.Int()



class GenderGradeDist(graphene.ObjectType):
    grade = graphene.String()
    total_males = graphene.Int()
    total_females = graphene.Int()

    total_others = graphene.Int()

class UniversityTransationGender(graphene.ObjectType):
    year = graphene.Int()
    total_females = graphene.Int()
    total_others = graphene.Int()
    total_males = graphene.Int()


class FormTotalType(graphene.ObjectType):
    form1 = graphene.Int()
    form2 = graphene.Int()
    form3 = graphene.Int()
    form4 = graphene.Int()
    alumni = graphene.Int()
    all = graphene.Int()

class SchoolFeesType(DjangoObjectType):
    form = graphene.String(source='form')
    term = graphene.String(source='term')
  

    class Meta:
        model = SchoolFees

class SchoolPerformanceType(DjangoObjectType):
    form = graphene.String(source='form')
    term = graphene.String(source='term')
    class Meta:
        model = SchoolPerformance


class StudentInputType(graphene.InputObjectType):
    name = graphene.String()
    factory = graphene.String()
    gender = graphene.String()
    school = graphene.String()

    kcpe = graphene.String()

    contact = graphene.String()
    guardian_contact = graphene.String()
    factory = graphene.String()


class FeeInputType(graphene.InputObjectType):
    ammount = graphene.Decimal()
    year = graphene.String()
    term = graphene.String()
    form = graphene.String()
    student = graphene.String()

class PerformanceInputType(graphene.InputObjectType):
    grade = graphene.String()
    year = graphene.Int()
    form = graphene.String()
    term = graphene.String()
    student = graphene.String()


class SendMessageInputType(graphene.InputObjectType):
    message = graphene.String()
    