import axios from 'axios';

export const CreateUserService = {
    createUser: (data) => {
        return axios({
            method: "POST",
            url: `http://localhost:8888/users/register`,
            headers: {
                Authorization: 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0'
            },
            data: data
        });
    }
}