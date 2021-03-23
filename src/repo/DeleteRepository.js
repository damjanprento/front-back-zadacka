import axios from 'axios';

export const DeleteRepository = {
    deleteTicketType: function (id) {
        return axios({
            method: "DELETE",
            url: `http://localhost:8888/ticket_types/${id}`
        })
    },
    deleteTicket: function (id) {
        return axios({
            method: "DELETE",
            url: `http://localhost:8888/tickets/${id}`
        })
    }
}