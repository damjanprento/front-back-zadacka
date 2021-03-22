import axios from "axios";

export const EditInfoRepository = {

    editTicketInfo: function (dataObj) {
        return axios({
            method: "PUT",
            url: `http://localhost:8888/tickets`,
            data: dataObj
        })
    },
    editTicketTypeInfo: function (dataObj) {
        return axios({
            method: "PUT",
            url: `http://localhost:8888/ticket_types`,
            data: dataObj
        })
    },
    editPriorityInfo: function (dataObj) {
        return axios({
            method: "PUT",
            url: `http://localhost:8888/priorities`,
            data: dataObj
        })
    }
};