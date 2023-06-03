import RestClient from "utils/RestClient"

const Login = (data) => RestClient.Post('/api/merchant/signin', data);

const Register = (data) => RestClient.Post('/api/merchant/signup', data);


export default { Login, Register }