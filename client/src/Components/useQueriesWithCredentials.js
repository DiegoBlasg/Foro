
const useQueriesWithCredentials = () => {
    const queryWithCredentials = {}
    queryWithCredentials.post = (url, body = {}, fun = () => { }) => {
        fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("authentication has been failed!");
            })
            .then(async (resObject) => {
                fun(resObject)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    queryWithCredentials.get = (url, fun = () => { }) => {
        fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            }
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("authentication has been failed!");
            })
            .then(async (resObject) => {
                fun(resObject)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return { queryWithCredentials }
}



export default useQueriesWithCredentials