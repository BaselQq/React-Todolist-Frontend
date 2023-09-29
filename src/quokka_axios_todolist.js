const axios = require('axios');

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDExNzFkMzc3NzU4OWY4MDAzNWI2NzNhOWQ3OTczZGVhYmQ4NDg0ODU1ODMxYThjMjZkOTBkZWYzOTUxMGZmODM0ZDkyOWUyODhlMWVlZmYiLCJpYXQiOjE2OTU3NDgyMjQuNzY5ODY3LCJuYmYiOjE2OTU3NDgyMjQuNzY5ODY5LCJleHAiOjE3MjczNzA2MjQuNzU4NTcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.ghcUzorRilXjpoyVPtoqW25Gsce4lhNDsHXxzouQQYFsyMFivbFs88LYonvChFQiPngnd03lRuX8YuMvJK5xXAZACKM2gaHJme7YQ1JilsG9fB5Tn6wmCo7unq-d2uU6Sa3MIsEljU8jOFJjI6eML2YDTGfCvyqA480NUG-DT99qOVHLl63MDbcc41bNwAnaCcT-JZIdTkpguiS39LwX6LJat7U6sKzqi8evOKQvVBAFMRS8BQ9Mhcrwt_BLTRrlMfIfNzoY9_eyd6TujBxQ0xFNUDT-rfeS9xo7xr5P6ItI-sL9dYKEVRC9065frisSe_fn1JDK_S9oVpQF5WgyaA2hxxvZ6AUj6flsht1ckVtxYwFARCxw0Bbdb4xAmCGNcsX2GJQ6OL_jdu0cNmbSU5lAK-KKbVjLVIV10b1ANepm3HuB52693he-J2A5hpzgUoOcp2njkT65zxaNmpg_4WyGqmWaC8BQklFX-3SP74sbnopT9QiNb-Y61xjtADd48Ke82r7J9FLU9e8rQbPyyyvjzZ-nPkSDysvioC6P3dd8O9obsSbEIowm8dSs2nvrYMb7Kbc_feiCbZDIm2eAdxH4OwyGpV2azVAtPl_bslj8w3sqJO9NHgQCHqiRAy-clSDlNwQIV-rX1GuNQZWlO45MUDwl7zIQO8vLJOhqNr0";

async function fetchData() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/todos', {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        return response.data;
    } catch(error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

fetchData().then(data => {
    console.log(data);
});