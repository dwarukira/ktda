import styled from "@emotion/styled";
import colors from "../../styles/colors";


const StyledTable = styled.table`
    max-width: 100%;
    width: 100%;

    border: none;
    border-spacing: 0;


    thead {
        display: table-header-group;
    }

    th {
        background-color: ${colors.secondaryBackground};
        padding: 15px;
        color: ${colors.secondaryText};
        text-align: left;
        border-bottom: 1px solid ${colors.primaryBorder}
    }

    tr {
        cursor: pointer;

        &:hover {
            background-color: ${colors.secondaryBackground};
        }

        td {
            padding: 15px;
            border-bottom: 1px solid ${colors.primaryBorder};
            vertical-align: middle;
            width: 350px;
        }
    }


`

export default StyledTable;