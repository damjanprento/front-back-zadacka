import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    tbl: {
        border: "1px solid black",
        borderRadius: "10px",
    },
    tblHead: {
        backgroundColor: "MediumTurquoise",
        color: "white"
    },
    tblBody: {
        '&:nth-child(odd)': {
            backgroundColor: "#eee"
        },
    },
    deleteBtn: {
        color: "white",
        backgroundColor: "black",
        '&:hover': {
            backgroundColor: "red"
        }
    },
    detailsBtn: {
        color: "white",
        backgroundColor: "black",
        '&:hover': {
            backgroundColor: "dimgray"
        }
    }
}));