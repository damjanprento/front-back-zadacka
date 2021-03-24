import axios from 'axios';

export const TableRepository = {
    getPageableTickets: function (page, size) {
        return axios({
            method: "GET",
            url: `http://localhost:8888/tickets/pageable?page=${page}&size=${size}`
        })
    },
    getPageableTicketTypes: function (page, size) {
        return axios({
            method: "GET",
            url: `http://localhost:8888/ticket_types/pageable?page=${page}&size=${size}`
        })
    },
    getPageablePriorities: function (page, size) {
        return axios({
            method: "GET",
            url: `http://localhost:8888/priorities/pageable?page=${page}&size=${size}`
        })
    }
}