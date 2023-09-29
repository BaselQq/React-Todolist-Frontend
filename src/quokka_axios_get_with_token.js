const axios = require('axios');

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2UxZjhiZDVkMjg0YzFiOGM0M2IyMTAxMGM4Y2VjZDhmNmVjNzJlYzFkNDA1OWNhN2QxZGZmOTVmYjc4ZTI0NGYzMDc4NThjMTMzNGY0YzMiLCJpYXQiOjE2OTU2MTA1MDEuNDQ2MDgsIm5iZiI6MTY5NTYxMDUwMS40NDYwODIsImV4cCI6MTcyNzIzMjkwMS40MzY0MTYsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.UQYbMINp1aawe-xqkvwBIiR_ajtolICTS74QwiPOndoQInp6q_v_VPt39wFbHv_KToivWdOT7TdagUODIXByAUdr9qgumLS1IicH6_5Z_fteBDapUyrDIWvqajvVHj3tzQi_asmCPCMmkw3GtanqEIhJ27kyXG-fy5TnomMLNpIfTx87gMEREXdSF7MZ3Ielc6kmpzd3SamSCczdQpCXZNMJbOe0Edf0cIn-KY-yJpexqsDwCatEJVWYwX-1WQPdCOK1uCYVxT18chyKg2e5-lh8cpKz4RO4E2EybEZ_rsOecfnG7FkTu7ziqm5gjzkqw-ImM8CANSTb5AjIAqAkUz5ERxHPAMIb-POzwDV65ItChItWpM_5AptLV_mgFVa2cgJNqE3TDkbRk0D2YH0PDJ9ZMNl231JdonBRe6B6YyEM2Go_NWvWzUTxHLAxrFfyF-lHBkZppfBZ90MtVEhpwspAl-YaQTcqbxa0r_OJbMVuaEInyo5mMKBALQ4DOg42inuI1U_59ZlOkJm8CVaPnCC1yoCPupPo3eVwyp7snRPFa4h-SvZewhXaecH1WUMFaTi1Y1-jvXJwL0u30jRdfMGCNU8LRVEzhpy3VHG_4_2fxiIazfQ07WuifejCIioeMWZQ0o9DCV1nzfVkcDrEqdg4Ogwe43B0qR_291_xabs";

async function fetchData() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/employee/1', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

fetchData().then(data => {
    console.log(data);
});
