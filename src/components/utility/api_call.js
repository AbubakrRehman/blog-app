

const fetchWithBase = async (url) => {
    const BASE_URL = "http://blogapp-env.eba-zrcpsce5.ap-south-1.elasticbeanstalk.com/api";
    const response = await fetch(`${BASE_URL}${url}`);
    const JsonResponse = await response.json();
    return JsonResponse;

}

const fetchWithBasePost = async (url,body) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const BASE_URL = "http://blogapp-env.eba-zrcpsce5.ap-south-1.elasticbeanstalk.com/api";
    const response = await fetch(`${BASE_URL}${url}`,options);
    const JsonResponse = await response.json();
    return JsonResponse;

}





const fetchWithBaseAndTokenDelete = async (url, jwt) => {
    const BASE_URL = "http://blogapp-env.eba-zrcpsce5.ap-south-1.elasticbeanstalk.com/api";
    
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    }
    const response = await fetch(`${BASE_URL}${url}`, options);
    const JsonResponse = await response.json();
    return JsonResponse;

}



const fetchWithBaseAndTokenPost = async (url, jwt, body) => {
    const BASE_URL = "http://blogapp-env.eba-zrcpsce5.ap-south-1.elasticbeanstalk.com/api";
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(`${BASE_URL}${url}`, options);
    const JsonResponse = await response.json();
    return JsonResponse;

}


export { fetchWithBase, fetchWithBaseAndTokenPost,fetchWithBasePost ,fetchWithBaseAndTokenDelete};