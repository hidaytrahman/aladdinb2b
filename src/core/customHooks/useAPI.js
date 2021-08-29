import axios from "axios";
import { useEffect, useState } from "react";

const useAPI = (apiURL) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        axios.get(apiURL)
            .then(function (response) {
                // handle success
                setData(response.data.articles);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setError(error);
            })
    }, [apiURL]);

    return {
        data,
        error
    }
}

export default useAPI;