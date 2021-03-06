import { gql } from "apollo-boost";

export const GET_STUDENTS = gql`
  query GetStudentsPaginated($page: Int!, $f: String, $search: String) {
    paginatedStudent(page: $page, f: $f, search: $search) {
      objects {
        name
        year
        studentId
        school {
          name
        }

        factory {
          name
        }
      }

      nextPage
    }
  }
`;

export const GET_TOTAL = gql`
  query FormTotals {
    formTotals {
      form1
      form2
      all
      form3
      form4
      alumni
    }
  }
`;

export const GET_STUDENT = gql`
  query GetStudent($id: String!) {
    student(id: $id) {
      name
      id
      studentId
    }
  }
`;

export const GET_DETAILED_STUDENT = gql`
  query GetDetailedStudent($id: String!) {
    student(id: $id) {
      name
      id
      studentId

      totalSpent
      fee {
        id
        ammount
        year
        term
        form
      }

      performance {
        id
        grade
        year
        term
        form
      }

      school {
        phone
        address
        email
        name
      }
    }
  }
`;

export const GET_PERFORMANCE_STUDENT = gql`
  query StudentTrends($id: String!) {
    studentTrends(id: $id) {
      markValue
      term
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $name: String!
    $gender: String!
    $guardianContact: String
    $contact: String
    $school: String
    $factory: String
    $kcpe: String!
    $kcse: String
    $id: String
  ) {
    updateStudent(
      input: {
        school: $school
        gender: $gender
        name: $name
        guardianContact: $guardianContact
        factory: $factory
        contact: $contact
        kcpe: $kcpe
        kcse: $kcse
      }
      id: $id
    ) {
      student {
        name
        studentId
      }
    }
  }
`;
