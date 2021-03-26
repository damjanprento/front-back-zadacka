import axios from 'axios';
import { AuthService } from './AuthService';

export const PostInfoRepository = {
    createTicket: function (data) {
        return axios({
            method: "POST",
            url: `http://localhost:8888/tickets?access_token=${AuthService.getAccessToken()}`,
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