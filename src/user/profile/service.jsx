import axios from 'axios';
class Service {

  constructor() {
    console.log("Service is constructed");
  }

  getRestClient() {
    if (!this.serviceInstance) {
      this.serviceInstance = axios.create({
        baseURL: 'http://218.39.221.79:8080/api',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
          },
      });
    }
    return this.serviceInstance;
  }
}

export default (new Service());