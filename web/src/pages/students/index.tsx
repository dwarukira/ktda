import React, { useState } from "react";
import StudentList from "./list";
import Tabs from "../../components/tabs";
import styled from "@emotion/styled";
import Card from "../../components/card";
import { NavLink, withRouter } from "react-router-dom";
import add from "../../icons/add.svg"
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import colors from "../../styles/colors";
import { SyncLoader } from "react-spinners";
import Search from "../../components/form/search";
import Error from "../../components/error";

const GET_STUDENTS = gql`
    query GetStudentsPaginated($page: Int!, $f: String, $search: String){
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
`

const GET_TOTAL = gql`
    query FormTotals {
        formTotals{
            form1
            form2
            all 
            form3
            form4
            alumni
        }
    }
`

const Students = ({ history }: any) => {

    const [ filter, setFilter ]= useState()
    const [ search, setSearch ] = useState('')

    const { data, error, loading, fetchMore, networkStatus } = useQuery(GET_STUDENTS, {
        variables: {
            page: 1,
            f: filter,
            search: search
            
        },
        notifyOnNetworkStatusChange: true
    })

    const { data: totals, loading: totalsLoading, error: totalError } = useQuery(GET_TOTAL)

    if(totalError) {
        return <Error />
    }
    
    return (
        <>
            <h1> Students </h1>
            <Tabs people={totals}>
                <li onClick={() => setFilter("")}> All <span> ({ totals.formTotals ? totals.formTotals.all: '' }) </span> </li>
                <li onClick={() => setFilter("form1")} > Form 1 <span>  ({ totals.formTotals ? totals.formTotals.form1: '' }) </span> </li>
                <li onClick={() => setFilter("form2")} > Form 2 <span>  ({ totals.formTotals ? totals.formTotals.form2: '' }) </span> </li>
                <li onClick={() => setFilter("form3")} > Form 3 <span>  ({ totals.formTotals ? totals.formTotals.form3: '' }) </span> </li>
                <li onClick={() => {
                    data.paginatedStudent.nextPage = 1
                    setFilter("form4")}
                }>  Form 4 <span>  ({ totals.formTotals ? totals.formTotals.form4: '' }) </span> </li>
                <li onClick={() => {
                    data.paginatedStudent.nextPage = 1
                    setFilter("alumni")

                }}> Alumni <span>  ({ totals.formTotals ? totals.formTotals.alumni: '' }) </span> </li>

                <li> Expelled <span> (20) </span>  </li>
            </Tabs>
            
            <PageGrid>      
               {!error ? (<>
               { data.paginatedStudent ? <StudentList 
                    students={data.paginatedStudent.objects} 
                    nextPage={data.paginatedStudent.nextPage} 
                    networkStatus={networkStatus}
                    filter={filter}
                    fetchMore={fetchMore} />

                    : <SyncLoader
                        sizeUnit={"px"}
                        size={15}
                        color={colors.primary}
                        loading={!data.paginatedStudent}
                    />
               } </>
            ) : <p> Not Records found </p> }
                
                <div>
                    <StyledExtra>
                        <Search placeholder="Search ..." 
                                onChange={(e:any) => {
                                    setSearch(e.target.value)
                                }}
                                name=""
                                value={search}
                        />
                    </StyledExtra>
                    <Card onClick={() => history.push("/students/new")}>
                        <AddStudent>
                            <img src={add} alt="add a student" />
                            <div className="title">
                                <NavLink to="/students/new">
                                    Add Student
                                </NavLink>
                            </div>
                        </AddStudent>
                    </Card>

                    <Card>
                        <h2>Total Students</h2>
                        <h3>
                            <a> { totals.formTotals ? totals.formTotals.all: '' } </a>
                        </h3>
                    </Card>
                </div>
            </PageGrid>

        </>
    )
}

const StyledExtra = styled.div`
    padding-bottom: 20px;
    a {
        width: 100%;
        border-color: "#dcdcd";
        display: block;
        padding-top: 10px;

        transition: color 125ms ease-in-out;
        color: #0a8080;
        cursor: pointer;

        text-decoration: none;
    }

`

const PageGrid = styled.div`
    display: grid;


    grid-template-columns:  2fr 1fr;
    grid-gap: 2rem;

    @media (max-width: 768px) {
          grid-template-columns: 1fr;
      
    }

`

const AddStudent = styled.div`
      display: flex;
      img {
          width: 40px;
          height: 40px;
          padding-right: 10px;
          color: #0a8080;
      }



      .title {
          align-self: center;
      }
      
`

export default withRouter(Students);