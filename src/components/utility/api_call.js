

const fetchWithBase = async (url) => {
    // http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api/user/1/blogs?pageNumber=0&pageSize=10&sortBy=blogId&sortDir=asc
    const BASE_URL = "http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api";
    const response = await fetch(`${BASE_URL}${url}`);
    const JsonResponse = await response.json();
    return JsonResponse;

}



const fetchWithBaseAndTokenPost = async (url, jwt, body) => {
    const BASE_URL = "http://blogapp-env-1.eba-9pgxeyhe.ap-south-1.elasticbeanstalk.com/api";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
            'body': JSON.stringify(body)
        }
    }
    const response = await fetch(`${BASE_URL}${url}`, options);
    const JsonResponse = await response.json();
    return JsonResponse;

}


export { fetchWithBase, fetchWithBaseAndTokenPost };