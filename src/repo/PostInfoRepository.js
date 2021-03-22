import axios from 'axios';

export const PostInfoRepository = {
    createTicket: function (data) {
        return axios({
            method: "POST",
            url: "http://localhost:8888/tickets",
            data: data
        });
    },
    createTicketType: function (data) {
        return axios({
            method: "POST",
            url: "http://localhost:8888/ticket_types",
            data: data
        });
    },
    createPriority: function (data) {
        return axios({
            method: "POST",
            url: "http://localhost:8888/priorities",
            data: data
        });
    },
}