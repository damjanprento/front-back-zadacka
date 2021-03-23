import axios from "axios";

export const PostsRepository = {
    getAllTickets: function () {
        return axios({
            method: "GET",
            url: `http://localhost:8888/tickets`,
        });
    },
    getTicketById: function (id) {
        return axios({
            method: "GET",
            url: `http://localhost:8888/tickets/${id}`,
        });
    },
    getAllTicketTypes: function () {
        return axios({
            method: "GET",
            url: `http://localhost:8888/ticket_types`,
        });
    },
    getTicketTypeById: function (id) {
        return axios({
            method: "GET",
            url: `http://localhost:8888/ticket_types/${id}`,
        });
    },
    getAllPriorities: function () {
        return axios({
            method: "GET",
            url: `http://localhost:8888/priorities`,
        });
    },
    getPriorityById: function (id) {
        return axios({
            method: "GET",
            url: `http://localhost:8888/priorities/${id}`,
        });
    },

    getCitiesFiltered: function (filterString) {
        return axios({
            method: "GET",
            url: `http://localhost:8888/cities?nameFilter=${filterString}`
        })
    },

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