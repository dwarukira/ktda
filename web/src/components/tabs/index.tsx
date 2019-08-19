import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";

 const TabItems = ({ children, loading, currentItem, people }: any) => {
    const ulRef = useRef<HTMLUListElement>(null);
    const [current, setCurrent] = useState(currentItem || 0)
    const [ulPos, setUlPos] = useState()
    // Tab sizes
    const [tabs, setTabs] = React.useState()

    useEffect(() => {
        if (ulRef.current) {
            getSize()
            setUlPos(ulRef.current.getBoundingClientRect())   
            setCurrent(currentItem || 0)         
        }

        


    }, [ulRef, loading, currentItem, people]);


    const getSize = () => {
        if (ulRef.current) {
            const tabList = Array.from(ulRef.current.children).map((i: any) => {
                return i.getBoundingClientRect()
            })
            setTabs(tabList)
        }
    }
    
    return (
        <Tabs>
            <ul ref={ulRef}>
                {React.Children.map(children, (child, i) => {
                    return <span onClick={() => setCurrent(i)} > {child} </span>
                })}

                {tabs ? <StyledIndicator width={tabs[current].width} left={tabs[current].left - ulPos.left} /> : ''}

            </ul>
        </Tabs>
    )
}

const StyledIndicator = styled.div`
    border-radius: 4px;
    background-color: #FED64A;
    height: 4px;
    left: 0;
    position: absolute;
    bottom: -1px;

    left:  ${props => props.left}px;
    width: ${props => props.width}px;

    transition: left 500ms, right 500ms;

` as React.FC<any>


export const Tabs = styled.div`
    ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #eaeaea;

     
        height: auto;
        white-space: nowrap;
        margin-bottom: 30px;

        padding-left: 0;

        position: relative;
    }

    li {
        margin: 0;
       
        flex-shrink: 0;

      
        border-bottom: none;
        padding: 10px 15px;
        font-weight: 600;
        cursor: pointer;

        font-size: 14px;
        line-height: 20px;
        background-color: transparent;

        letter-spacing: 0.2px;

        color: #525257;

        span {
            color: #bababc
        }

       
        
    }

`

export default TabItems