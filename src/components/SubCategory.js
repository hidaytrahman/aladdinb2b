import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../core/constant";
import useAPI from "../core/customHooks/useAPI";
const SubCategory = ({ artId, setActiveSubcatID }) => {
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        axios.get(`${API.baseUrl}Articles/${artId}`)
            .then(function (response) {
                // handle success
                console.log(' getSubCategories 2', response);
                setSubCategories(response.data.articles);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [artId]);



    const handleChange = (id) => {
        setActiveSubcatID(id);
    }
    return (
        <ul>
            {subCategories &&
                subCategories.map((categ) => (
                    <FormGroup key={categ.artId}>
                        <FormControlLabel
                            control={<Checkbox
                                onChange={() => handleChange(categ.artId)} 
                                value={categ.artTitle}
                                name="checkedA" />}
                            label={categ.artTitle}
                        />
                    </FormGroup>

                ))
            }
        </ul>
    )

}

export default SubCategory;