import * as React from "react";
import Tabs from "components/tabs";

interface IStudentsTabs {
  totals: any;
  onClickTab: (value: string) => void;
}

interface IStudentsTabItem {
  onClick: () => void;
  total: string;
  label: string;
}

const StudentsTabItem: React.FC<IStudentsTabItem> = ({
  onClick,
  total,
  label,
}) => {
  return (
    <li onClick={onClick}>
      {label} <span>({total}) </span>
    </li>
  );
};

const StudentsTabs: React.FC<IStudentsTabs> = ({ totals, onClickTab }) => {
  const tabs = [
    {
      label: "All",
      total: totals?.formTotals.all,
      onClick: () => onClickTab("all"),
    },
    {
      label: "Form 1",
      total: totals?.formTotals.form1,
      onClick: () => onClickTab("form1"),
    },

    {
      label: "Form 2",
      total: totals?.formTotals.form2,
      onClick: () => onClickTab("form2"),
    },

    {
      label: "Form 3",
      total: totals?.formTotals?.form3,
      onClick: () => onClickTab("form3"),
    },

    {
      label: "Form 4",
      total: totals?.formTotals?.form4,
      onClick: () => onClickTab("form4"),
    },

    {
      label: "Alumni",
      total: totals?.formTotals?.alumni,
      onClick: () => onClickTab("alumni"),
    },
  ];
  return (
    <Tabs people={totals}>
      {tabs.map((tab) => (
        <StudentsTabItem
          total={tab.total}
          label={tab.label}
          onClick={tab.onClick}
        />
      ))}
      {/* <li onClick={() => {}}>
        All <span>({totals?.formTotals ? totals?.formTotals.all : ""}) </span>
      </li>
      <li onClick={() => {}}>
        Form 1
        <span>({totals?.formTotals ? totals?.formTotals.form1 : ""}) </span>
      </li>
      <li onClick={() => {}}>
        Form 2
        <span>({totals?.formTotals ? totals?.formTotals?.form2 : ""}) </span>
      </li>
      <li onClick={() => {}}>
        Form 3
        <span>({totals?.formTotals ? totals?.formTotals?.form3 : ""}) </span>
      </li>
      <li
        onClick={() => {
          // data.paginatedStudent.nextPage = 1;
          // setFilter("form4");
        }}
      >
        Form 4
        <span>({totals?.formTotals ? totals?.formTotals?.form4 : ""}) </span>
      </li>
      <li
        onClick={() => {
          // data.paginatedStudent.nextPage = 1;
          // setFilter("alumni");
        }}
      >
        Alumni
        <span>({totals?.formTotals ? totals?.formTotals?.alumni : ""}) </span>
      </li>

      <li>
        Expelled <span> (20) </span>
      </li> */}
    </Tabs>
  );
};

export default StudentsTabs;
