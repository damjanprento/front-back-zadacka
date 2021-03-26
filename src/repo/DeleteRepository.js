import axios from 'axios';
import { AuthService } from './AuthService';

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
            url: `http://localhost:8888/tickets/${id}?access_token=${AuthService.getAccessToken()}`
        })
    },
    deletePriority: function (id) {
        return axios({
            method: "DELETE",
            url: `http://localhost:8888/priorities/${id}`
        })
    }
}